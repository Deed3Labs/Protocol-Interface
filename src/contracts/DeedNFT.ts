import { useContractRead, useContractWrite, usePublicClient } from 'wagmi';
import { parseEther, createPublicClient, http } from 'viem';
import { Alchemy, Network } from 'alchemy-sdk';
import { DeedNFT } from '@/types/deed';
import { sepolia } from 'viem/chains';

// Define interfaces for Alchemy response types
interface AlchemyNftAttribute {
  value: string;
  trait_type: string;
}

interface AlchemyNftRawMetadata {
  name: string;
  description: string;
  image: string;
  attributes: AlchemyNftAttribute[];
  // Add other metadata fields as needed
}

interface AlchemyNft {
  contract: {
    address: string;
    name: string;
    symbol: string;
  };
  tokenId: string;
  tokenType: string;
  name: string;
  description: string;
  tokenUri: string;
  image: {
    cachedUrl?: string;
    originalUrl?: string;
  };
  raw: {
    tokenUri: string;
    metadata: AlchemyNftRawMetadata;
  };
}

interface AlchemyNftsResponse {
  nfts: AlchemyNft[];
  pageKey?: string;
}

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DEEDNFT_CONTRACT_ADDRESS as `0x${string}`;
const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

console.log('Contract Address:', CONTRACT_ADDRESS);
console.log('Alchemy API Key:', ALCHEMY_API_KEY ? 'Present' : 'Missing');

// Initialize Alchemy client
const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
});

// Add headers to handle CORS
const alchemyConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create a dedicated Alchemy RPC client
const alchemyRpcClient = createPublicClient({
  chain: sepolia,
  transport: http(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
});

const MINT_ABI = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'location', type: 'string' },
      { name: 'price', type: 'uint256' },
    ],
    outputs: [],
  },
] as const;

const MINT_WITH_METADATA_ABI = [
  {
    name: 'mintWithMetadata',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'location', type: 'string' },
      { name: 'price', type: 'uint256' },
      { name: 'traits', type: 'string[]' },
    ],
    outputs: [],
  },
] as const;

// Add retry utility function
const retry = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise(resolve => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay * 1.5);
  }
};

export function useDeedNFT() {
  const publicClient = usePublicClient();

  const { data: totalSupply } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: [
      {
        name: 'totalSupply',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'uint256' }],
      },
    ],
    functionName: 'totalSupply',
  });

  const { write: mint } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: MINT_ABI,
    functionName: 'mint',
  });

  const { write: mintWithMetadata } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: MINT_WITH_METADATA_ABI,
    functionName: 'mintWithMetadata',
  });

  const getAllDeeds = async () => {
    try {
      console.log('Fetching NFTs from contract:', CONTRACT_ADDRESS);
      const response = await fetch(`/api/alchemy/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForCollection?contractAddress=${CONTRACT_ADDRESS}&withMetadata=true`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Alchemy Response:', data);
      return data.nfts;
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      throw error;
    }
  };

  const getDeed = async (tokenId: string) => {
    try {
      const nft = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, tokenId) as unknown as AlchemyNft;
      return nft.description || nft.raw?.metadata?.description || '';
    } catch (error) {
      console.error('Error fetching deed:', error);
      throw error;
    }
  };

  const getDeedTraits = async (tokenId: string) => {
    try {
      const nft = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, tokenId) as unknown as AlchemyNft;
      return nft.raw?.metadata?.attributes?.map(attr => attr.value) || [];
    } catch (error) {
      console.error('Error fetching deed traits:', error);
      throw error;
    }
  };

  const getDeedMetadata = async (tokenId: string) => {
    try {
      const nft = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, tokenId) as unknown as AlchemyNft;
      // Use the name field as location since that's where the address is stored
      const location = nft.name || nft.raw?.metadata?.name || '';
      // For now, we'll set a default price since it's not in the metadata
      const price = '0';
      return {
        location,
        price,
      };
    } catch (error) {
      console.error('Error fetching deed metadata:', error);
      throw error;
    }
  };

  const getDeedOwner = async (tokenId: string) => {
    try {
      const owner = await retry(() => alchemyRpcClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: [{
          name: 'ownerOf',
          type: 'function',
          stateMutability: 'view',
          inputs: [{ type: 'uint256', name: 'tokenId' }],
          outputs: [{ type: 'address' }],
        }],
        functionName: 'ownerOf',
        args: [BigInt(tokenId)],
      }));
      return owner as string;
    } catch (error) {
      console.error('Error fetching deed owner:', error);
      throw error;
    }
  };

  const getDeedBalance = async () => {
    try {
      const supply = await retry(() => alchemyRpcClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: [{
          name: 'totalSupply',
          type: 'function',
          stateMutability: 'view',
          inputs: [],
          outputs: [{ type: 'uint256' }],
        }],
        functionName: 'totalSupply',
      }));
      return BigInt(supply || 0);
    } catch (error) {
      console.error('Error fetching deed balance:', error);
      throw error;
    }
  };

  return {
    totalSupply,
    mint: (location: string, price: string) => mint({
      args: [location, parseEther(price)],
    }),
    mintWithMetadata: (location: string, price: string, traits: string[]) => mintWithMetadata({
      args: [location, parseEther(price), traits],
    }),
    getAllDeeds,
    getDeed,
    getDeedTraits,
    getDeedMetadata,
    getDeedOwner,
    getDeedBalance,
  };
} 
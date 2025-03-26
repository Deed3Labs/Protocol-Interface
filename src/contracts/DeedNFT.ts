import { useContractRead, useContractWrite, usePublicClient } from 'wagmi';
import { parseEther } from 'viem';
import { Alchemy, Network } from 'alchemy-sdk';
import { DeedNFT } from '@/types/deed';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

console.log('Contract Address:', CONTRACT_ADDRESS);
console.log('Alchemy API Key:', ALCHEMY_API_KEY ? 'Present' : 'Missing');

// Initialize Alchemy client
const alchemy = new Alchemy({
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
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
      if (!CONTRACT_ADDRESS) {
        throw new Error('Contract address is not defined');
      }

      const nfts = await alchemy.nft.getNftsForContract(CONTRACT_ADDRESS, {
        omitMetadata: false,
        pageSize: 100,
      });
      
      if (!nfts.nfts) {
        return [];
      }

      return nfts.nfts.map((nft) => ({
        id: nft.tokenId,
        owner: nft.owners?.[0] || '',
        description: nft.description || '',
        traits: nft.rawMetadata?.attributes?.map((attr: any) => attr.value) || [],
        location: nft.rawMetadata?.location || '',
        price: nft.rawMetadata?.price || '0',
      }));
    } catch (error) {
      console.error('Error fetching all deeds:', error);
      throw error;
    }
  };

  const getDeed = async (tokenId: string) => {
    try {
      const nft = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, tokenId);
      return nft.description || '';
    } catch (error) {
      console.error('Error fetching deed:', error);
      throw error;
    }
  };

  const getDeedTraits = async (tokenId: string) => {
    try {
      const nft = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, tokenId);
      return nft.rawMetadata?.attributes?.map((attr: any) => attr.value) || [];
    } catch (error) {
      console.error('Error fetching deed traits:', error);
      throw error;
    }
  };

  const getDeedMetadata = async (tokenId: string) => {
    try {
      const nft = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, tokenId);
      return {
        location: nft.rawMetadata?.location || '',
        price: nft.rawMetadata?.price || '0',
      };
    } catch (error) {
      console.error('Error fetching deed metadata:', error);
      throw error;
    }
  };

  const getDeedOwner = async (tokenId: string) => {
    try {
      const nft = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, tokenId);
      return nft.owners?.[0] || '';
    } catch (error) {
      console.error('Error fetching deed owner:', error);
      throw error;
    }
  };

  const getDeedBalance = async () => {
    try {
      const nfts = await alchemy.nft.getNftsForContract(CONTRACT_ADDRESS);
      return BigInt(nfts.nftCount);
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
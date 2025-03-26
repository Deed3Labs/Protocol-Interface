import { useContractRead, useContractWrite, usePublicClient } from 'wagmi';
import { parseEther } from 'viem';
import { Alchemy, Network } from 'alchemy-sdk';
import { DeedNFT } from '@/types/deed';

// Define interfaces for Alchemy response types
interface AlchemyNftAttribute {
  value: string;
  trait_type: string;
}

interface AlchemyNftMetadata {
  location: string;
  price: string;
  attributes: AlchemyNftAttribute[];
}

interface AlchemyNft {
  tokenId: string;
  owners: string[];
  description: string;
  metadata: AlchemyNftMetadata;
  attributes: AlchemyNftAttribute[];
}

interface AlchemyNftsResponse {
  nfts: AlchemyNft[];
  totalCount: number;
}

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DEEDNFT_CONTRACT_ADDRESS as `0x${string}`;
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

      // First get the total supply using contract call
      const nfts = await alchemy.nft.getNftsForContract(CONTRACT_ADDRESS, {
        omitMetadata: false,
        pageSize: 100,
        tokenUriTimeoutInMs: 10000, // Increase timeout for metadata
      }) as unknown as AlchemyNftsResponse;
      
      console.log('Alchemy Response:', JSON.stringify(nfts, null, 2));

      // If we only got contract info, try getting NFTs using contract calls
      if (!nfts.nfts || nfts.nfts.length === 0) {
        const supply = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: [{
            name: 'totalSupply',
            type: 'function',
            stateMutability: 'view',
            inputs: [],
            outputs: [{ type: 'uint256' }],
          }],
          functionName: 'totalSupply',
        });

        if (!supply) return [];

        // Fetch each NFT individually
        const tokenIds = Array.from({ length: Number(supply) }, (_, i) => i);
        const deedPromises = tokenIds.map(async (tokenId) => {
          try {
            // Get owner
            const owner = await publicClient.readContract({
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
            });

            // Get metadata
            const metadata = await publicClient.readContract({
              address: CONTRACT_ADDRESS,
              abi: [{
                name: 'getDeedMetadata',
                type: 'function',
                stateMutability: 'view',
                inputs: [{ type: 'uint256', name: 'tokenId' }],
                outputs: [{ type: 'string' }],
              }],
              functionName: 'getDeedMetadata',
              args: [BigInt(tokenId)],
            });

            // Parse metadata
            const parsedMetadata = metadata ? JSON.parse(metadata as string) : {};
            const location = parsedMetadata.location || '';
            const price = parsedMetadata.price || '0';

            const deed: DeedNFT = {
              id: tokenId.toString(),
              owner: owner as string,
              description: '',
              traits: [],
              location,
              price,
              metadata: {
                location,
                price,
              }
            };
            return deed;
          } catch (error) {
            console.error(`Error fetching deed ${tokenId}:`, error);
            return null;
          }
        });

        const deeds = (await Promise.all(deedPromises)).filter((deed): deed is DeedNFT => deed !== null);
        return deeds;
      }

      // If Alchemy returned NFTs, use that data
      return nfts.nfts.map((nft) => {
        const location = nft.metadata?.location || '';
        const price = nft.metadata?.price || '0';
        const deed: DeedNFT = {
          id: nft.tokenId,
          owner: nft.owners[0] || '',
          description: nft.description || '',
          traits: nft.attributes?.map((attr: AlchemyNftAttribute) => attr.value) || [],
          location,
          price,
          metadata: {
            location,
            price,
          }
        };
        return deed;
      });
    } catch (error) {
      console.error('Error fetching all deeds:', error);
      return [];
    }
  };

  const getDeed = async (tokenId: string) => {
    try {
      const nft = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, tokenId) as unknown as AlchemyNft;
      return nft.description || '';
    } catch (error) {
      console.error('Error fetching deed:', error);
      throw error;
    }
  };

  const getDeedTraits = async (tokenId: string) => {
    try {
      const nft = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, tokenId) as unknown as AlchemyNft;
      return nft.attributes.map((attr: AlchemyNftAttribute) => attr.value) || [];
    } catch (error) {
      console.error('Error fetching deed traits:', error);
      throw error;
    }
  };

  const getDeedMetadata = async (tokenId: string) => {
    try {
      const nft = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, tokenId) as unknown as AlchemyNft;
      return {
        location: nft.metadata.location || '',
        price: nft.metadata.price || '0',
      };
    } catch (error) {
      console.error('Error fetching deed metadata:', error);
      throw error;
    }
  };

  const getDeedOwner = async (tokenId: string) => {
    try {
      const nft = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, tokenId) as unknown as AlchemyNft;
      return nft.owners[0] || '';
    } catch (error) {
      console.error('Error fetching deed owner:', error);
      throw error;
    }
  };

  const getDeedBalance = async () => {
    try {
      const nfts = await alchemy.nft.getNftsForContract(CONTRACT_ADDRESS) as unknown as AlchemyNftsResponse;
      return BigInt(nfts.totalCount || 0);
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
import { useContractRead, useContractWrite, usePublicClient } from 'wagmi';
import { parseEther } from 'viem';
import { Alchemy } from '@alch/alchemy-sdk';
import { DeedNFT } from '@/types/deed';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

// Initialize Alchemy client
const alchemy = new Alchemy();

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

  const { writeContract } = useContractWrite();

  const getDeed = async (tokenId: string) => {
    try {
      const nft = await alchemy.getNftMetadata(CONTRACT_ADDRESS, tokenId);
      return nft.description || '';
    } catch (error) {
      console.error('Error fetching deed:', error);
      throw error;
    }
  };

  const getDeedTraits = async (tokenId: string) => {
    try {
      const nft = await alchemy.getNftMetadata(CONTRACT_ADDRESS, tokenId);
      return nft.attributes?.map((attr: any) => attr.value) || [];
    } catch (error) {
      console.error('Error fetching deed traits:', error);
      throw error;
    }
  };

  const getDeedMetadata = async (tokenId: string) => {
    try {
      const nft = await alchemy.getNftMetadata(CONTRACT_ADDRESS, tokenId);
      return {
        location: nft.metadata?.location || '',
        price: nft.metadata?.price || '0',
      };
    } catch (error) {
      console.error('Error fetching deed metadata:', error);
      throw error;
    }
  };

  const getDeedOwner = async (tokenId: string) => {
    try {
      const nft = await alchemy.getNftMetadata(CONTRACT_ADDRESS, tokenId);
      return nft.owners?.[0] || '';
    } catch (error) {
      console.error('Error fetching deed owner:', error);
      throw error;
    }
  };

  const getDeedBalance = async () => {
    try {
      const nfts = await alchemy.getNftsForContract(CONTRACT_ADDRESS);
      return BigInt(nfts.nftCount);
    } catch (error) {
      console.error('Error fetching deed balance:', error);
      throw error;
    }
  };

  return {
    totalSupply,
    mint: (location: string, price: string) => writeContract({
      address: CONTRACT_ADDRESS,
      abi: MINT_ABI,
      functionName: 'mint',
      args: [location, parseEther(price)],
    }),
    mintWithMetadata: (location: string, price: string, traits: string[]) => writeContract({
      address: CONTRACT_ADDRESS,
      abi: MINT_WITH_METADATA_ABI,
      functionName: 'mintWithMetadata',
      args: [location, parseEther(price), traits],
    }),
    getDeed,
    getDeedTraits,
    getDeedMetadata,
    getDeedOwner,
    getDeedBalance,
  };
} 
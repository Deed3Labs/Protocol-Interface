import { useContractRead, useContractWrite, usePublicClient } from 'wagmi';
import { parseEther } from 'viem';
import { DeedNFT } from '@/types/deed';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

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

  const { writeContract: mint } = useContractWrite();

  const { writeContract: mintWithMetadata } = useContractWrite();

  const getDeed = async (tokenId: string) => {
    if (!publicClient) throw new Error('Public client not initialized');
    return publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: [
        {
          name: 'getDeed',
          type: 'function',
          stateMutability: 'view',
          inputs: [{ name: 'tokenId', type: 'uint256' }],
          outputs: [{ type: 'string' }],
        },
      ],
      functionName: 'getDeed',
      args: [BigInt(tokenId)],
    });
  };

  const getDeedTraits = async (tokenId: string) => {
    if (!publicClient) throw new Error('Public client not initialized');
    return publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: [
        {
          name: 'getDeedTraits',
          type: 'function',
          stateMutability: 'view',
          inputs: [{ name: 'tokenId', type: 'uint256' }],
          outputs: [{ type: 'string[]' }],
        },
      ],
      functionName: 'getDeedTraits',
      args: [BigInt(tokenId)],
    });
  };

  const getDeedMetadata = async (tokenId: string) => {
    if (!publicClient) throw new Error('Public client not initialized');
    return publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: [
        {
          name: 'getDeedMetadata',
          type: 'function',
          stateMutability: 'view',
          inputs: [{ name: 'tokenId', type: 'uint256' }],
          outputs: [
            { name: 'location', type: 'string' },
            { name: 'price', type: 'uint256' },
          ],
        },
      ],
      functionName: 'getDeedMetadata',
      args: [BigInt(tokenId)],
    });
  };

  const getDeedOwner = async (tokenId: string) => {
    if (!publicClient) throw new Error('Public client not initialized');
    return publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: [
        {
          name: 'ownerOf',
          type: 'function',
          stateMutability: 'view',
          inputs: [{ name: 'tokenId', type: 'uint256' }],
          outputs: [{ type: 'address' }],
        },
      ],
      functionName: 'ownerOf',
      args: [BigInt(tokenId)],
    });
  };

  const getDeedBalance = async () => {
    if (!publicClient) throw new Error('Public client not initialized');
    return publicClient.readContract({
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
  };

  return {
    totalSupply,
    mint: (location: string, price: string) => mint({
      address: CONTRACT_ADDRESS,
      abi: MINT_ABI,
      functionName: 'mint',
      args: [location, parseEther(price)],
    }),
    mintWithMetadata: (location: string, price: string, traits: string[]) => mintWithMetadata({
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
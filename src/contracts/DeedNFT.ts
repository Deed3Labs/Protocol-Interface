import { useContractRead, useContractWrite, usePublicClient, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import DeedNFTABI from './abis/DeedNFT.json';

export interface DeedTraits {
  propertyType: string;
  location: string;
  value: string;
  status: string;
}

export interface DeedNFT {
  id: string;
  owner: string;
  metadata: string;
  traits: DeedTraits;
}

export const useDeedNFT = () => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const contractAddress = process.env.NEXT_PUBLIC_DEEDNFT_CONTRACT_ADDRESS || '';

  const { data: contract } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: DeedNFTABI,
    functionName: 'balanceOf',
    args: [walletClient?.account.address],
  });

  const { writeContract: mint } = useContractWrite({
    abi: DeedNFTABI,
    functionName: 'mint',
  });

  const { writeContract: mintWithMetadata } = useContractWrite({
    abi: DeedNFTABI,
    functionName: 'mintWithMetadata',
  });

  const getDeed = async (tokenId: string): Promise<string> => {
    if (!publicClient) throw new Error('Public client not initialized');
    try {
      const deed = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: DeedNFTABI,
        functionName: 'getDeed',
        args: [BigInt(tokenId)],
      });
      return deed as string;
    } catch (error) {
      console.error('Error getting deed:', error);
      throw error;
    }
  };

  const getDeedTraits = async (tokenId: string): Promise<DeedTraits> => {
    if (!publicClient) throw new Error('Public client not initialized');
    try {
      const traits = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: DeedNFTABI,
        functionName: 'getDeedTraits',
        args: [BigInt(tokenId)],
      });
      return traits as DeedTraits;
    } catch (error) {
      console.error('Error getting deed traits:', error);
      throw error;
    }
  };

  const getDeedMetadata = async (tokenId: string): Promise<string> => {
    if (!publicClient) throw new Error('Public client not initialized');
    try {
      const metadata = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: DeedNFTABI,
        functionName: 'getDeedMetadata',
        args: [BigInt(tokenId)],
      });
      return metadata as string;
    } catch (error) {
      console.error('Error getting deed metadata:', error);
      throw error;
    }
  };

  const getDeedOwner = async (tokenId: string): Promise<string> => {
    if (!publicClient) throw new Error('Public client not initialized');
    try {
      const owner = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: DeedNFTABI,
        functionName: 'ownerOf',
        args: [BigInt(tokenId)],
      });
      return owner as string;
    } catch (error) {
      console.error('Error getting deed owner:', error);
      throw error;
    }
  };

  const getDeedBalance = async (address: string): Promise<bigint> => {
    if (!publicClient) throw new Error('Public client not initialized');
    try {
      const balance = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: DeedNFTABI,
        functionName: 'balanceOf',
        args: [address as `0x${string}`],
      });
      return balance as bigint;
    } catch (error) {
      console.error('Error getting deed balance:', error);
      throw error;
    }
  };

  const getDeedTokenByIndex = async (owner: string, index: number): Promise<bigint> => {
    if (!publicClient) throw new Error('Public client not initialized');
    try {
      const tokenId = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: DeedNFTABI,
        functionName: 'tokenOfOwnerByIndex',
        args: [owner as `0x${string}`, BigInt(index)],
      });
      return tokenId as bigint;
    } catch (error) {
      console.error('Error getting deed token by index:', error);
      throw error;
    }
  };

  return {
    contract,
    mint: () => mint({
      abi: DeedNFTABI,
      functionName: 'mint',
      address: contractAddress as `0x${string}`,
    }),
    mintWithMetadata: (metadata: string) => mintWithMetadata({
      abi: DeedNFTABI,
      functionName: 'mintWithMetadata',
      address: contractAddress as `0x${string}`,
      args: [metadata],
    }),
    getDeed,
    getDeedTraits,
    getDeedMetadata,
    getDeedOwner,
    getDeedBalance,
    getDeedTokenByIndex,
  };
}; 
import { useContract, useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import DeedNFTABI from './abis/DeedNFT.json';

export interface DeedNFT {
  id: string;
  owner: string;
  metadata: string;
  traits: {
    propertyType: string;
    location: string;
    value: string;
    status: string;
  };
}

export const useDeedNFT = () => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const contractAddress = process.env.NEXT_PUBLIC_DEEDNFT_CONTRACT_ADDRESS || '';

  const contract = useContract({
    address: contractAddress,
    abi: DeedNFTABI,
    signerOrProvider: signer || provider,
  });

  const mint = async () => {
    try {
      const tx = await contract?.mint();
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Error minting:', error);
      throw error;
    }
  };

  const mintWithMetadata = async (metadata: string) => {
    try {
      const tx = await contract?.mintWithMetadata(metadata);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Error minting with metadata:', error);
      throw error;
    }
  };

  const getDeed = async (tokenId: string) => {
    try {
      const deed = await contract?.getDeed(tokenId);
      return deed;
    } catch (error) {
      console.error('Error getting deed:', error);
      throw error;
    }
  };

  const getDeedTraits = async (tokenId: string) => {
    try {
      const traits = await contract?.getDeedTraits(tokenId);
      return traits;
    } catch (error) {
      console.error('Error getting deed traits:', error);
      throw error;
    }
  };

  const getDeedMetadata = async (tokenId: string) => {
    try {
      const metadata = await contract?.getDeedMetadata(tokenId);
      return metadata;
    } catch (error) {
      console.error('Error getting deed metadata:', error);
      throw error;
    }
  };

  const getDeedOwner = async (tokenId: string) => {
    try {
      const owner = await contract?.ownerOf(tokenId);
      return owner;
    } catch (error) {
      console.error('Error getting deed owner:', error);
      throw error;
    }
  };

  const getDeedBalance = async (address: string) => {
    try {
      const balance = await contract?.balanceOf(address);
      return balance;
    } catch (error) {
      console.error('Error getting deed balance:', error);
      throw error;
    }
  };

  const getDeedTokenByIndex = async (owner: string, index: number) => {
    try {
      const tokenId = await contract?.tokenOfOwnerByIndex(owner, index);
      return tokenId;
    } catch (error) {
      console.error('Error getting deed token by index:', error);
      throw error;
    }
  };

  return {
    contract,
    mint,
    mintWithMetadata,
    getDeed,
    getDeedTraits,
    getDeedMetadata,
    getDeedOwner,
    getDeedBalance,
    getDeedTokenByIndex,
  };
}; 
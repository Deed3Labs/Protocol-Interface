import { useCallback, useState } from 'react';
import { useWalletClient } from 'wagmi';
import { DeedNFT } from '../lib/contracts/DeedNFT';
import { BrowserProvider } from 'ethers';

export const useDeedNFT = () => {
  const { data: walletClient } = useWalletClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deedNFT = useCallback(() => {
    if (!walletClient) {
      throw new Error('Wallet client not available');
    }
    const provider = new BrowserProvider(walletClient);
    return new DeedNFT(provider);
  }, [walletClient]);

  const mint = useCallback(async () => {
    if (!walletClient) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const address = await walletClient.getAddresses();
      const contract = deedNFT();
      const tx = await contract.mint(address[0]);
      await tx.wait();
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mint NFT');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [walletClient, deedNFT]);

  const mintWithMetadata = useCallback(async (metadata: string) => {
    if (!walletClient) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const address = await walletClient.getAddresses();
      const contract = deedNFT();
      const tx = await contract.mintWithMetadata(address[0], metadata);
      await tx.wait();
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mint NFT with metadata');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [walletClient, deedNFT]);

  return {
    mint,
    mintWithMetadata,
    isLoading,
    error,
  };
}; 
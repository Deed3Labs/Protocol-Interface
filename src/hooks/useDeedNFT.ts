import { useCallback, useState } from 'react';
import { useProvider, useSigner } from 'wagmi';
import { DeedNFT } from '../lib/contracts/DeedNFT';

export const useDeedNFT = () => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deedNFT = useCallback(() => {
    if (!provider || !signer) {
      throw new Error('Provider or signer not available');
    }
    return new DeedNFT(provider);
  }, [provider, signer]);

  const mint = useCallback(async () => {
    if (!signer) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const address = await signer.getAddress();
      const contract = deedNFT();
      const tx = await contract.mint(address);
      await tx.wait();
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mint NFT');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [signer, deedNFT]);

  return {
    mint,
    isLoading,
    error,
  };
}; 
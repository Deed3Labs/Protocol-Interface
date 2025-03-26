import { useEffect, useState } from 'react';
import { DeedNFT } from '@/types/deed';
import { DeedCard } from '@/components/DeedCard';
import { Alchemy, Network, Nft } from 'alchemy-sdk';

const transformToDeedNFT = (nft: Nft): DeedNFT => {
  return {
    contract: {
      address: nft.contract.address,
      contractDeployer: nft.contract.contractDeployer || ''
    },
    id: {
      tokenId: nft.tokenId,
      tokenMetadata: {
        tokenType: nft.tokenType
      }
    },
    title: nft.name || `Deed #${nft.tokenId}`,
    description: nft.description || '',
    tokenUri: {
      gateway: nft.raw?.tokenUri || '',
      raw: nft.raw?.tokenUri || ''
    },
    media: [],
    metadata: {
      metadata: [],
      attributes: nft.raw?.metadata?.attributes || []
    },
    timeLastUpdated: nft.timeLastUpdated || new Date().toISOString(),
    uniqueId: `${nft.contract.address}-${nft.tokenId}`,
    name: nft.name || `Deed #${nft.tokenId}`,
    image: {
      cachedUrl: nft.image?.cachedUrl || '',
      originalUrl: nft.image?.originalUrl || ''
    },
    raw: {
      tokenUri: nft.raw?.tokenUri || '',
      metadata: {
        name: nft.raw?.metadata?.name || '',
        description: nft.raw?.metadata?.description || '',
        image: nft.raw?.metadata?.image || '',
        attributes: nft.raw?.metadata?.attributes || []
      }
    },
    tokenId: nft.tokenId
  };
};

export default function Home() {
  const [deeds, setDeeds] = useState<DeedNFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeeds = async () => {
      try {
        const alchemy = new Alchemy({
          apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
          network: Network.ETH_SEPOLIA,
        });

        const contractAddress = process.env.NEXT_PUBLIC_DEEDNFT_CONTRACT_ADDRESS;
        if (!contractAddress) {
          throw new Error('Contract address is not defined');
        }

        const response = await alchemy.nft.getNftsForContract(contractAddress, {
          omitMetadata: false,
        });

        const transformedDeeds = response.nfts.map(transformToDeedNFT);
        setDeeds(transformedDeeds);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch deeds');
      } finally {
        setLoading(false);
      }
    };

    fetchDeeds();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading deeds...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Deed NFTs</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {deeds.map((deed) => (
          <DeedCard key={deed.id.tokenId} deed={deed} />
        ))}
      </div>
    </div>
  );
} 
import { useEffect, useState } from 'react';
import { useDeedNFT } from '@/contracts/DeedNFT';
import { DeedNFT } from '@/types/deed';
import { DeedCard } from '@/components/DeedCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { Nft } from 'alchemy-sdk';

interface NFTAttribute {
  trait_type: string;
  value: string;
}

// Add this type to match Alchemy's NFT response
interface AlchemyNFT {
  uniqueId: string;
  metadata: {
    location: any;
    price: any;
  };
  contract: {
    address: string;
    contractDeployer: string;
  };
  tokenId: string;
  tokenType: string;
  name?: string;
  description?: string;
  image?: {
    cachedUrl?: string;
    originalUrl?: string;
  };
  raw?: {
    tokenUri: string;
    metadata: {
      name: string;
      description: string;
      image: string;
      attributes: Array<{
        trait_type: string;
        value: string;
      }>;
    };
  };
}

export default function Home() {
  const router = useRouter();
  const { getAllDeeds, getDeedBalance } = useDeedNFT();
  const [deeds, setDeeds] = useState<DeedNFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeeds = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching deeds...');
        const fetchedDeeds = await getAllDeeds();
        console.log('Fetched deeds:', fetchedDeeds);
        
        if (!fetchedDeeds || !Array.isArray(fetchedDeeds)) {
          throw new Error('Invalid response from getAllDeeds');
        }

        // Transform Alchemy NFT to DeedNFT
        const transformToDeedNFT = (nft: Nft): DeedNFT => {
          const uniqueId = `${nft.contract.address}-${nft.tokenId}`;
          
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
              attributes: (nft.raw?.metadata?.attributes || []).map((attr: { trait_type: string; value: string }) => ({
                trait_type: attr.trait_type,
                value: attr.value
              }))
            },
            timeLastUpdated: nft.timeLastUpdated || new Date().toISOString(),
            uniqueId,
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

        const processedDeeds = fetchedDeeds.map(transformToDeedNFT);

        console.log('Processed deeds:', processedDeeds);
        setDeeds(processedDeeds);
      } catch (err) {
        console.error('Error fetching deeds:', err);
        setError('Failed to load deeds. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeeds();
  }, [getAllDeeds]);

  const handleMintClick = () => {
    router.push('/mint');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Deeds...</h1>
          <p className="text-muted-foreground">Please wait while we fetch your deeds.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Deeds</h1>
        <Button onClick={handleMintClick}>Mint New Deed</Button>
      </div>

      {deeds.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">No Deeds Found</h2>
          <p className="text-muted-foreground mb-6">You haven't minted any deeds yet.</p>
          <Button onClick={handleMintClick}>Mint Your First Deed</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {deeds.map((deed) => (
            <DeedCard 
              key={deed.uniqueId} 
              deed={deed} 
            />
          ))}
        </div>
      )}
    </div>
  );
} 
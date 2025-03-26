import { useEffect, useState } from 'react';
import { useDeedNFT } from '@/contracts/DeedNFT';
import { DeedNFT } from '@/types/deed';
import { DeedCard } from '@/components/DeedCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

interface NFTAttribute {
  trait_type: string;
  value: string;
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

        const processedDeeds = fetchedDeeds.map((deed, index) => {
          // Debug log to see the structure of each deed
          console.log(`Processing deed ${index}:`, deed);
          
          // Ensure we have valid identifiers
          if (!deed.contract?.address || !deed.tokenId) {
            console.warn(`Missing contract address or tokenId for deed ${index}:`, deed);
          }

          return {
            ...deed,
            // Use index as fallback if we don't have contract address or tokenId
            uniqueId: deed.tokenId 
              ? `${deed.contract?.address || 'unknown'}-${deed.tokenId}`
              : `fallback-${index}`,
            metadata: {
              location: deed.name || deed.raw?.metadata?.name || `Deed #${deed.tokenId || index}`,
              price: deed.raw?.metadata?.attributes?.find((attr: NFTAttribute) => attr.trait_type === "Price")?.value || "N/A",
            },
          };
        });

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
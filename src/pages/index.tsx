import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useDeedNFT } from '@/contracts/DeedNFT';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/router';

interface DeedNFT {
  id: number;
  owner: string;
  metadata: {
    location: string;
    price: string;
  };
  traits: Record<string, string>;
}

export default function HomePage() {
  const { address } = useAccount();
  const router = useRouter();
  const [deeds, setDeeds] = useState<DeedNFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getDeed, getDeedTraits, getDeedMetadata, getDeedOwner, getDeedBalance } = useDeedNFT();

  useEffect(() => {
    const fetchAllDeeds = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get total supply of deeds
        const totalSupply = await getDeedBalance();
        console.log('Total supply:', totalSupply);

        // Fetch all deeds
        const deedsData = await Promise.all(
          Array.from({ length: Number(totalSupply) }, (_, i) => i).map(async (tokenId) => {
            const deed = await getDeed(tokenId.toString()) as string;
            const traits = await getDeedTraits(tokenId.toString()) as string[];
            const [location, price] = await getDeedMetadata(tokenId.toString()) as readonly [string, bigint];
            const owner = await getDeedOwner(tokenId.toString()) as string;
            
            return {
              id: tokenId,
              owner,
              metadata: {
                location,
                price: price.toString(),
              },
              traits: traits.reduce((acc, trait, index) => {
                acc[`Trait ${index + 1}`] = trait;
                return acc;
              }, {} as Record<string, string>),
            };
          })
        );

        setDeeds(deedsData);
      } catch (err) {
        console.error('Error fetching deeds:', err);
        setError('Failed to load deeds. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllDeeds();
  }, [getDeed, getDeedTraits, getDeedMetadata, getDeedOwner, getDeedBalance]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading deeds...</h1>
          <p className="text-muted-foreground">Please wait while we fetch all deeds from the contract.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Deeds</h1>
        <Button onClick={() => router.push('/mint')}>Mint New Deed</Button>
      </div>

      {deeds.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No Deeds Found</h2>
          <p className="text-muted-foreground mb-4">
            Be the first to mint a deed!
          </p>
          <Button onClick={() => router.push('/mint')}>Mint Your First Deed</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deeds.map((deed) => (
            <Card key={deed.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>Deed #{deed.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Owner:</span>{' '}
                    {deed.owner.slice(0, 6)}...{deed.owner.slice(-4)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Location:</span>{' '}
                    {deed.metadata.location}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Price:</span>{' '}
                    {deed.metadata.price} ETH
                  </p>
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Traits:</h3>
                    <ul className="space-y-1">
                      {Object.entries(deed.traits).map(([key, value]) => (
                        <li key={key} className="text-sm">
                          <span className="font-medium">{key}:</span> {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 
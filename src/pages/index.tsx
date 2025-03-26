import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useDeedNFT } from '@/contracts/DeedNFT';
import { DeedNFT } from '@/types/deed';
import { DeedCard } from '@/components/DeedCard';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/router';

export default function HomePage() {
  const { address } = useAccount();
  const router = useRouter();
  const { getDeedBalance, getDeedMetadata, getDeedTraits, getDeedOwner } = useDeedNFT();
  const [deeds, setDeeds] = useState<DeedNFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeeds = async () => {
      if (!address) {
        alert('Please connect your wallet first');
        return;
      }

      try {
        setLoading(true);
        const balance = await getDeedBalance();
        const deedPromises = Array.from({ length: Number(balance) }, async (_, i) => {
          const tokenId = i.toString();
          const metadata = await getDeedMetadata(tokenId);
          const traits = await getDeedTraits(tokenId);
          const owner = await getDeedOwner(tokenId);
          return {
            id: tokenId,
            owner,
            metadata,
            traits,
          };
        });

        const fetchedDeeds = await Promise.all(deedPromises);
        setDeeds(fetchedDeeds);
      } catch (err) {
        console.error('Error fetching deeds:', err);
        setError('Failed to fetch deeds');
      } finally {
        setLoading(false);
      }
    };

    fetchDeeds();
  }, [address, getDeedBalance, getDeedMetadata, getDeedTraits, getDeedOwner]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Loading deeds...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-red-600 sm:text-4xl">
              {error}
            </h2>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Deeds
          </h2>
          <Button onClick={() => router.push('/mint')}>Mint New Deed</Button>
        </div>
        {deeds.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No Deeds Found</h3>
            <p className="text-gray-600 mb-4">
              Be the first to mint a deed!
            </p>
            <Button onClick={() => router.push('/mint')}>Mint Your First Deed</Button>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {deeds.map((deed) => (
              <DeedCard key={deed.id} deed={deed} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
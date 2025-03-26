import { useEffect, useState } from 'react';
import { useDeedNFT } from '@/contracts/DeedNFT';
import { DeedNFT } from '@/types/deed';
import { DeedCard } from '@/components/DeedCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const { getAllDeeds } = useDeedNFT();
  const [deeds, setDeeds] = useState<DeedNFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeeds = async () => {
      try {
        setLoading(true);
        const fetchedDeeds = await getAllDeeds();
        setDeeds(fetchedDeeds.map(deed => ({
          ...deed,
          metadata: {
            location: deed.location,
            price: deed.price,
          },
        })));
      } catch (err) {
        console.error('Error fetching deeds:', err);
        setError('Failed to fetch deeds. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeeds();
  }, [getAllDeeds]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading deeds...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500 mb-4">{error}</div>
        <div className="text-center">
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Deeds</h1>
        <Link href="/mint">
          <Button>Mint New Deed</Button>
        </Link>
      </div>

      {deeds.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No deeds found.</p>
          <Link href="/mint">
            <Button>Mint Your First Deed</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deeds.map((deed) => (
            <DeedCard key={deed.id} deed={deed} />
          ))}
        </div>
      )}
    </div>
  );
} 
import React, { useState } from 'react';
import { DeedNFT } from '@/types/deed';
import { ListView } from '@/components/ListView';
import { GridView } from '@/components/GridView';
import { FilterToolbar } from '@/components/FilterToolbar';
import { CollectionHeader } from '@/components/CollectionHeader';
import { CollectionStats } from '@/components/CollectionStats';
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
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [deeds, setDeeds] = useState<DeedNFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Example collection data
  const collectionData = {
    name: 'DeedNFT',
    isVerified: true,
    creator: {
      address: process.env.NEXT_PUBLIC_DEEDNFT_CONTRACT_ADDRESS || '',
      name: 'DeedNFT Creator',
      isVerified: true
    },
    stats: {
      totalSupply: deeds.length,
      floorPrice: 0.1,
      totalVolume: 100,
      volume24h: 10,
      listed: 0.05,
      owners: {
        total: 50,
        unique: 0.8
      }
    },
    bannerImage: '/banner.jpg', // Add your banner image
    logoImage: '/logo.jpg', // Add your logo image
    chain: 'Ethereum',
    category: 'Real Estate'
  };

  React.useEffect(() => {
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
    <main>
      <CollectionHeader
        name={collectionData.name}
        isVerified={collectionData.isVerified}
        creator={collectionData.creator}
        stats={collectionData.stats}
        bannerImage={collectionData.bannerImage}
        logoImage={collectionData.logoImage}
        chain={collectionData.chain}
        category={collectionData.category}
      />
      <CollectionStats
        floorPrice={collectionData.stats.floorPrice}
        totalVolume={collectionData.stats.totalVolume}
        volume24h={collectionData.stats.volume24h}
        listed={collectionData.stats.listed}
        owners={collectionData.stats.owners}
      />
      <div className="grid xl:gap-6" style={{ minHeight: 'calc(-428px + 100vh)' }}>
        <div className="flex min-w-0 flex-col -mx-2">
          {/* Filter Toolbar */}
          <FilterToolbar view={view} onViewChange={setView} />

          {/* Main Content */}
          <div className="h-full">
            <div className="flex flex-col w-full min-w-0 pb-4">
              {/* View Container */}
              <div className="w-full">
                {view === 'list' ? (
                  <ListView deeds={deeds} />
                ) : (
                  <GridView deeds={deeds} />
                )}
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="h-bottom-action-bar">
            <div className="flex items-center left-0 right-scrollbar-size z-action-bar h-bottom-action-bar w-full bg-bg-primary border-t border-border-1 overflow-y-auto lg:left-side-nav lg:w-[calc(100%_-_theme(spacing.side-nav)-theme(spacing.scrollbar-size))] fixed bottom-0 lg:!bottom-page-footer">
              <div className="mx-auto min-h-0 w-full min-w-0 max-w-screen-4xl px-4 md:px-6 lg:px-4 xl:px-4 2xl:px-6 4xl:px-8 max:px-0 flex items-center">
                <div className="flex items-center gap-4">
                  {/* Buy/Sell Toggle */}
                  <div className="inline-flex rounded-md gap-1 overflow-hidden bg-bg-additional-1 p-0.5">
                    <button className="relative flex items-center rounded-md py-1 px-3 h-7 text-sm font-medium text-text-primary bg-bg-primary">
                      Buy
                    </button>
                    <button className="relative flex items-center rounded-md py-1 px-3 h-7 text-sm text-text-secondary hover:text-text-primary">
                      Sell
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <button className="inline-flex items-center whitespace-nowrap rounded-md transition duration-200 justify-center font-medium bg-bg-primary hover:bg-bg-additional-1 focus:bg-bg-additional-1 active:bg-bg-additional-1 border border-border-1 hover:border-border-2 focus:border-border-2 active:border-border-2 h-8 gap-1 px-3 text-sm disabled:pointer-events-none disabled:opacity-40">
                      Make collection offer
                    </button>
                    <button className="inline-flex items-center whitespace-nowrap rounded-md transition duration-200 justify-center font-medium bg-blue-500 hover:bg-blue-600 text-white h-8 gap-1 px-3 text-sm disabled:pointer-events-none disabled:opacity-40">
                      Buy floor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 
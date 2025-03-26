import React from 'react';
import { CollectionHeader } from '../../components/CollectionHeader';
import { CollectionStats } from '../../components/CollectionStats';
import { FilterToolbar } from '../../components/FilterToolbar';

export default function CollectionPage() {
  const [view, setView] = React.useState<'grid' | 'list'>('grid');

  // Example data - replace with real data from your API
  const collectionData = {
    name: 'Axie',
    isVerified: true,
    creator: {
      address: '0xf20fe980677d703a0a1fe5f38cc9ab0f1452ca11',
      name: 'axie_deployer',
      isVerified: true
    },
    stats: {
      totalSupply: 12114372,
      floorPrice: 3.97,
      totalVolume: 6258513.54,
      volume24h: 125973.37,
      listed: 0.000094,
      owners: {
        total: 2075716,
        unique: 0.1713
      }
    },
    bannerImage: 'https://i.seadn.io/s/raw/files/62c9a3e7591c9aa2b59a8020ea703b66.jpg',
    logoImage: 'https://i.seadn.io/s/raw/files/699012bd9916d0febd565e27ddf1d58e.jpg',
    chain: 'Ronin',
    category: 'Gaming'
  };

  return (
    <div>
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
      <FilterToolbar view={view} onViewChange={setView} />
      {/* Add your grid/list view components here */}
    </div>
  );
} 
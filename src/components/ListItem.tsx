import React from 'react';
import { DeedNFT } from '@/types/deed';
import Image from 'next/image';

interface ListItemProps {
  deed: DeedNFT;
}

export function ListItem({ deed }: ListItemProps) {
  return (
    <div className="grid grid-cols-7 gap-4 p-4 items-center hover:bg-muted/50 transition-colors">
      {/* Deed Info */}
      <div className="col-span-2 flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-md overflow-hidden">
          <Image
            src={deed.image || '/placeholder.png'}
            alt={deed.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-medium">{deed.name}</div>
          <div className="text-sm text-muted-foreground">{deed.tokenId}</div>
        </div>
      </div>
      
      {/* Price */}
      <div className="text-sm">
        ${deed.price?.toLocaleString()}
      </div>

      {/* Type */}
      <div className="text-sm">
        {deed.type}
      </div>

      {/* Location */}
      <div className="text-sm">
        {deed.location || 'N/A'}
      </div>

      {/* Last Sale */}
      <div className="text-sm">
        ${deed.lastSale?.toLocaleString() || 'N/A'}
      </div>

      {/* Owner */}
      <div className="text-sm font-medium">
        {deed.owner?.slice(0, 6)}...{deed.owner?.slice(-4)}
      </div>
    </div>
  );
} 
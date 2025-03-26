import React from 'react';
import { DeedNFT } from '@/types/deed';
import Image from 'next/image';

interface GridViewProps {
  deeds: DeedNFT[];
}

export function GridView({ deeds }: GridViewProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
      {deeds.map((deed) => (
        <div key={deed.id.tokenId} className="relative bg-card rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
          {/* Image */}
          <div className="relative aspect-square">
            <Image
              src={deed.image?.cachedUrl || '/placeholder.png'}
              alt={deed.name || ''}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="p-3 space-y-2">
            {/* Title */}
            <div className="text-sm font-medium truncate">
              {deed.name}
            </div>

            {/* Price */}
            <div className="flex justify-between items-center">
              <div className="text-sm">
                <span className="font-mono">{deed.price || '—'}</span>
                {deed.price && <span className="text-muted-foreground font-mono ml-1">RON</span>}
              </div>
              <div className="text-xs text-muted-foreground">
                Last sale {deed.lastSale || '—'} RON
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 
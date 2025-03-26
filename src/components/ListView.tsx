import React from 'react';
import { DeedNFT } from '@/types/deed';
import { ListItem } from './ListItem';
import { Checkbox } from './ui/checkbox';

interface ListViewProps {
  deeds: DeedNFT[];
}

export function ListView({ deeds }: ListViewProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="inline-flex w-max min-w-full items-center gap-4 py-2 text-sm text-muted-foreground">
        {/* Checkbox Header */}
        <div className="flex items-center shrink-0 grow-0 overflow-hidden first:pl-2 last:pr-2 justify-start w-6">
          <Checkbox />
        </div>

        {/* Item Header */}
        <div className="flex items-center shrink-0 overflow-hidden first:pl-2 last:pr-2 justify-start z-[1] w-[120px] grow-[2] pr-2">
          Item
        </div>

        {/* Rarity Header */}
        <div className="flex items-center shrink-0 overflow-hidden first:pl-2 last:pr-2 justify-end w-[70px] grow">
          Rarity
        </div>

        {/* Price Header */}
        <div className="flex items-center shrink-0 overflow-hidden first:pl-2 last:pr-2 justify-end w-[130px] grow">
          Price
        </div>

        {/* Top Offer Header */}
        <div className="flex items-center shrink-0 overflow-hidden first:pl-2 last:pr-2 justify-end w-[130px] grow">
          Top Offer
        </div>

        {/* Last Sale Header */}
        <div className="flex items-center shrink-0 overflow-hidden first:pl-2 last:pr-2 justify-end w-[110px] grow">
          Last Sale
        </div>

        {/* Owner Header */}
        <div className="flex items-center shrink-0 overflow-hidden first:pl-2 last:pr-2 justify-end w-[70px] grow">
          Owner
        </div>

        {/* Listed Header */}
        <div className="flex items-center shrink-0 overflow-hidden first:pl-2 last:pr-2 justify-end w-[70px] grow">
          Listed
        </div>
      </div>

      {/* List Items */}
      <div className="space-y-1">
        {deeds.map((deed) => (
          <ListItem key={deed.id.tokenId} deed={deed} />
        ))}
      </div>
    </div>
  );
} 
import React from 'react';
import { DeedNFT } from '@/types/deed';
import { ListItem } from './ListItem';

interface ListViewProps {
  deeds: DeedNFT[];
}

export function ListView({ deeds }: ListViewProps) {
  return (
    <div className="w-full">
      <div className="bg-card dark:bg-[#1c1c1c] rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-7 gap-4 p-4 text-sm font-medium text-muted-foreground border-b border-border">
          <div className="col-span-2">Deed</div>
          <div>Price</div>
          <div>Type</div>
          <div>Location</div>
          <div>Last Sale</div>
          <div>Owner</div>
        </div>
        {/* List Items */}
        <div className="divide-y divide-border">
          {deeds.map((deed) => (
            <ListItem key={deed.id} deed={deed} />
          ))}
        </div>
      </div>
    </div>
  );
} 
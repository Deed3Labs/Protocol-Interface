import React from 'react';
import { DeedNFT } from '@/types/deed';
import Image from 'next/image';
import { Checkbox } from './ui/checkbox';
import { cn } from '@/lib/utils';

interface ListItemProps {
  deed: DeedNFT;
}

export function ListItem({ deed }: ListItemProps) {
  return (
    <div className="inline-flex w-max min-w-full items-center gap-4 rounded group cursor-pointer hover:bg-muted/50 h-8 text-sm">
      {/* Checkbox */}
      <div className="flex items-center shrink-0 grow-0 overflow-hidden first:pl-2 last:pr-2 justify-start w-6">
        <Checkbox />
      </div>

      {/* Deed Info */}
      <div className="flex items-center shrink-0 overflow-hidden first:pl-2 last:pr-2 justify-start z-[1] w-[120px] grow-[2] pr-2">
        <div className="flex items-center gap-3 w-auto max-w-full">
          <div className="relative size-6 min-h-6 min-w-6 shrink-0 rounded overflow-hidden">
            <Image
              src={deed.image?.cachedUrl || '/placeholder.png'}
              alt={deed.name || ''}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center overflow-hidden flex-auto items-start self-stretch">
            <div className="flex items-center w-full gap-1">
              <div className="max-w-full truncate break-all">
                <span className="leading-normal text-foreground text-sm font-normal">
                  {deed.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rarity */}
      <div className="flex items-center shrink-0 overflow-hidden first:pl-2 last:pr-2 justify-end w-[70px] grow">
        <span className="font-mono">—</span>
      </div>

      {/* Price */}
      <div className="flex items-center shrink-0 overflow-hidden first:pl-2 last:pr-2 justify-end w-[130px] grow">
        <div className="inline-flex items-center gap-1 truncate">
          <span className="font-mono">{deed.price || '—'}</span>
          <span className="text-muted-foreground font-mono"> RON</span>
        </div>
      </div>

      {/* Top Offer */}
      <div className="flex items-center shrink-0 overflow-hidden first:pl-2 last:pr-2 justify-end w-[130px] grow">
        <div className="items-center inline-flex gap-1 truncate">
          <span className="font-mono">—</span>
        </div>
      </div>

      {/* Last Sale */}
      <div className="flex items-center shrink-0 overflow-hidden first:pl-2 last:pr-2 justify-end w-[110px] grow">
        <div className="items-center inline-flex gap-1 truncate">
          <span className="font-mono">{deed.lastSale || '—'}</span>
          {deed.lastSale && <span className="text-muted-foreground font-mono"> RON</span>}
        </div>
      </div>

      {/* Owner */}
      <div className="flex items-center shrink-0 overflow-hidden first:pl-2 last:pr-2 justify-end w-[70px] grow">
        <div className="flex items-center gap-2 text-sm">
          <div className="max-w-full truncate break-all">
            {deed.contract?.contractDeployer?.slice(0, 6) || '—'}
          </div>
        </div>
      </div>

      {/* Listed */}
      <div className="flex items-center shrink-0 overflow-hidden first:pl-2 last:pr-2 justify-end w-[70px] grow">
        <span>2m ago</span>
      </div>
    </div>
  );
} 
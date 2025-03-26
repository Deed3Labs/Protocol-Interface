import React from 'react';

interface CollectionStatsProps {
  floorPrice?: number;
  topOffer?: number;
  dailyChange?: number;
  volume24h?: number;
  totalVolume?: number;
  listed?: number;
  owners?: {
    total: number;
    unique: number;
  };
  currency?: string;
}

export function CollectionStats({
  floorPrice,
  topOffer,
  dailyChange,
  volume24h,
  totalVolume,
  listed,
  owners,
  currency = 'RON'
}: CollectionStatsProps) {
  return (
    <div className="relative -mx-4 w-[stretch] md:-mx-6 lg:-mx-4 xl:-mx-4 2xl:-mx-6 4xl:mx-[min(calc(((100vw-1920px)/2)*-1+5px),-32px)] max:mx-[calc(((100vw-1920px)/2-37px)*-1)] dark bg-bg-app pb-4 md:-mt-4 lg:hidden">
      <div className="mx-4 md:mx-6">
        <div>
          <div className="shrink-0 bg-border-1-transparent h-px w-full my-4" />
          <div className="flex items-center overflow-hidden md:gap-8 lg:justify-end">
            <div className="flex flex-none gap-4 overflow-hidden md:gap-8 w-full justify-between md:w-auto">
              {/* Floor Price */}
              <div>
                <div className="flex flex-col items-end gap-2 whitespace-nowrap select-text">
                  <span className="leading-tight font-mono uppercase text-xs opacity-60 self-start md:self-auto">
                    Floor price
                  </span>
                  <span className="leading-tight font-mono uppercase text-sm font-medium self-start md:self-auto md:text-md">
                    {floorPrice ? `${floorPrice} ${currency}` : '—'}
                  </span>
                </div>
              </div>

              {/* Top Offer */}
              <div>
                <div className="flex flex-col items-end gap-2 whitespace-nowrap select-text">
                  <span className="leading-tight font-mono uppercase text-xs opacity-60 self-start md:self-auto">
                    Top offer
                  </span>
                  <span className="leading-tight font-mono uppercase text-sm font-medium self-start md:self-auto md:text-md">
                    {topOffer ? `${topOffer} ${currency}` : '—'}
                  </span>
                </div>
              </div>

              {/* 24h Volume */}
              <div>
                <div className="flex flex-col items-end gap-2 whitespace-nowrap select-text">
                  <span className="leading-tight font-mono uppercase text-xs opacity-60 self-start md:self-auto">
                    24h volume
                  </span>
                  <span className="leading-tight font-mono uppercase text-sm font-medium self-start md:self-auto md:text-md">
                    {volume24h ? `${volume24h.toLocaleString()} ${currency}` : '—'}
                  </span>
                </div>
              </div>

              {/* Total Volume */}
              <div>
                <div className="flex flex-col items-end gap-2 whitespace-nowrap select-text">
                  <span className="leading-tight font-mono uppercase text-xs opacity-60 self-start md:self-auto">
                    Total volume
                  </span>
                  <span className="leading-tight font-mono uppercase text-sm font-medium self-start md:self-auto md:text-md">
                    {totalVolume ? `${totalVolume.toLocaleString()} ${currency}` : '—'}
                  </span>
                </div>
              </div>

              {/* Listed */}
              <div className="hidden md:flex lg:hidden 3xl:flex">
                <div className="flex flex-col items-end gap-2 whitespace-nowrap select-text">
                  <span className="leading-tight font-mono uppercase text-xs opacity-60 self-start md:self-auto">
                    Listed
                  </span>
                  <span className="leading-tight font-mono uppercase text-sm font-medium self-start md:self-auto md:text-md">
                    {listed ? `${(listed * 100).toFixed(2)}%` : '—'}
                  </span>
                </div>
              </div>

              {/* Owners */}
              {owners && (
                <div className="hidden md:flex lg:hidden 2xl:flex">
                  <div className="flex flex-col items-end gap-2 whitespace-nowrap select-text">
                    <span className="leading-tight font-mono uppercase text-xs opacity-60 self-start md:self-auto">
                      Owners (Unique)
                    </span>
                    <span className="leading-tight font-mono uppercase text-sm font-medium self-start md:self-auto md:text-md">
                      {owners.total.toLocaleString()} ({(owners.unique * 100).toFixed(2)}%)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
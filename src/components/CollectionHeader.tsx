import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Copy, Globe, MoreHorizontal, Check } from 'lucide-react';

interface CollectionHeaderProps {
  name: string;
  isVerified?: boolean;
  creator?: {
    address: string;
    name: string;
    isVerified?: boolean;
  };
  stats?: {
    totalSupply?: number;
    floorPrice?: number;
    totalVolume?: number;
  };
  bannerImage?: string;
  logoImage?: string;
  chain?: string;
  category?: string;
}

export function CollectionHeader({
  name,
  isVerified = false,
  creator,
  stats,
  bannerImage,
  logoImage,
  chain,
  category
}: CollectionHeaderProps) {
  return (
    <div id="hero-header" className="dark -mx-4 bg-bg-app px-4">
      <div>
        {/* Banner Image */}
        <div className="absolute right-0 flex w-full aspect-4/3 md:aspect-16/9 lg:aspect-8/3 3xl:max-h-[min(670px,_100vh_-_270px)] pointer-events-none top-0 z-hero-header-banner-media overflow-hidden">
          <div className="absolute inset-0 transition-[opacity] duration-1000 ease-out-quint top-0 size-full overflow-hidden opacity-100 z-10">
            {bannerImage && (
              <div className="relative size-full inset-0">
                <Image
                  src={bannerImage}
                  alt={`${name} banner`}
                  fill
                  className="size-full object-cover object-center"
                />
                <div className="absolute inset-0 z-20 dark bg-[linear-gradient(180deg,rgb(var(--color-bg-app)/65%)_0%,rgb(var(--color-bg-app)/40%)_25%,rgb(var(--color-bg-app)/35%)_50%,rgb(var(--color-bg-app)/75%)_75%,rgb(var(--color-bg-app))_100%)] transition-opacity duration-500 ease-out-quint opacity-100" />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex w-full min-w-0 flex-col pb-4 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:justify-between xl:gap-4 xl:pb-5">
          <div className="flex flex-col lg:grow">
            <div className="flex w-full items-center gap-3 border-border-2 border-0 p-0 min-w-0 select-text">
              {/* Logo */}
              {logoImage && (
                <div className="relative inline-block shrink-0 w-[60px] h-[60px]">
                  <Image
                    src={logoImage}
                    alt={`${name} logo`}
                    width={60}
                    height={60}
                    className="object-cover aspect-square overflow-hidden rounded"
                  />
                </div>
              )}

              {/* Collection Info */}
              <div className="flex flex-col justify-center flex-auto items-start self-stretch gap-1 overflow-visible">
                <div className="flex items-center gap-2">
                  <h1 className="font-medium text-heading-lg">{name}</h1>
                  {isVerified && (
                    <svg aria-label="Verified" className="fill-blue-3 shrink-0 size-6" viewBox="0 -960 960 960">
                      <path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm94-278 226-226-56-58-170 170-86-84-56 56 142 142Z" />
                      <path className="fill-white" d="M438-338 L664-564 L608-622 L438-452 L352-538 L296-482 L438-338 Z" />
                    </svg>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-5">
                  <Button variant="ghost" size="icon">
                    <Copy className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>

                {/* Tags */}
                <div className="flex w-full gap-2 flex-wrap md:flex-nowrap">
                  {creator && (
                    <Link href={`/${creator.address}/created`} className="flex items-center h-[18px] w-fit whitespace-nowrap rounded px-1.5 py-1 bg-frosted-2 border border-frosted-3 font-mono uppercase text-xs">
                      <span>By {creator.name}</span>
                      {creator.isVerified && <Check className="h-3 w-3 ml-1" />}
                    </Link>
                  )}
                  {chain && (
                    <div className="flex items-center h-[18px] w-fit whitespace-nowrap rounded px-1.5 py-1 bg-frosted-2 border border-frosted-3 font-mono uppercase text-xs">
                      {chain}
                    </div>
                  )}
                  {stats?.totalSupply && (
                    <div className="flex items-center h-[18px] w-fit whitespace-nowrap rounded px-1.5 py-1 bg-frosted-2 border border-frosted-3 font-mono uppercase text-xs">
                      {stats.totalSupply.toLocaleString()}
                    </div>
                  )}
                  {category && (
                    <div className="flex items-center h-[18px] w-fit whitespace-nowrap rounded px-1.5 py-1 bg-frosted-2 border border-frosted-3 font-mono uppercase text-xs">
                      {category}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
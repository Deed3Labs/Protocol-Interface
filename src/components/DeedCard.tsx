"use client"

import { Card } from "@/components/ui/card";
import { DeedNFT } from "@/types/deed";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";

interface DeedCardProps {
  deed: DeedNFT;
  small?: boolean;
}

export function DeedCard({ deed, small = false }: DeedCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the validation status from attributes
  const validationStatus = deed.raw?.metadata?.attributes?.find(
    attr => attr.trait_type === "Validation Status"
  )?.value || "Unvalidated";

  // Get the property type from attributes
  const propertyType = deed.raw?.metadata?.attributes?.find(
    attr => attr.trait_type === "Asset Type"
  )?.value || "Land";

  // Get location details from attributes
  const state = deed.raw?.metadata?.attributes?.find(
    attr => attr.trait_type === "State"
  )?.value;

  if (!mounted) {
    return (
      <Card className="w-full h-[391px] p-2.5 border-white/10">
        <div className="animate-pulse">
          <div className="h-60 bg-muted" />
          <div className="h-32 mt-2.5 space-y-4">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-14 bg-muted rounded" />
          </div>
        </div>
      </Card>
    );
  }

  const imageSection = (
    <div className={cn(
      "relative bg-white/5",
      small ? "h-16 w-16" : "h-60"
    )}>
      {deed.image?.cachedUrl ? (
        <Image
          src={deed.image.cachedUrl}
          alt={deed.name || `Deed #${deed.tokenId}`}
          fill
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <BadgeCheck className="h-12 w-12 text-muted-foreground/50" />
        </div>
      )}
      {!small && (
        <div className="absolute bottom-2 right-2">
          <div className="w-7 h-7 bg-zinc-900/40 rounded-full border border-white/10 flex items-center justify-center">
            <BadgeCheck className={cn(
              "w-5 h-5",
              validationStatus === "Unvalidated" ? "text-yellow-500" : "text-white"
            )} />
          </div>
        </div>
      )}
    </div>
  );

  if (small) {
    return (
      <Link href={`/deed/${deed.tokenId}`} className="block">
        {imageSection}
      </Link>
    );
  }

  return (
    <Link href={`/deed/${deed.tokenId}`} className="block">
      <Card className="w-full h-[391px] p-2.5 border-white/10">
        {imageSection}
        <div className="h-32 mt-2.5 flex flex-col gap-3">
          <div className="px-2">
            <div className="flex items-center gap-1 mb-0.5">
              <BadgeCheck 
                className={cn(
                  "w-4 h-4",
                  validationStatus === "Unvalidated" ? "text-yellow-500" : "text-white"
                )} 
              />
              <span className="text-[9px] text-muted-foreground tracking-wider">
                {deed.contract?.contractDeployer?.slice(0, 6)}...{deed.contract?.contractDeployer?.slice(-4)}
              </span>
            </div>
            <h3 className="text-sm font-normal line-clamp-2">
              {deed.name || deed.raw?.metadata?.name || `Deed #${deed.tokenId}`}
            </h3>
          </div>

          <div className="px-3 py-2.5 bg-muted/30 border border-white/10">
            <div className="flex justify-between">
              <div>
                <div className="text-xs text-muted-foreground tracking-wider">
                  PRICE
                </div>
                <div className="text-sm font-medium uppercase">
                  $500,000
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground tracking-wider">
                  TYPE
                </div>
                <div className="text-sm font-medium uppercase">
                  {propertyType}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground tracking-wider">
                  LOCATION
                </div>
                <div className="text-sm font-medium uppercase">
                  {state || "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
} 
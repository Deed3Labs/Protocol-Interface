"use client"

import { Card } from "@/components/ui/card";
import { DeedNFT } from "@/types/deed";
import { BadgeCheck, Coins } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
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

  // Default coordinates for Austin, TX if we can't parse the location
  const defaultCoords = {
    lat: 30.2672,
    lng: -97.7431
  };

  const [latitude, longitude] = [defaultCoords.lat, defaultCoords.lng];
  const zoom = 15;
  const lat_rad = latitude * Math.PI / 180;
  const n = Math.pow(2, zoom);
  const xtile = Math.floor((longitude + 180) / 360 * n);
  const ytile = Math.floor((1 - Math.log(Math.tan(lat_rad) + 1 / Math.cos(lat_rad)) / Math.PI) / 2 * n);
  const isValidCoordinates = true;

  if (!mounted) {
    return (
      <Card className="group relative overflow-hidden bg-background hover:shadow-xl transition-all duration-300 border border-border/50">
        <div className="animate-pulse">
          <div className="relative aspect-square bg-muted" />
          <div className="p-4 space-y-4">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
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
      {isValidCoordinates ? (
        <Image
          src={`https://tile.openstreetmap.org/${zoom}/${xtile}/${ytile}.png`}
          alt={`Location ${deed.metadata.location}`}
          fill
          className="object-cover"
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-muted" />
      )}
      {!small && (
        <div className="absolute bottom-2 right-2">
          <div className="w-7 h-7 bg-zinc-900/40 rounded-full border border-white/10 flex items-center justify-center">
            <BadgeCheck className={cn(
              "w-5 h-5",
              deed.traits.includes("Unvalidated") ? "text-yellow-500" : "text-white"
            )} />
          </div>
        </div>
      )}
    </div>
  );

  if (small) {
    return (
      <Link href={`/deed/${deed.id}`} className="block">
        {imageSection}
      </Link>
    );
  }

  return (
    <Link href={`/deed/${deed.id}`} className="block">
      <Card className="w-full h-[391px] p-2.5 border-white/10">
        {imageSection}
        <div className="h-32 mt-2.5 flex flex-col gap-3">
          <div className="px-2">
            <div className="flex items-center gap-1 mb-0.5">
              <BadgeCheck 
                className={cn(
                  "w-4 h-4",
                  deed.traits.includes("Unvalidated") ? "text-yellow-500" : "text-white"
                )} 
              />
              <span className="text-[9px] text-muted-foreground tracking-wider">
                {deed.owner.slice(0, 6)}...{deed.owner.slice(-4)}
              </span>
            </div>
            <h3 className="text-sm font-normal line-clamp-2">
              {deed.metadata.location}
            </h3>
          </div>

          <div className="px-3 py-2.5 bg-muted/30 border border-white/10">
            <div className="flex justify-between">
              <div>
                <div className="text-[0.68vw] text-muted-foreground tracking-wider">
                  PRICE
                </div>
                <div className="text-[0.74vw] font-medium uppercase">
                  {deed.metadata.price}
                </div>
              </div>
              <div>
                <div className="text-[0.68vw] text-muted-foreground tracking-wider">
                  TYPE
                </div>
                <div className="text-[0.68vw] font-medium uppercase">
                  {deed.traits[0] || "Land"}
                </div>
              </div>
              <div>
                <div className="text-[0.68vw] text-muted-foreground tracking-wider">
                  STATUS
                </div>
                <div className="text-[0.68vw] font-medium uppercase">
                  {deed.traits.includes("Unvalidated") ? "Pending" : "Validated"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
} 
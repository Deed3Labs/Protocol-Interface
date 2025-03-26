"use client"

import { Card } from "@/components/ui/card";
import { DeedNFT } from "@/types/deed";
import { Coins, Map } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface DeedCardProps {
  deed: DeedNFT;
}

export function DeedCard({ deed }: DeedCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default coordinates for Austin, TX if we can't parse the location
  const defaultCoords = {
    lat: 30.2672,
    lng: -97.7431
  };

  // Since we have an address string instead of coordinates, we'll use default coordinates
  // In a production app, you would want to use a geocoding service here
  const [latitude, longitude] = [defaultCoords.lat, defaultCoords.lng];
  
  const zoom = 15;
  
  // Calculate tile coordinates
  const lat_rad = latitude * Math.PI / 180;
  const n = Math.pow(2, zoom);
  const xtile = Math.floor((longitude + 180) / 360 * n);
  const ytile = Math.floor((1 - Math.log(Math.tan(lat_rad) + 1 / Math.cos(lat_rad)) / Math.PI) / 2 * n);
  
  // Always consider coordinates valid since we're using defaults
  const isValidCoordinates = true;

  // Get first 2 traits
  const displayTraits = deed.traits.slice(0, 2);
  const remainingTraits = deed.traits.length - 2;

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

  return (
    <Card className="group relative overflow-hidden bg-background hover:shadow-xl transition-all duration-300 border border-border/50">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-10" />
        {isValidCoordinates ? (
          <Image
            src={`https://tile.openstreetmap.org/${zoom}/${xtile}/${ytile}.png`}
            alt={`Location ${deed.metadata.location}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            unoptimized // Add this to prevent Next.js image optimization
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <Map className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
        <div className="absolute top-3 left-3 z-20">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            Deed #{deed.id}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Location and Price Row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg truncate" title={deed.metadata.location}>
              {deed.metadata.location}
            </h3>
            <p className="text-sm text-muted-foreground">Protocol Interface</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm font-medium">
              <Coins className="h-4 w-4" />
              <span>{deed.metadata.price}</span>
            </div>
            <p className="text-xs text-muted-foreground">Price</p>
          </div>
        </div>

        {/* Owner */}
        <div className="flex items-center gap-2 mb-4">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-primary/10 text-xs">
              {deed.owner.slice(2, 4)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Owned by</p>
            <p className="text-sm font-medium truncate">
              {deed.owner.slice(0, 6)}...{deed.owner.slice(-4)}
            </p>
          </div>
        </div>

        {/* Traits */}
        <div className="flex flex-wrap gap-2">
          {displayTraits.map((trait, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={cn(
                "bg-primary/5 hover:bg-primary/10 transition-colors",
                index === 0 && "bg-blue-500/5 hover:bg-blue-500/10",
                index === 1 && "bg-purple-500/5 hover:bg-purple-500/10"
              )}
            >
              {trait}
            </Badge>
          ))}
          {remainingTraits > 0 && (
            <Badge variant="outline" className="bg-muted/50">
              +{remainingTraits} more
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
} 
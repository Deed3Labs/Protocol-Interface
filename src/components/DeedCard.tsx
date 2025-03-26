import { Card } from "@/components/ui/card";
import { DeedNFT } from "@/types/deed";
import { Coins, Map } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface DeedCardProps {
  deed: DeedNFT;
}

export function DeedCard({ deed }: DeedCardProps) {
  // Parse location coordinates (assuming format is "longitude,latitude")
  const coordinates = deed.metadata.location.split(',').map(coord => parseFloat(coord.trim()));
  const [longitude, latitude] = coordinates.length === 2 && !coordinates.some(isNaN) 
    ? coordinates 
    : [0, 0]; // Default to [0,0] if invalid coordinates
  
  const zoom = 15;
  const x = Math.floor((longitude + 180) / 360 * Math.pow(2, zoom));
  const y = Math.floor((1 - Math.log(Math.tan(latitude * Math.PI / 180) + 1 / Math.cos(latitude * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
  
  const isValidCoordinates = !isNaN(x) && !isNaN(y) && 
    latitude >= -85 && latitude <= 85 && 
    longitude >= -180 && longitude <= 180;

  // Get first 3 traits
  const displayTraits = deed.traits.slice(0, 3);
  const remainingTraits = deed.traits.length - 3;

  return (
    <Card className="group relative overflow-hidden bg-background hover:shadow-xl transition-all duration-300 border border-border/50">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-10" />
        {isValidCoordinates ? (
          <Image
            src={`https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`}
            alt={`Location ${deed.metadata.location}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
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
                index % 3 === 0 && "bg-blue-500/5 hover:bg-blue-500/10",
                index % 3 === 1 && "bg-purple-500/5 hover:bg-purple-500/10",
                index % 3 === 2 && "bg-green-500/5 hover:bg-green-500/10"
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
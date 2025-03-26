import { Card } from "@/components/ui/card";
import { DeedNFT } from "@/types/deed";
import { Ethereum } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface DeedCardProps {
  deed: DeedNFT;
}

export function DeedCard({ deed }: DeedCardProps) {
  return (
    <Card className="group relative overflow-hidden bg-background hover:shadow-xl transition-all duration-300 border border-border/50">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-10" />
        <Image
          src={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${deed.metadata.location},15,0/400x400@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
          alt={`Location ${deed.metadata.location}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
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
              <Ethereum className="h-4 w-4" />
              <span>{deed.metadata.price}</span>
            </div>
            <p className="text-xs text-muted-foreground">Price</p>
          </div>
        </div>

        {/* Owner */}
        <div className="flex items-center gap-2 mb-4">
          <Avatar className="h-6 w-6 bg-primary/10">
            <span className="text-xs">{deed.owner.slice(2, 4)}</span>
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
          {deed.traits.map((trait, index) => (
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
        </div>
      </div>
    </Card>
  );
} 
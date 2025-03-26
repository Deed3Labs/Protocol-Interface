"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DeedNFT } from "@/types/deed";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { NFTAttribute } from "@/types/deed";

interface DeedCardProps {
  deed: DeedNFT;
  small?: boolean;
}

export function DeedCard({ deed, small = false }: DeedCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Add type for attributes
  const attributes = deed.raw?.metadata?.attributes || deed.metadata.attributes || [];

  // Update attribute mapping
  const attributeMap = attributes.map((attr: NFTAttribute) => ({
    trait_type: attr.trait_type,
    value: attr.value
  }));

  // Use optional chaining for image access
  const imageUrl = deed.image?.cachedUrl || deed.image?.originalUrl || '';

  // Use id.tokenId when available, fallback to tokenId
  const tokenId = deed.id?.tokenId || deed.tokenId || '';

  // Use proper name access with fallbacks
  const name = deed.name || deed.raw?.metadata?.name || deed.title || '';

  // Get the validation status from attributes
  const validationStatus = attributeMap.find(attr => attr.trait_type === "Validation Status")?.value || "Unvalidated";

  // Get the property type from attributes
  const propertyType = attributeMap.find(attr => attr.trait_type === "Asset Type")?.value || "Land";

  // Get location details from attributes
  const state = attributeMap.find(attr => attr.trait_type === "State")?.value;

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
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name || `Deed #${tokenId}`}
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
      <Link href={`/deed/${tokenId}`} className="block">
        {imageSection}
      </Link>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        {deed.image?.cachedUrl ? (
          <Image
            src={deed.image.cachedUrl}
            alt={deed.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{deed.title}</CardTitle>
        <CardDescription>{deed.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm text-gray-500">
            <span className="font-medium">Location:</span> {deed.name}
          </div>
          {deed.metadata?.attributes && (
            <div className="space-y-1">
              <span className="text-sm font-medium text-gray-500">Attributes:</span>
              <div className="flex flex-wrap gap-2">
                {deed.metadata.attributes.map((attr, index) => (
                  <div
                    key={index}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                  >
                    {attr.trait_type}: {attr.value}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 
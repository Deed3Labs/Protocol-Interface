import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeedNFT } from "@/types/deed";

interface DeedCardProps {
  deed: DeedNFT;
}

export function DeedCard({ deed }: DeedCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Deed #{deed.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">Owner:</span>{' '}
            {deed.owner.slice(0, 6)}...{deed.owner.slice(-4)}
          </p>
          <p className="text-sm">
            <span className="font-medium">Location:</span>{' '}
            {deed.metadata.location}
          </p>
          <p className="text-sm">
            <span className="font-medium">Price:</span>{' '}
            {deed.metadata.price} ETH
          </p>
          <div className="mt-4">
            <h3 className="font-medium mb-2">Traits:</h3>
            <ul className="space-y-1">
              {deed.traits.map((trait, index) => (
                <li key={index} className="text-sm">
                  <span className="font-medium">Trait {index + 1}:</span> {trait}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
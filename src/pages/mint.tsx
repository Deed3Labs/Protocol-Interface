import { useAccount } from 'wagmi';
import { useDeedNFT } from '../hooks/useDeedNFT';
import { useState, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MintPage = () => {
  const { isConnected } = useAccount();
  const { mint, mintWithMetadata, isLoading, error } = useDeedNFT();
  const [metadata, setMetadata] = useState('');
  const [useMetadata, setUseMetadata] = useState(false);

  const handleMint = async () => {
    try {
      if (useMetadata && metadata.trim()) {
        await mintWithMetadata(metadata.trim());
      } else {
        await mint();
      }
      setMetadata('');
      setUseMetadata(false);
    } catch (err) {
      console.error('Minting failed:', err);
    }
  };

  const handleMetadataChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMetadata(e.target.value);
  };

  return (
    <main className="container mx-auto py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Mint Your DeedNFT</CardTitle>
          <CardDescription>
            Connect your wallet and click the button below to mint your DeedNFT.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="useMetadata"
              checked={useMetadata}
              onCheckedChange={(checked) => setUseMetadata(checked as boolean)}
            />
            <Label htmlFor="useMetadata">Add metadata to NFT</Label>
          </div>
          {useMetadata && (
            <div className="space-y-2">
              <Label htmlFor="metadata">Metadata (JSON string)</Label>
              <Textarea
                id="metadata"
                value={metadata}
                onChange={handleMetadataChange}
                placeholder='{"name": "My Deed", "description": "A property deed", ...}'
                rows={4}
              />
            </div>
          )}
          {!isConnected ? (
            <Alert>
              <AlertDescription className="text-center">
                Please connect your wallet to mint
              </AlertDescription>
            </Alert>
          ) : (
            <Button
              onClick={handleMint}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Minting...' : 'Mint DeedNFT'}
            </Button>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default MintPage; 
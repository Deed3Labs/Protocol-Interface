import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HomePage = () => {
  return (
    <main className="container mx-auto py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl sm:text-5xl md:text-6xl">
            Welcome to DeedNFT
          </CardTitle>
          <CardDescription className="mt-3 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
            Mint and manage your property deeds as NFTs on the blockchain.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center mt-8">
          <Button asChild size="lg">
            <Link href="/mint">
              Mint DeedNFT
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default HomePage; 
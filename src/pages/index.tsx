import { Button } from "@/components/ui/button"
import { useProtocolSDK } from '../hooks/useProtocolSDK';

export default function Home() {
  const sdk = useProtocolSDK();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to The Deed Protocol Interface
        </h1>
        <Button>Click me</Button>
      </main>
    </div>
  );
}

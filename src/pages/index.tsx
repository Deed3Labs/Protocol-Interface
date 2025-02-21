import * as React from "react"
import { ConnectWallet } from "@/components/ui/connect-wallet"
import { useProtocolSDK } from '../hooks/useProtocolSDK';

export default function Home() {
  const sdk = useProtocolSDK();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Welcome to The Deed Protocol Interface
          </h1>
          <ConnectWallet />
        </div>
      </main>
    </div>
  );
}

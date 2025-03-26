import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from 'next/router';
import ClientOnly from './ClientOnly';
import { ConnectWallet } from "@/components/ui/connect-wallet";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const handleConnect = () => {
    const connector = connectors[0]; // MetaMask connector from config
    if (connector) {
      connect({ connector });
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              DeedNFT
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link 
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  router.pathname === '/' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/mint"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  router.pathname === '/mint'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Mint
              </Link>
            </div>
          </div>
          <ClientOnly>
            <div>
              {isConnected ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    {shortenAddress(address || '')}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => disconnect()}
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleConnect}
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          </ClientOnly>
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
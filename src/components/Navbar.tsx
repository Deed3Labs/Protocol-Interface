import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
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
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {shortenAddress(address || '')}
                </span>
                <Button
                  variant="outline"
                  onClick={() => disconnect()}
                >
                  Disconnect
                </Button>
              </>
            ) : (
              <Button
                onClick={() => connect()}
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">DeedNFT</h1>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          {isConnected ? (
            <div className="flex items-center space-x-4">
              <Card className="px-4 py-2">
                <span className="text-sm text-muted-foreground">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </Card>
              <Button
                variant="destructive"
                onClick={() => disconnect()}
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => connect()}
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
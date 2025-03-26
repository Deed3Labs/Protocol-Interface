import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">DeedNFT</span>
          </div>
          <div className="flex items-center">
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <button
                  onClick={() => disconnect()}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => connect()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
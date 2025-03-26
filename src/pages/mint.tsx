import { useAccount } from 'wagmi';
import { useDeedNFT } from '../hooks/useDeedNFT';
import Navbar from '../components/Navbar';

const MintPage = () => {
  const { isConnected } = useAccount();
  const { mint, isLoading, error } = useDeedNFT();

  const handleMint = async () => {
    try {
      await mint();
    } catch (err) {
      console.error('Minting failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Mint Your DeedNFT
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  Connect your wallet and click the button below to mint your DeedNFT.
                </p>
              </div>
              <div className="mt-5">
                {!isConnected ? (
                  <div className="text-center py-4">
                    <p className="text-red-500">Please connect your wallet to mint</p>
                  </div>
                ) : (
                  <button
                    onClick={handleMint}
                    disabled={isLoading}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    }`}
                  >
                    {isLoading ? 'Minting...' : 'Mint DeedNFT'}
                  </button>
                )}
                {error && (
                  <div className="mt-4 text-sm text-red-600">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MintPage; 
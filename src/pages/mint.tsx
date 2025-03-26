import { useAccount } from 'wagmi';
import { useDeedNFT } from '../hooks/useDeedNFT';
import { useState } from 'react';

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

  return (
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
            <div className="mt-5 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="useMetadata"
                  checked={useMetadata}
                  onChange={(e) => setUseMetadata(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="useMetadata" className="ml-2 block text-sm text-gray-900">
                  Add metadata to NFT
                </label>
              </div>
              {useMetadata && (
                <div>
                  <label htmlFor="metadata" className="block text-sm font-medium text-gray-700">
                    Metadata (JSON string)
                  </label>
                  <textarea
                    id="metadata"
                    rows={4}
                    value={metadata}
                    onChange={(e) => setMetadata(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder='{"name": "My Deed", "description": "A property deed", ...}'
                  />
                </div>
              )}
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
  );
};

export default MintPage; 
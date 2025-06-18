import { useEffect, useState } from 'react';
import { createPublicClient, http, type PublicClient } from 'viem';
import { mainnet } from 'viem/chains';
import type { ProtocolSDK } from '@deed3labs/protocolsdk';

export interface UseProtocolSDKConfig {
  rpcUrl?: string;
  chainId?: number;
  contracts?: {
    deedNFT?: `0x${string}`;
    subdivide?: `0x${string}`;
    fractionalize?: `0x${string}`;
    validatorRegistry?: `0x${string}`;
    fundManager?: `0x${string}`;
  };
}

export function useProtocolSDK(config: UseProtocolSDKConfig = {}) {
  const [sdk, setSDK] = useState<ProtocolSDK | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initSDK = async () => {
      try {
        setIsLoading(true);
        const publicClient = createPublicClient({
          chain: mainnet,
          transport: http(config.rpcUrl)
        }) as unknown as PublicClient;

        // Dynamically import the SDK
        const { createProtocolSDK } = await import('@deed3labs/protocolsdk');
        
        const sdkInstance = await createProtocolSDK({
          publicClient,
          network: {
            name: 'Ethereum Mainnet',
            chainId: config.chainId || mainnet.id,
            rpcUrl: config.rpcUrl || mainnet.rpcUrls.default.http[0],
            contracts: {
              deedNFT: config.contracts?.deedNFT || '0x0000000000000000000000000000000000000000',
              subdivide: config.contracts?.subdivide || '0x0000000000000000000000000000000000000000',
              fractionalize: config.contracts?.fractionalize || '0x0000000000000000000000000000000000000000',
              validatorRegistry: config.contracts?.validatorRegistry || '0x0000000000000000000000000000000000000000',
              fundManager: config.contracts?.fundManager || '0x0000000000000000000000000000000000000000'
            }
          }
        });

        setSDK(sdkInstance);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize SDK'));
      } finally {
        setIsLoading(false);
      }
    };

    initSDK();

    return () => {
      if (sdk) {
        sdk.destroy();
      }
    };
  }, [config.rpcUrl, config.chainId, config.contracts]);

  return { sdk, error, isLoading };
} 
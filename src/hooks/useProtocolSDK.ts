import { useEffect, useState } from 'react';
import { ProtocolSDK } from '@deed3labs/protocolsdk';

export function useProtocolSDK() {
  const [sdk, setSDK] = useState<ProtocolSDK | null>(null);

  useEffect(() => {
    const initSDK = async () => {
      try {
        const protocolSDK = new ProtocolSDK({
          network: process.env.NEXT_PUBLIC_NETWORK || 'mainnet',
          rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
        });
        
        await protocolSDK.initialize();
        setSDK(protocolSDK);
      } catch (error) {
        console.error('Failed to initialize SDK:', error);
      }
    };

    initSDK();
  }, []);

  return sdk;
} 
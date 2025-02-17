declare module '@deed3labs/protocolsdk' {
  export class ProtocolSDK {
    constructor(config: {
      network: string;
      rpcUrl?: string;
    });

    initialize(): Promise<void>;
    // Add other methods and types as needed
  }
} 
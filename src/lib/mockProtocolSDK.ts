export class ProtocolSDK {
  network: string;
  rpcUrl?: string;

  constructor(config: { network: string; rpcUrl?: string }) {
    this.network = config.network;
    this.rpcUrl = config.rpcUrl;
    console.log('Mock SDK initialized with:', config);
  }

  async initialize(): Promise<void> {
    console.log('Mock SDK initialize called');
  }
} 
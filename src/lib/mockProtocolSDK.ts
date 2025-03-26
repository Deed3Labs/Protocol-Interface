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

  // Property Management
  async createProperty(propertyData: any): Promise<string> {
    console.log('Creating property:', propertyData);
    return 'mock-property-id';
  }

  async getProperty(propertyId: string): Promise<any> {
    console.log('Getting property:', propertyId);
    return { id: propertyId, status: 'mock' };
  }

  // Validation
  async validateProperty(propertyId: string): Promise<boolean> {
    console.log('Validating property:', propertyId);
    return true;
  }

  // Transaction Management
  async getTransactionStatus(txHash: string): Promise<string> {
    console.log('Getting transaction status:', txHash);
    return 'confirmed';
  }

  // Event Listeners
  onPropertyCreated(callback: (propertyId: string) => void): void {
    console.log('Property created listener registered');
  }

  onValidationComplete(callback: (propertyId: string, status: boolean) => void): void {
    console.log('Validation complete listener registered');
  }
} 
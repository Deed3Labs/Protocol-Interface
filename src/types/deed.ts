export interface DeedNFT {
  uniqueId?: string; // Optional unique identifier for React keys
  contract: {
    address: string;
    name: string;
    symbol: string;
    tokenType: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    openSeaMetadata: Record<string, any>;
    spamClassifications: any[];
  };
  tokenId: string;
  tokenType: string;
  name?: string;
  description?: string;
  tokenUri: string;
  image?: {
    cachedUrl: string;
    originalUrl: string;
  };
  raw: {
    tokenUri: string;
    metadata: {
      image?: string;
      external_url?: string;
      background_color?: string;
      name?: string;
      description?: string;
      attributes?: Array<{
        value: string;
        trait_type: string;
      }>;
    };
    error?: string;
  };
  mint: Record<string, any>;
  timeLastUpdated: string;
  metadata?: {
    location: string;
    price: string;
  };
} 
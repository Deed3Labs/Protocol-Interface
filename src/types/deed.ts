export interface NFTAttribute {
  value: string;
  trait_type: string;
}

export interface DeedNFT {
  contract: {
    address: string;
    contractDeployer: string;
  };
  id: {
    tokenId: string;
    tokenMetadata: {
      tokenType: string;
    };
  };
  title: string;
  description: string;
  tokenUri: {
    gateway: string;
    raw: string;
  };
  media: Array<{
    gateway: string;
    raw: string;
  }>;
  metadata: {
    metadata: any[];
    attributes: NFTAttribute[];
  };
  timeLastUpdated: string;
  error?: string;
  uniqueId?: string;
  name: string;
  image: {
    cachedUrl?: string;
    originalUrl?: string;
  };
  raw?: {
    tokenUri: string;
    metadata: {
      name: string;
      description: string;
      image: string;
      attributes: NFTAttribute[];
    };
  };
  tokenId: string; // For backward compatibility
} 
export interface DeedNFT {
  id: number;
  owner: string;
  metadata: {
    location: string;
    price: string;
  };
  traits: Record<string, string>;
} 
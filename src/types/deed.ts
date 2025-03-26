export interface DeedNFT {
  id: string;
  owner: string;
  metadata: {
    location: string;
    price: string;
  };
  traits: string[];
} 
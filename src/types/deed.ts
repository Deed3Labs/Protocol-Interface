export interface DeedNFT {
  id: string;
  owner: string;
  description: string;
  traits: string[];
  location: string;
  price: string;
  metadata: {
    location: string;
    price: string;
  };
} 
import { ethers } from 'ethers';

export const DEED_NFT_ADDRESS = process.env.NEXT_PUBLIC_DEED_NFT_ADDRESS || '';

export const DEED_NFT_ABI = [
  'function mint(address to) public returns (uint256)',
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function balanceOf(address owner) public view returns (uint256)',
  'function tokenURI(uint256 tokenId) public view returns (string)',
];

export class DeedNFT {
  private contract: ethers.Contract;

  constructor(provider: ethers.providers.Web3Provider) {
    this.contract = new ethers.Contract(
      DEED_NFT_ADDRESS,
      DEED_NFT_ABI,
      provider.getSigner()
    );
  }

  async mint(to: string): Promise<ethers.ContractTransaction> {
    return this.contract.mint(to);
  }

  async ownerOf(tokenId: number): Promise<string> {
    return this.contract.ownerOf(tokenId);
  }

  async balanceOf(owner: string): Promise<number> {
    return this.contract.balanceOf(owner);
  }

  async tokenURI(tokenId: number): Promise<string> {
    return this.contract.tokenURI(tokenId);
  }
} 
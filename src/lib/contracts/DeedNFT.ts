import { ethers } from 'ethers';

export const DEED_NFT_ADDRESS = process.env.NEXT_PUBLIC_DEED_NFT_ADDRESS || '';

export const DEED_NFT_ABI = [
  // Core ERC721 functions
  'function mint(address to) public returns (uint256)',
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function balanceOf(address owner) public view returns (uint256)',
  'function tokenURI(uint256 tokenId) public view returns (string)',
  'function transferFrom(address from, address to, uint256 tokenId) public',
  'function approve(address to, uint256 tokenId) public',
  'function getApproved(uint256 tokenId) public view returns (address)',
  'function setApprovalForAll(address operator, bool approved) public',
  'function isApprovedForAll(address owner, address operator) public view returns (bool)',
  
  // DeedNFT specific functions
  'function mintWithMetadata(address to, string memory metadata) public returns (uint256)',
  'function updateMetadata(uint256 tokenId, string memory metadata) public',
  'function getMetadata(uint256 tokenId) public view returns (string memory)',
  'function validateDeed(uint256 tokenId) public view returns (bool)',
  'function getValidator(uint256 tokenId) public view returns (address)',
  'function setValidator(address validator) public',
  'function pause() public',
  'function unpause() public',
  'function paused() public view returns (bool)',
];

export class DeedNFT {
  private contract: ethers.Contract;

  constructor(provider: ethers.BrowserProvider) {
    this.contract = new ethers.Contract(
      DEED_NFT_ADDRESS,
      DEED_NFT_ABI,
      provider
    );
  }

  async mint(to: string): Promise<ethers.ContractTransactionResponse> {
    return this.contract.mint(to);
  }

  async mintWithMetadata(to: string, metadata: string): Promise<ethers.ContractTransactionResponse> {
    return this.contract.mintWithMetadata(to, metadata);
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

  async getMetadata(tokenId: number): Promise<string> {
    return this.contract.getMetadata(tokenId);
  }

  async validateDeed(tokenId: number): Promise<boolean> {
    return this.contract.validateDeed(tokenId);
  }

  async getValidator(tokenId: number): Promise<string> {
    return this.contract.getValidator(tokenId);
  }

  async setValidator(validator: string): Promise<ethers.ContractTransactionResponse> {
    return this.contract.setValidator(validator);
  }
} 
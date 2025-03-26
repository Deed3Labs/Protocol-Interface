import { useContractRead, useContractWrite, usePublicClient } from 'wagmi';
import { parseEther } from 'viem';
import { Alchemy, Network } from 'alchemy-sdk';
import { DeedNFT } from '@/types/deed';

// Define interfaces for Alchemy response types
interface AlchemyNftAttribute {
  value: string;
  trait_type: string;
}

interface AlchemyNftRawMetadata {
  name: string;
  description: string;
  image: string;
  attributes: AlchemyNftAttribute[];
  // Add other metadata fields as needed
}

interface AlchemyNft {
  contract: {
    address: string;
    name: string;
    symbol: string;
  };
  tokenId: string;
  tokenType: string;
  name: string;
  description: string;
  tokenUri: string;
  image: {
    cachedUrl?: string;
    originalUrl?: string;
  };
  raw: {
    tokenUri: string;
    metadata: AlchemyNftRawMetadata;
  };
}

interface AlchemyNftsResponse {
  nfts: AlchemyNft[];
  pageKey?: string;
}

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DEEDNFT_CONTRACT_ADDRESS as `0x${string}`;
const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

console.log('Contract Address:', CONTRACT_ADDRESS);
console.log('Alchemy API Key:', ALCHEMY_API_KEY ? 'Present' : 'Missing');

// Initialize Alchemy client
const alchemy = new Alchemy({
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
});

const MINT_ABI = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'location', type: 'string' },
      { name: 'price', type: 'uint256' },
    ],
    outputs: [],
  },
] as const;

const MINT_WITH_METADATA_ABI = [
  {
    name: 'mintWithMetadata',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'location', type: 'string' },
      { name: 'price', type: 'uint256' },
      { name: 'traits', type: 'string[]' },
    ],
    outputs: [],
  },
] as const;

// Add retry utility function
const retry = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise(resolve => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay * 1.5);
  }
};

export function useDeedNFT() {
  const publicClient = usePublicClient();

  const { data: totalSupply } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: [
      {
        name: 'totalSupply',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'uint256' }],
      },
    ],
    functionName: 'totalSupply',
  });

  const { write: mint } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: MINT_ABI,
    functionName: 'mint',
  });

  const { write: mintWithMetadata } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: MINT_WITH_METADATA_ABI,
    functionName: 'mintWithMetadata',
  });

  const getAllDeeds = async () => {
    try {
      if (!CONTRACT_ADDRESS) {
        throw new Error('Contract address is not defined');
      }

      const nfts = await alchemy.nft.getNftsForContract(CONTRACT_ADDRESS, {
        omitMetadata: false,
        pageSize: 100,
        tokenUriTimeoutInMs: 10000,
      }) as unknown as AlchemyNftsResponse;
      
      console.log('Alchemy Response:', JSON.stringify(nfts, null, 2));

      // If we only got contract info or no NFTs, try getting NFTs using contract calls
      if (!nfts.nfts || nfts.nfts.length === 0) {
        const supply = await retry(() => publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: [{
            name: 'totalSupply',
            type: 'function',
            stateMutability: 'view',
            inputs: [],
            outputs: [{ type: 'uint256' }],
          }],
          functionName: 'totalSupply',
        }));

        if (!supply) return [];

        // Process NFTs in smaller batches to avoid timeouts
        const tokenIds = Array.from({ length: Number(supply) }, (_, i) => i);
        const batchSize = 5;
        const deeds: DeedNFT[] = [];

        for (let i = 0; i < tokenIds.length; i += batchSize) {
          const batch = tokenIds.slice(i, i + batchSize);
          const batchDeeds = await Promise.all(
            batch.map(async (tokenId) => {
              try {
                // Get owner with retry
                const owner = await retry(() => publicClient.readContract({
                  address: CONTRACT_ADDRESS,
                  abi: [{
                    name: 'ownerOf',
                    type: 'function',
                    stateMutability: 'view',
                    inputs: [{ type: 'uint256', name: 'tokenId' }],
                    outputs: [{ type: 'address' }],
                  }],
                  functionName: 'ownerOf',
                  args: [BigInt(tokenId)],
                }));

                // Get metadata with retry
                const metadata = await retry(() => publicClient.readContract({
                  address: CONTRACT_ADDRESS,
                  abi: [{
                    name: 'getDeedMetadata',
                    type: 'function',
                    stateMutability: 'view',
                    inputs: [{ type: 'uint256', name: 'tokenId' }],
                    outputs: [{ type: 'string' }],
                  }],
                  functionName: 'getDeedMetadata',
                  args: [BigInt(tokenId)],
                }));

                // Parse metadata
                const parsedMetadata = metadata ? JSON.parse(metadata as string) : {};
                
                const deed: DeedNFT = {
                  id: tokenId.toString(),
                  owner: owner as string,
                  description: parsedMetadata.description || '',
                  traits: parsedMetadata.attributes?.map((attr: AlchemyNftAttribute) => attr.value) || [],
                  location: parsedMetadata.name || '',
                  price: parsedMetadata.price || '0',
                  metadata: {
                    location: parsedMetadata.name || '',
                    price: parsedMetadata.price || '0',
                  }
                };
                return deed;
              } catch (error) {
                console.error(`Error fetching deed ${tokenId}:`, error);
                return null;
              }
            })
          );

          deeds.push(...batchDeeds.filter((deed): deed is DeedNFT => deed !== null));
          
          // Add a small delay between batches
          if (i + batchSize < tokenIds.length) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }

        return deeds;
      }

      // If Alchemy returned NFTs, process them in batches
      const batchSize = 5;
      const deeds: DeedNFT[] = [];

      for (let i = 0; i < nfts.nfts.length; i += batchSize) {
        const batch = nfts.nfts.slice(i, i + batchSize);
        const batchDeeds = await Promise.all(
          batch.map(async (nft) => {
            try {
              // Extract traits from raw metadata if available
              const traits = nft.raw?.metadata?.attributes?.map(attr => attr.value) || [];
              
              // Use the name field as location since that's where the address is stored
              const location = nft.name || nft.raw?.metadata?.name || '';
              
              // For now, we'll set a default price since it's not in the metadata
              const price = '0';

              // Get the owner with retry
              const owner = await retry(() => publicClient.readContract({
                address: CONTRACT_ADDRESS,
                abi: [{
                  name: 'ownerOf',
                  type: 'function',
                  stateMutability: 'view',
                  inputs: [{ type: 'uint256', name: 'tokenId' }],
                  outputs: [{ type: 'address' }],
                }],
                functionName: 'ownerOf',
                args: [BigInt(nft.tokenId)],
              }));

              const deed: DeedNFT = {
                id: nft.tokenId,
                owner: owner as string,
                description: nft.description || nft.raw?.metadata?.description || '',
                traits,
                location,
                price,
                metadata: {
                  location,
                  price,
                }
              };

              return deed;
            } catch (error) {
              console.error(`Error processing NFT ${nft.tokenId}:`, error);
              return null;
            }
          })
        );

        deeds.push(...batchDeeds.filter((deed): deed is DeedNFT => deed !== null));
        
        // Add a small delay between batches
        if (i + batchSize < nfts.nfts.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      return deeds;
    } catch (error) {
      console.error('Error fetching all deeds:', error);
      return [];
    }
  };

  const getDeed = async (tokenId: string) => {
    try {
      const nft = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, tokenId) as unknown as AlchemyNft;
      return nft.description || nft.raw?.metadata?.description || '';
    } catch (error) {
      console.error('Error fetching deed:', error);
      throw error;
    }
  };

  const getDeedTraits = async (tokenId: string) => {
    try {
      const nft = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, tokenId) as unknown as AlchemyNft;
      return nft.raw?.metadata?.attributes?.map(attr => attr.value) || [];
    } catch (error) {
      console.error('Error fetching deed traits:', error);
      throw error;
    }
  };

  const getDeedMetadata = async (tokenId: string) => {
    try {
      const nft = await alchemy.nft.getNftMetadata(CONTRACT_ADDRESS, tokenId) as unknown as AlchemyNft;
      // Use the name field as location since that's where the address is stored
      const location = nft.name || nft.raw?.metadata?.name || '';
      // For now, we'll set a default price since it's not in the metadata
      const price = '0';
      return {
        location,
        price,
      };
    } catch (error) {
      console.error('Error fetching deed metadata:', error);
      throw error;
    }
  };

  const getDeedOwner = async (tokenId: string) => {
    try {
      // We need to use the contract directly since Alchemy doesn't provide owner info
      const owner = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: [{
          name: 'ownerOf',
          type: 'function',
          stateMutability: 'view',
          inputs: [{ type: 'uint256', name: 'tokenId' }],
          outputs: [{ type: 'address' }],
        }],
        functionName: 'ownerOf',
        args: [BigInt(tokenId)],
      });
      return owner as string;
    } catch (error) {
      console.error('Error fetching deed owner:', error);
      throw error;
    }
  };

  const getDeedBalance = async () => {
    try {
      // Use contract call instead of Alchemy since we need the total supply
      const supply = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: [{
          name: 'totalSupply',
          type: 'function',
          stateMutability: 'view',
          inputs: [],
          outputs: [{ type: 'uint256' }],
        }],
        functionName: 'totalSupply',
      });
      return BigInt(supply || 0);
    } catch (error) {
      console.error('Error fetching deed balance:', error);
      throw error;
    }
  };

  return {
    totalSupply,
    mint: (location: string, price: string) => mint({
      args: [location, parseEther(price)],
    }),
    mintWithMetadata: (location: string, price: string, traits: string[]) => mintWithMetadata({
      args: [location, parseEther(price), traits],
    }),
    getAllDeeds,
    getDeed,
    getDeedTraits,
    getDeedMetadata,
    getDeedOwner,
    getDeedBalance,
  };
} 
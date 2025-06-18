import { formatEther, formatUnits } from 'viem';

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatBalance(balance: bigint, decimals: number = 18): string {
  if (!balance) return '0';
  return formatUnits(balance, decimals);
}

export function formatEthBalance(balance: bigint): string {
  if (!balance) return '0';
  return formatEther(balance);
} 
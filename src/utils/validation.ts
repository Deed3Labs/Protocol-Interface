import { isAddress } from 'viem';

export function isValidAddress(address: string): boolean {
  return isAddress(address);
}

export function isValidAmount(amount: string): boolean {
  if (!amount) return false;
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
}

export function isValidPercentage(percentage: string): boolean {
  if (!percentage) return false;
  const num = parseFloat(percentage);
  return !isNaN(num) && num >= 0 && num <= 100;
} 
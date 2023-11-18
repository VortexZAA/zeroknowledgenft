import { ethers } from 'ethers';
import { useEffect } from 'react';

export default function Ethers() {
  let provider: any;
  let ethereum: any;
  if (typeof window !== 'undefined') {
    ethereum = (window as any).ethereum;
    provider = new ethers.BrowserProvider(ethereum);
  }
  return { provider, ethereum, ethers };
}

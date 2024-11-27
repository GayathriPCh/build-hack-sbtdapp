'use client';
import React, { useState } from 'react';
import './ConnectWallet.module.css'; // Make sure to include the CSS file.

declare global {
  interface Window {
    ethereum: {
      request: (args: { method: string }) => Promise<string[]>;
    };
  }
}

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
    } else {
      alert('Please install MetaMask to connect your wallet.');
    }
  };

  return (
    <div>
      <button
        onClick={connectWallet}
        className="wallet-button"
      >
        {walletAddress ? 
          `${walletAddress.substring(0, 6)}...${walletAddress.slice(-4)}` : 
          'Connect Wallet'
        }
      </button>
    </div>
  );
};

export default ConnectWallet;

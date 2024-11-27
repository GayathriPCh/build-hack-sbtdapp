'use client'

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const FIXED_WALLET = "ded665bca7d412891f44a571d908b66184b0ee10";
const API_KEY = "3aa171233676e8294e934cadb352a5643aab3b945cbfb1328b7770f5adef254071b400d108780a6f8897a577038192c13ffa78d81cf46e442eec758d51c66134bb6003";

const OnChainCertification = () => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ status: '', message: '' });
  const [error, setError] = useState<string | null>(null);

  const isValidWalletAddress = (address: string) => {
    // This regex checks for a valid Ethereum-like address
    const walletRegex = /^0x[a-fA-F0-9]{40}$/;
    return walletRegex.test(address);
  };

  const handleMint = async () => {
    if (!recipientAddress) {
      setError('Please enter recipient address');
      return;
    }
    if (!isValidWalletAddress(recipientAddress)) {
      setError(
        'Please enter a valid wallet address starting with "0x" followed by 40 hexadecimal characters.'
      );
      return;
    }
  
    setLoading(true);
    setError(null);
    setResult({ status: '', message: '' });
  
    const payload = {
      network: 'TESTNET',
      blockchain: 'KALP',
      walletAddress: FIXED_WALLET,
      args: { address: recipientAddress },
    };
  
    try {
      const response = await fetch(
        'https://gateway-api.kalp.studio/v1/contract/kalp/invoke/vHYQcRijQGB3UpVhqc3UeBM2D3ztjPuS1732534432325/MintSBT',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
  
        // Check for "already minted" condition
        if (errorData?.message?.includes('already minted')) {
          setResult({
            status: 'error',
            message:
              'You can only mint one soulbound token per address. Please use a different address.',
          });
          return;
        }
  
        // Handle other API errors
        throw new Error(
          errorData?.message || `Failed to mint certification. Please try again.`
        );
      }
  
      // Success: Update the result state
      await response.json();
      setResult({
        status: 'success',
        message:
          'Certification SBT minted successfully! Your achievement is now permanently recorded on the blockchain.',
      });
      setRecipientAddress('');
    } catch (error) {
      console.error('Mint error:', error);
  
      // Generic error message for the UI
      setResult({
        status: 'error',
        message: `
           Error.
          • Make sure you havent entered a wallet address that has already minted a token.
          • Soulbound Tokens (SBTs) are unique and non-transferable. You can only mint one token per address.
        `.trim(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="certification-container">
      <h2 className="title">Claim your OnChain Certification 🏆 !!</h2>
      
      <form onSubmit={(e) => { e.preventDefault(); handleMint(); }} className="form">
        <div>
          <label htmlFor="recipientAddress" className="label">
            Your Recipient Address, ser 👇
          </label>
          <input
            type="text"
            id="recipientAddress"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="input"
            required
            disabled={loading}
            placeholder="Enter recipient address"
          />
        </div>
        <button
          type="submit"
          className="button"
          disabled={loading}
        >
          {loading ? "Minting..." : "Mint Certification"}
        </button>
      </form>

      {loading && <div className="loader"></div>}
      {error && (
  <div className="error">
    {error}
  </div>
)}
      {result.status && (
        <div className={`result ${result.status}`}>
          <div className="result-icon">
            {result.status === 'error' ? <AlertCircle /> : <CheckCircle2 />}
          </div>
          <p>{result.message}</p>
        </div>
      )}

      <style jsx>{`
        .certification-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px;
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #1a1a1a, #0f0f0f);
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          color: #fff;
        }
        .title {
          text-align: center;
          font-size: 4rem;
          font-family: 'Audiowide', sans-serif;
          margin-bottom: 20px;
          background: linear-gradient(45deg, #000000, #63f2ad, #258054);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          font-family: 'Sp', sans-serif;
          font-size: 2rem;
          color: #258054;
        }
        .input {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 30px;
          background-color: #333;
          color: #fff;
          font-size: 16px;
          font-family: 'Sp', sans-serif;
        }
        .input:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
          .button {
    background: linear-gradient(45deg, #003d35, #006d5b, #00a086);
    color: white;
    padding: 12px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 23px;
    font-family: 'Gameplay', sans-serif;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .button::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0)
    );
    transform: rotate(45deg);
    animation: shine 3s infinite;
  }
  .button:hover {
    background: linear-gradient(45deg, #004d45, #008d7b, #00c0a6);
    box-shadow: 0 0 15px #00ff00;
  }
        .error {
                  font-family: 'Sp', sans-serif;
    color: #ff4444;
    background-color: #ffdddd;
    padding: 10px;
    font-size: 1.5rem;
    border-radius: 5px;
    margin-top: 10px;
    white-space: pre-line; /* This will handle newlines in the text */
  }
        .result {
          margin-top: 20px;
          padding: 15px;
          border-radius: 10px;
          background-color: rgba(255, 255, 255, 0.1);
        }
        .result.error {
          color: #ff4444;
          background-color: #ffdddd;
        }
        .result.success {
        font-family: 'Sp', sans-serif;
        font-size: 2rem;
          color: #00ff00;
          background-color: #ddffdd;
        }
        .result-icon {
          display: inline-block;
          margin-right: 10px;
        }
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #00ff00;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 20px auto;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
           @keyframes shine {
    0% {
      left: -50%;
      top: -50%;
    }
    100% {
      left: 150%;
      top: 150%;
    }
  }
      `}</style>
    </div>
  );
};

export default OnChainCertification;

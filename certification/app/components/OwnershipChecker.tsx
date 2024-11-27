"use client";
import React, { useState } from 'react';

// API constants
const API_BASE_URL = 'https://gateway-api.kalp.studio/v1/contract/kalp';
const CONTRACT_ID = 'vHYQcRijQGB3UpVhqc3UeBM2D3ztjPuS1732534432325';
const API_KEY = '3aa171233676e8294e934cadb352a5643aab3b945cbfb1328b7770f5adef254071b400d108780a6f8897a577038192c13ffa78d81cf46e442eec758d51c66134bb6003';  // Add your actual API key
const WALLET_ADDRESS = 'ded665bca7d412891f44a571d908b66184b0ee10'; // The contract deployer's wallet address

interface OwnershipResult {
  owner: string;
  tokenID: string;
  metadata: string;
}

const OwnershipChecker = () => {
  const [owner, setOwner] = useState(''); // The user input for the wallet address to check ownership
  const [result, setResult] = useState<OwnershipResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckOwnership = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Making the POST request to fetch SBT details
      const response = await fetch(`${API_BASE_URL}/query/${CONTRACT_ID}/GetSBTByOwner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          network: 'TESTNET',
          blockchain: 'KALP',
          walletAddress: WALLET_ADDRESS, // Using WALLET_ADDRESS for the contract deployer's address
          args: { owner }, // The owner's address to check the token
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.result) {
        setResult(data.result.result); // Storing the nested result in state
      } else {
        setError('No SBT found for this owner');
      }
    } catch {
      setError('Error checking ownership. Make sure the address youve entered is correct.');
    } finally {
      setLoading(false);
    }
  };

  const parseMetadata = (metadata: string) => {
    try {
      return JSON.parse(metadata); // Parse the metadata string into a JSON object
    } catch {
      return null; // Return null if JSON parsing fails
    }
  };

  return (
    <div className="certificate-query-container">
          {/* Instruction Section */}
    <header className="header">
      <h2 className="title">Certificate Ownership Checker</h2>
      <p className="subtitle">
        Enter a wallet address to check for certificate ownership. This tool fetches and displays SBT details associated with the given wallet.
      </p>
    </header>

      <form onSubmit={handleCheckOwnership} className="form">
        <div>
          <label htmlFor="owner" className="label">
            Wallet Address
          </label>
          <input
            type="text"
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="input"
            required
          />
        </div>
        <button
          type="submit"
          className="button"
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check Ownership'}
        </button>
      </form>

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="certificate-details">
          <h3 className="text-lg font-semibold mb-2">Ownership Details:</h3>
          <p><strong>Owner:</strong> {result.owner}</p>
          <p><strong>Token ID:</strong> {result.tokenID}</p>
          <p><strong>Metadata:</strong> {parseMetadata(result.metadata)?.description || 'No description available'}</p>
        </div>
      )}

      {loading && <div className="loader"></div>}
      <div className="additional-content">
      <h3>Why Verify Your Certificate?</h3>
      <p>
        Soulbound Tokens (SBTs) are an innovative way to represent achievements, certifications, or memberships 
        on the blockchain. Ensuring the authenticity and ownership of your SBT is crucial for maintaining the 
        integrity of your digital credentials.
      </p>
      <h3>Common Use Cases</h3>
      <ul>
        <li>Proof of professional certifications</li>
        <li>Verification of academic credentials</li>
        <li>Membership validation for exclusive communities</li>
        <li>Preserving achievements in decentralized ecosystems</li>
      </ul>
     
          For further assistance, contact our support team at{" "}
          <a href="mailto:support@kalp.studio" className="support-email">
            support@kalp.studio
          </a>
          .
       
    </div>
      <style jsx>{`
        .certificate-query-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px;
          
          background: linear-gradient(135deg, #1a1a1a, #0f0f0f);
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          color: #fff;
        }
        .title {
        font-family: 'Audiowide', sans-serif;
          text-align: center;
          font-size: 3rem;
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
        font-family: 'Sp', sans-serif;
        font-size: 2rem;
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
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
          font-size: 16px;
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
        .error { 
          
          color:#ff4444; 
          background-color:#ffdddd; 
          padding :10px; 
          border-radius :5px; 
          margin-top :10px; 
          font-size: 1.5rem;
          font-family: 'Sp', sans-serif;
        } 
        .certificate-details { 
        font-family: 'Sp', sans-serif;
        font-size: 2rem;
          margin-top :20px; 
          padding :15px; 
          border-radius :10px; 
          background-color :rgba(255,255,255,0.1); 
        } 
        .loader { 
          border :4px solid #f3f3f3; 
          border-top :4px solid #00ff00; 
          border-radius :50%; 
          width :40px; 
          height :40px; 
          animation :spin 1s linear infinite; 
          margin :20px auto; 
        } 
        @keyframes spin { 
          0% { transform :rotate(0deg); } 
          100% { transform :rotate(360deg); } 
        }
           .additional-content {
        margin-top: 30px;
        padding: 20px;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.1);
        font-size: 1rem;
        line-height: 1.5;
        color: #fff;
        font-family: 'Sp', sans-serif;
      }
      .additional-content h3 {
        margin-bottom: 10px;
        font-size: 1.5rem;
        color: #63f2ad;
        font-family: 'Audiowide', sans-serif;
      }
      .additional-content ul {
        list-style: disc;
        padding-left: 20px;
        margin-top: 10px;
        font-family: 'Sp', sans-serif;
      }
      .additional-content p {
        font-size: 1rem;
        font-family: 'Sp', sans-serif;
      }
      .additional-content li {
        margin-bottom: 5px;
        font-family: 'Sp', sans-serif;
      }
        
      .support-email {
        color: #63f2ad;
        text-decoration: underline;
        cursor: pointer;
        font-family: 'Sp', sans-serif;
      }
      .support-email:hover {
        text-decoration: none;
        color: #00ff00;
      }
        .subtitle{
          font-family: 'Sp', sans-serif;
          font-size: 1.5rem;}
      `}</style>
    </div>
  );
};

export default OwnershipChecker;

'use client';

import React, { useState } from 'react';
// API constants
const API_BASE_URL = 'https://gateway-api.kalp.studio/v1/contract/kalp';
const CONTRACT_ID = 'vHYQcRijQGB3UpVhqc3UeBM2D3ztjPuS1732534432325';
const API_KEY = '3aa171233676e8294e934cadb352a5643aab3b945cbfb1328b7770f5adef254071b400d108780a6f8897a577038192c13ffa78d81cf46e442eec758d51c66134bb6003';  // Add your actual API key
const WALLET_ADDRESS = 'ded665bca7d412891f44a571d908b66184b0ee10'; // The contract deployer's wallet address

interface CertificateDetails {
  owner: string;
  tokenID: string;
  metadata: string;
}

const CertificateQuery = () => {
  const [owner, setOwner] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [result, setResult] = useState<CertificateDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setResult(null);

    try {
      if (!owner || !tokenId) {
        throw new Error('Please enter both the Owner Address and Token ID.');
      }

      const response = await fetch(`${API_BASE_URL}/query/${CONTRACT_ID}/QuerySBT`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          network: 'TESTNET',
          blockchain: 'KALP',
          walletAddress: WALLET_ADDRESS,
          args: { owner, tokenID: tokenId },
        }),
      });

      if (!response.ok) {
        throw new Error(`
           Unable to connect to the server.
          • Please check whether the token id and the wallet address entered are valid and Retry.
          • If the issue persists, please contact the support.
        `.trim());
      }

      const data = await response.json();

      if (data.result?.result) {
        setResult(data.result.result);
        setSuccess(true);
      } else {
        setError('No certificate found for the provided Owner Address and Token ID. Please double-check your entries and try again.');
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : "An unexpected error occurred. Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  const parseMetadata = (metadata: string) => {
    try {
      return JSON.parse(metadata);
    } catch {
      return null;
    }
  };

  return (
    <div className="certificate-query-container">
      <h2 className="title">Is the SBT really yours? Check it out here: </h2>
      <form onSubmit={handleQuery} className="form">
        <div>
          <label htmlFor="owner" className="label">
            Owner Address
          </label>
          <input
            type="text"
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="input"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="tokenId" className="label">
            Token ID
          </label>
          <input
            type="text"
            id="tokenId"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            className="input"
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="button"
          disabled={loading}
        >
          {loading ? "Querying..." : "Query Certificate"}
        </button>
      </form>

      {loading && <div className="loader"></div>}
      {error && (
  <div className="error">
    {error.split('\n').map((line, index) => (
      <p key={index}>{line.trim()}</p>
    ))}
  </div>
)}      {success && <p className="success">Certificate found successfully!</p>}

      {result && (
        <div className="certificate-details">
          <h3>Certificate Details:</h3>
          <p><strong>Owner:</strong> {result.owner}</p>
          <p><strong>Token ID:</strong> {result.tokenID}</p>
          <p>
            <strong>Metadata:</strong>{" "}
            {parseMetadata(result.metadata)?.description ||
              "No description available"}
          </p>
        </div>
      )}
{/* Additional Content */}
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
      <h3>Need Help?</h3>
      <p>
        If you encounter issues verifying your certificate, please ensure the following:
      </p>
      <ul>
        <li>Double-check the Owner Address and Token ID you entered.</li>
        <li>Confirm that the token exists on the <strong>TESTNET</strong> blockchain network.</li>
        <li>
          For further assistance, contact our support team at{" "}
          <a href="mailto:support@kalp.studio" className="support-email">
            support@kalp.studio
          </a>
          .
        </li>
      </ul>
    </div>

      <style jsx>{`
        .certificate-query-container {
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
         font-family: 'Audiowide', sans-serif;
    text-align: center;
    font-size: 2.5rem;
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
          font-family: 'Sp', sans-serif;
         color:#ff4444; 
         font-size:1.5rem;
         background-color:#ffdddd; 
         padding :10px; 
         border-radius :5px; 
         margin-top :10px; 
       } 
       .success { 
       font-family: 'Sp', sans-serif;
       font-size: 2rem;
         color:#00ff00; 
         background-color:#ddffdd; 
         padding :10px; 
         border-radius :5px; 
         margin-top :10px; 
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
      }
      .additional-content li {
        margin-bottom: 5px;
      }
      .support-email {
        color: #63f2ad;
        text-decoration: underline;
        cursor: pointer;
      }
      .support-email:hover {
        text-decoration: none;
        color: #00ff00;
      }
     `}</style>
   </div>
 );
};

export default CertificateQuery;
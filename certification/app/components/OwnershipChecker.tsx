"use client";
import React, { useState } from "react";

// API constants
const API_BASE_URL = "https://gateway-api.kalp.studio/v1/contract/kalp";
const CONTRACT_ID = "vHYQcRijQGB3UpVhqc3UeBM2D3ztjPuS1732534432325";
const API_KEY =
  "3aa171233676e8294e934cadb352a5643aab3b945cbfb1328b7770f5adef254071b400d108780a6f8897a577038192c13ffa78d81cf46e442eec758d51c66134bb6003";
const WALLET_ADDRESS = "ded665bca7d412891f44a571d908b66184b0ee10";

interface OwnershipResult {
  owner: string;
  tokenID: string;
  metadata: string;
}

const OwnershipChecker = () => {
  const [owner, setOwner] = useState(""); // The user input for the wallet address to check ownership
  const [result, setResult] = useState<OwnershipResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckOwnership = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/query/${CONTRACT_ID}/GetSBTByOwner`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            Accept: "application/json",
          },
          body: JSON.stringify({
            network: "TESTNET",
            blockchain: "KALP",
            walletAddress: WALLET_ADDRESS,
            args: { owner },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.result) {
        setResult(data.result.result); // Storing the nested result in state
      } else {
        setError("No SBT found for this owner");
      }
    } catch {
      setError(
        "Error checking ownership. Make sure the address you've entered is correct."
      );
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
    <div className="responsive-container">
      <div className="certificate-query-container">
        <header className="header">
          <h2 className="title">Certificate Ownership Checker</h2>
          <p className="subtitle">
            Enter a wallet address to check for certificate ownership. This tool
            fetches and displays SBT details associated with the given wallet.
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
            {loading ? "Checking..." : "Check Ownership"}
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
            <p>
              <strong>Owner:</strong> {result.owner}
            </p>
            <p>
              <strong>Token ID:</strong> {result.tokenID}
            </p>
            <p>
              <strong>Metadata:</strong>{" "}
              {parseMetadata(result.metadata)?.description ||
                "No description available"}
            </p>
          </div>
        )}

        {loading && <div className="loader"></div>}
        <div className="additional-content">
          <h3>Why Verify Your Certificate?</h3>
          <p>
            Soulbound Tokens (SBTs) are an innovative way to represent
            achievements, certifications, or memberships on the blockchain.
            Ensuring the authenticity and ownership of your SBT is crucial for
            maintaining the integrity of your digital credentials.
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
      </div>
      <style jsx>{`
        .responsive-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          .certificate-query-container {
            width: 100%;
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default OwnershipChecker;

'use client';

import React, { useState } from 'react';
import useSBTApi from '../hooks/useSBTApi';

const TransferRestriction = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const { attemptTransfer, loading, error } = useSBTApi();

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await attemptTransfer(from, to, tokenId);
      setResult(data);
    } catch (err) {
      console.error('Error attempting transfer:', err);
    }
  };

  return (
    <div className="transfer-restriction">
      <h2 className="title">Transfer Restriction Notice</h2>
      <form onSubmit={handleTransfer} className="form">
        <div className="input-group">
          <label htmlFor="from" className="label">From Address</label>
          <input
            type="text"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="to" className="label">To Address</label>
          <input
            type="text"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="tokenId" className="label">Token ID</label>
          <input
            type="text"
            id="tokenId"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            className="input"
            required
          />
        </div>
        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Attempting Transfer...' : 'Attempt Transfer'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {result && (
        <div className="result">
          <h3 className="result-title">Transfer Result:</h3>
          <pre className="result-pre">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      <div className="notice">
        <h3 className="notice-title">Important Notice:</h3>
        <p>Soulbound Tokens (SBTs) are non-transferable by design. Any attempt to transfer an SBT will fail. These tokens are permanently bound to the address they were minted to, ensuring the authenticity and non-transferability of the certification they represent.</p>
      </div>

      <style jsx>{`
        .transfer-restriction {
        font-family: 'Audiowide', sans-serif;
          background-color: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          margin: 2rem auto;
        }
        .title {
          font-size: 3rem;
          margin-bottom: 1rem;
          text-align: center;
          background: linear-gradient(45deg, #000000, #63f2ad, #258054);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .input-group {
          display: flex;
          flex-direction: column;
        }
        .label {
          font-size: 2rem;
          font-weight: bold;
          color: #258054;
        }
        .input {
          padding: 0.75rem;
          border-radius: 0.375rem;
          border: 1px solid #CBD5E0;
          font-size: 1rem;
          outline: none;
        }
        .submit-btn {
          background-color: #EF4444;
          color: white;
          font-weight: bold;
          font-size: 2rem;
          font-family: 'Gameplay', sans-serif;
          padding: 0.75rem;
          border-radius: 0.375rem;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .submit-btn:hover {
          background-color: #DC2626;
        }
        .error {
          color: #EF4444;
          margin-top: 1rem;
        }
        .result {
          margin-top: 1.5rem;
          background-color: #F3F4F6;
          padding: 1rem;
          border-radius: 0.375rem;
        }
        .notice {
        font-family: 'Sp', sans-serif;
          margin-top: 2rem;
          background-color: #1a1a1a;
          padding: 1rem;
          border-radius: 0.5rem;
          color: white;
        }
        .notice-title {
        font-family: 'Audiowide', sans-serif;
          font-size: 1.25rem;
          font-weight: bold;
          color: #63f2ad;
        }
      `}</style>
    </div>
  );
};

export default TransferRestriction;

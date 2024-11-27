import { useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const WALLET_ADDRESS = process.env.NEXT_PUBLIC_WALLET_ADDRESS;

const useSBTApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchApi = async (endpoint: string, args: { [key: string]: string | number | boolean }) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}/${CONTRACT_ID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY || '',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            network: "TESTNET",
            blockchain: "KALP",
            walletAddress: WALLET_ADDRESS,
            args: args, // Pass the args here
          })
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        return await response.json();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
        throw e;
      } finally {
        setLoading(false);
      }
    };
  
    const querySBT = (owner: string, tokenId: string) => 
      fetchApi('query/QuerySBT', { owner, tokenID: tokenId });
  
    const getSBTByOwner = (owner: string) => 
      fetchApi('query/GetSBTByOwner', { owner });  // Make sure "owner" is passed correctly
  
    const getAllTokenIDs = () => 
      fetchApi('query/GetAllTokenIDs', {});
  
    const attemptTransfer = (from: string, to: string, tokenId: string) => 
      fetchApi('query/TransferSBT', { from, to, tokenID: tokenId });
  
    return { 
      querySBT, 
      getSBTByOwner, 
      getAllTokenIDs, 
      attemptTransfer, 
      loading, 
      error 
    };
  };
  
  export default useSBTApi;
  
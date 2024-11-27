import { useState } from 'react';

const API_BASE_URL = 'https://gateway-api.kalp.studio/v1/contract/kalp';
const CONTRACT_ID = 'vHYQcRijQGB3UpVhqc3UeBM2D3ztjPuS1732534432325';
const WALLET_ADDRESS = 'ded665bca7d412891f44a571d908b66184b0ee10';
const API_KEY = '3aa171233676e8294e934cadb352a5643aab3b945cbfb1328b7770f5adef254071b400d108780a6f8897a577038192c13ffa78d81cf46e442eec758d51c66134bb6003';

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
            'x-api-key': API_KEY,
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
  
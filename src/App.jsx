import { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [address, setAddress] = useState("");
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchTokens = async () => {
    if (!address) {
      setError("Please enter a valid address.");
      return;
    }
    setError(null);

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://sepolia-blockscout.lisk.com/api/v2/addresses/${address}/tokens`
      );
      setTokens(response?.data?.items || []);
    } catch (err) {
      setError(
        "Failed to fetch tokens. Please check the address and try again."
      );
    }
    setIsLoading(false);
  };
  return (
    <>
      <div className="container">
        <h2>Token Aggregation</h2>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Ethereum Address"
        />
        <button onClick={fetchTokens}>
          {" "}
          {isLoading ? "Loading ..." : "Fetch Tokens"}{" "}
        </button>

        {error && <p className="error">{error}</p>}

        <ul className="token-list">
          {tokens.map((token) => (
            <li className="token-item" key={token.token.address}>
              <strong>Token:</strong> {token.token.name} <br />
              <strong>Symbol:</strong> {token.token.symbol} <br />
              <strong>Balance:</strong>{" "}
              {token.value / 10 ** token.token.decimals}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

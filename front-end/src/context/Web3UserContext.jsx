// src/context/Web3UserContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const Web3UserContext = createContext(null);

export function Web3UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const address = localStorage.getItem('userAddress');

    if (token && address) {
      // On peut fetch le solde CHZ simulé
      axios.get(`http://localhost:3000/users/${address}/balance`)
        .then(res => {
          const balance = res.data.balances.find(b => b.token === 'CHZ')?.amount || 0;
          setUser({ address, balance });
        })
        .catch(() => {
          setUser({ address, balance: 0 });
        });
    }
  }, []);

  return (
    <Web3UserContext.Provider value={{ user, setUser }}>
      {children}
    </Web3UserContext.Provider>
  );
}

import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

export default function Login() {
  const navigate = useNavigate();

  const handleConnect = async () => {
    try {
      if (!window.ethereum) {
        alert('MetaMask is not installed!');
        return;
      }

      // Étape 1: Récupère l'adresse
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const address = accounts[0];

      // Étape 2: Demande le message à signer
      const res1 = await axios.post('http://localhost:3000/auth/web3/request-message', {
        address,
      });

      const message = res1.data.message;

      // Étape 3: Signature
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(message);

      // Étape 4: Vérifie la signature
      const res2 = await axios.post('http://localhost:3000/auth/web3/verify-signature', {
        address,
        signature,
      });

      const { token } = res2.data;
      localStorage.setItem('authToken', token); // facultatif
      alert('✅ Login success!');

      navigate('/'); // redirection

    } catch (err) {
      console.error('❌ Login error:', err);
      alert('Login failed. See console.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
      <h1 className="text-3xl font-bold mb-6">Connect your Chiliz Wallet</h1>
      <p className="mb-4 text-center max-w-md">
        To place bets, earn rewards and use your Fan Tokens,<br />
        please connect your wallet.
      </p>
      <button
        onClick={handleConnect}
        className="bg-black text-white px-6 py-3 rounded-full hover:bg-zinc-800 transition"
      >
        Connect with MetaMask
      </button>
    </div>
  );
}

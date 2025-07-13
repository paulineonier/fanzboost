import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { Web3UserContext } from '../context/Web3UserContext';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(Web3UserContext);

  const handleConnect = async () => {
    try {
      if (!window.ethereum) {
        alert('MetaMask is not installed!');
        return;
      }

      // 1. Connexion avec MetaMask
      const metaProvider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await metaProvider.send('eth_requestAccounts', []);
      const address = accounts[0];

      // 2. Signature
      const { data: { message } } = await axios.post('http://localhost:3000/auth/web3/request-message', {
        address,
      });

      const signer = await metaProvider.getSigner();
      const signature = await signer.signMessage(message);

      const { data: { token } } = await axios.post('http://localhost:3000/auth/web3/verify-signature', {
        address,
        signature,
      });

      localStorage.setItem('authToken', token);

      // 3. Lecture du solde via un provider RPC direct vers Chiliz Spicy Testnet
      const spicyProvider = new ethers.JsonRpcProvider('https://spicy-rpc.chiliz.com');
      const balanceWei = await spicyProvider.getBalance(address);
      const chzBalance = ethers.formatEther(balanceWei); // ex: "100.0"

      setUser({
        address,
        token,
        balance: chzBalance,
      });

      alert('✅ Login success!');
      navigate('/');

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

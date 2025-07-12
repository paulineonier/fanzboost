import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleConnect = () => {
    // Here you'll trigger actual Chiliz Wallet connect logic
    // For now we simulate a login
    alert('Connecting to Chiliz Wallet...');
    navigate('/'); // Redirect back home after connect
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
      <h1 className="text-3xl font-bold mb-6">Connect your Chiliz Wallet</h1>
      <p className="mb-4 text-center max-w-md">
        To place bets, earn rewards and use your Fan Tokens, <br />
         please connect your Chiliz wallet.
      </p>
      <button
        onClick={handleConnect}
        className="bg-black text-white px-6 py-3 rounded-full hover:bg-zinc-800 transition"
      >
        Connect with Chiliz
      </button>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Récupérer l'adresse depuis MetaMask
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) setAddress(savedAddress);

    // Récupérer l'avatar et le pseudo (stockés en localStorage)
    const savedUsername = localStorage.getItem('username');
    const savedAvatar = localStorage.getItem('avatar');
    if (savedUsername) setUsername(savedUsername);
    if (savedAvatar) setAvatar(savedAvatar);

    // Historique mocké
    const mockHistory = [
      { match: 'PSG vs Chelsea', team: 'PSG', amount: 5, token: 'CHZ' },
      { match: 'England vs Wales', team: 'Wales', amount: 3, token: 'CHZ' },
    ];
    setHistory(mockHistory);
  }, []);

  const handleSave = () => {
    localStorage.setItem('username', username);
    localStorage.setItem('avatar', avatar);
    alert('✅ Profile updated');
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <div className="flex items-center space-x-4 mb-6">
        <img
          src={avatar || 'https://via.placeholder.com/80'}
          alt="avatar"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <p className="font-semibold">Wallet Address:</p>
          <p className="text-sm text-gray-600">{address}</p>
        </div>
      </div>

      <label className="block mb-2">Avatar URL:</label>
      <input
        type="text"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
        placeholder="https://your-avatar.png"
      />

      <label className="block mb-2">Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
        placeholder="Enter your username"
      />

      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 rounded mb-6"
      >
        Save Profile
      </button>

      <hr className="mb-6" />

      <h2 className="text-xl font-semibold mb-3">My Bet History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">No bets yet.</p>
      ) : (
        <ul className="space-y-3">
          {history.map((bet, i) => (
            <li key={i} className="border p-3 rounded shadow-sm">
              <p><strong>Match:</strong> {bet.match}</p>
              <p><strong>Team:</strong> {bet.team}</p>
              <p><strong>Amount:</strong> {bet.amount} {bet.token}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

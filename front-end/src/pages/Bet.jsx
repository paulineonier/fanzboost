import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Web3UserContext } from '../context/Web3UserContext';

export default function Bet() {
  const location = useLocation();
  const { user } = useContext(Web3UserContext);

  const matchData = location.state || {
    matchId: 'match_psg_chelsea',
    matchTitle: 'FIFA Club World Cup - Final: PSG vs Chelsea',
    teams: ['PSG', 'Chelsea'],
  };

  const [userId, setUserId] = useState('');
  const [betType, setBetType] = useState(matchData.teams[0]);
  const [token, setToken] = useState('CHZ');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user?.address) {
      setUserId(user.address);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await axios.post('http://localhost:3000/bets', {
        userId,
        matchId: matchData.matchId,
        betType,
        token,
        amount: Number(amount),
      });
      setMessage({ type: 'success', text: res.data.message });
      setAmount('');
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.error || 'Error placing bet',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-blue-100 to-orange-200 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center font-fan">Place Your Bet</h2>

        {!userId ? (
          <p className="text-center text-red-600">Please connect your wallet first.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Match</label>
              <input
                type="text"
                value={matchData.matchTitle}
                disabled
                className="w-full bg-gray-100 px-4 py-2 rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Your Bet (Team)</label>
              <Listbox value={betType} onChange={setBetType}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-pointer rounded border bg-white py-2 pl-4 pr-10 text-left shadow-sm text-base text-black">
                    <span className="block truncate">{betType}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                    {matchData.teams.map((team, idx) => (
                      <Listbox.Option
                        key={idx}
                        value={team}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-green-100 text-green-900' : 'text-gray-900'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-semibold' : ''}`}>{team}</span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Token</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-4 py-2 border rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border rounded text-sm"
                placeholder="Amount in tokens"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600"
            >
              Submit Bet
            </button>
          </form>
        )}

        {message && (
          <div
            className={`text-sm mt-4 p-2 rounded ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}

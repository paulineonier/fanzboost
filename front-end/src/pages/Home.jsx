// src/pages/Home.jsx
import React from 'react';
import { FaGift, FaStar, FaTicketAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const handleBetClick = (matchId, matchTitle, teams) => {
        navigate('/bet', {
            state: {
                matchId,
                matchTitle,
                teams: teams.split(' vs '),
            },
        });
    };

    return (
        <div className="min-h-screen text-gray-900 px-4 py-6 max-w-5xl mx-auto space-y-10">

            {/* Header */}
            <header className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                {/* Logo + Titre */}
                <div className="flex items-center space-x-3">
                    <img
                        src="/logo.png"
                        alt="FanzBoost Logo"
                        className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border border-gray-300 bg-white p-1 transition-transform duration-300 hover:scale-110 hover:rotate-3"
                    />
                    <h1 className="font-orbitron text-3xl sm:text-4xl text-black font-bold tracking-tight">FanzBoost</h1>
                </div>

                {/* Bouton de Connexion */}
                <button
                    onClick={() => navigate('/login')}
                    className="mt-2 sm:mt-0 bg-black text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-gray-800 transition"
                >
                    Connect Wallet
                </button>
            </header>

            {/* Hero */}
            <section className="text-center space-y-3">
                <h2 className="font-inter text-3xl font-extrabold">Boost Your Fan Power!</h2>
                <p className="text-sm text-gray-600">Bet, play, and win with Fan Tokens.</p>
                <button className="mt-2 bg-green-500 text-white px-5 py-2 rounded-md font-semibold hover:bg-green-600 transition">
                    Explore Matches
                </button>
            </section>

            {/* League Filters */}
            <section>
                <h3 className="text-lg font-semibold mb-2">Leagues</h3>
                <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
                    {['FIFA', 'UCL', 'Premier League', 'La Liga', 'Bundesliga', 'Serie A'].map((league) => (
                        <button key={league} className="whitespace-nowrap bg-gray-100 border border-gray-300 text-sm px-4 py-1.5 rounded-full hover:bg-gray-200 transition">
                            {league}
                        </button>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-lg font-semibold mb-3">Live Matches</h3>
                <div className="space-y-4">
                    <MatchCard
                        matchId="match_psg_chelsea"
                        teams="PSG vs Chelsea"
                        date="FIFA Club World Cup - Final · 21:00 (Paris time)"
                        onClick={handleBetClick}
                    />
                    <MatchCard
                        matchId="match_england_wales"
                        teams="England vs Wales"
                        date="Women's EURO - Group D · 21:00 (Paris time)"
                        onClick={handleBetClick}
                    />
                    <MatchCard
                        matchId="match_netherlands_france"
                        teams="Netherlands vs France"
                        date="Women's EURO - Group D · 21:00 (Paris time)"
                        onClick={handleBetClick}
                    />
                </div>
            </section>

            {/* How It Works */}
            <section>
                <h3 className="text-lg font-semibold mb-4 text-center">How It Works</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <Step icon="🔗" title="Connect Wallet" />
                    <Step icon="⚽" title="Place Bets" />
                    <Step icon="🏆" title="Win Rewards" />
                </div>
            </section>

            {/* Fan Rewards */}
            <section>
                <h3 className="text-lg font-semibold mb-3">Fan Rewards</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-100 p-4 rounded-xl flex flex-col items-center justify-center">
                        <FaGift className="text-4xl text-orange-500 mb-2" />
                        <p className="text-center">Exclusive NFT</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl flex flex-col items-center justify-center">
                        <FaStar className="text-4xl text-yellow-500 mb-2" />
                        <p className="text-center">XP Points</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl flex flex-col items-center justify-center">
                        <FaTicketAlt className="text-4xl text-green-600 mb-2" />
                        <p className="text-center">Merch & Tickets</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="pt-6 border-t text-center text-sm text-gray-500 space-x-4">
                <a href="#" className="hover:underline">About</a>
                <a href="#" className="hover:underline">Terms</a>
                <a href="#" className="hover:underline">Contact</a>
            </footer>
        </div>
    );
}

function MatchCard({ matchId, teams, date, onClick }) {
    return (
        <div className="border border-white rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs text-gray-700">{date}</p>
                <p className="text-sm font-medium text-black">{teams}</p>
            </div>
            <button
                onClick={() => onClick(matchId, date.split(' · ')[0] + ': ' + teams, teams)}
                className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600 transition"
            >
                BET NOW
            </button>
        </div>
    );
}

function Step({ icon, title }) {
    return (
        <div className="flex flex-col items-center space-y-2">
            <div className="text-3xl">{icon}</div>
            <p className="text-sm font-medium">{title}</p>
        </div>
    );
}

function RewardCard({ title, icon }) {
    return (
        <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
            <img src={icon} alt="Reward" className="h-10 mb-2" />
            <p className="text-sm font-medium">{title}</p>
        </div>
    );
}

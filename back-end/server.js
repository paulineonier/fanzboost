const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const { ethers } = require('ethers');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Import des routes métiers
const betsRoutes = require('./routes/bets');
const rewardsRoutes = require('./routes/rewards');
const quizRoutes = require('./routes/quiz');
const setupWebSocket = require('./services/websocket');

app.use(cors());
app.use(express.json());

// Routes REST métiers
app.use('/bets', betsRoutes);
app.use('/rewards', rewardsRoutes);
app.use('/quiz', quizRoutes);

// --- Routes mock Chiliz ---
app.get('/users/:userId/balance', (req, res) => {
  const { userId } = req.params;
  res.json({
    userId,
    balances: [
      { token: 'JUV', amount: 120 },
      { token: 'PSG', amount: 75 },
      { token: 'FCB', amount: 40 }
    ]
  });
});

app.post('/transactions/validate', (req, res) => {
  const { transactionId, userId, token, amount } = req.body;
  if (!transactionId || !userId || !token || !amount) {
    return res.status(400).json({ error: 'Paramètres manquants' });
  }
  res.json({
    transactionId,
    status: 'validated',
    userId,
    token,
    amount,
    validatedAt: new Date().toISOString()
  });
});

app.post('/auth/socios/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username et password requis' });
  }
  res.json({
    userId: 'mockUserId123',
    username,
    token: 'mock-jwt-token',
    roles: ['user']
  });
});

app.get('/tokens/:tokenId', (req, res) => {
  const { tokenId } = req.params;
  const tokens = {
    JUV: { name: 'Juventus Fan Token', symbol: 'JUV', priceUSD: 8.25 },
    PSG: { name: 'Paris Saint-Germain Fan Token', symbol: 'PSG', priceUSD: 7.80 },
    FCB: { name: 'FC Barcelona Fan Token', symbol: 'FCB', priceUSD: 9.10 }
  };
  const tokenInfo = tokens[tokenId.toUpperCase()];
  if (!tokenInfo) return res.status(404).json({ error: 'Token non trouvé' });
  res.json(tokenInfo);
});

// --- Web3 Auth Routes ---
const nonces = {}; // mémoire temporaire pour stocker les nonces

function generateNonce() {
  return `Login nonce: ${Math.floor(Math.random() * 1000000)}`;
}

app.post('/auth/web3/request-message', (req, res) => {
  const { address } = req.body;
  if (!address) return res.status(400).json({ error: 'Adresse requise' });

  const nonce = generateNonce();
  nonces[address.toLowerCase()] = nonce;

  res.json({ message: nonce });
});

app.post('/auth/web3/verify-signature', (req, res) => {
  const { address, signature } = req.body;
  if (!address || !signature) return res.status(400).json({ error: 'Adresse et signature requises' });

  const message = nonces[address.toLowerCase()];
  if (!message) return res.status(400).json({ error: 'Nonce introuvable' });

  try {
    const recovered = ethers.verifyMessage(message, signature);
    if (recovered.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ error: 'Signature invalide' });
    }

    delete nonces[address.toLowerCase()];

    const token = jwt.sign({ address }, process.env.JWT_SECRET || 'dev-secret', {
      expiresIn: '1h'
    });

    res.json({ token, address });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur de vérification' });
  }
});

// WebSocket
setupWebSocket(wss);

// Connexion MongoDB + démarrage serveur
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

console.log('Mongo URI used:', MONGO_URI);

mongoose.connect(MONGO_URI, {
  dbName: 'fanzboost'
})
.then(() => {
  console.log('✅ Connecté à MongoDB');
  server.listen(PORT, () => {
    console.log(`🚀 Backend server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ Erreur de connexion à MongoDB:', err.message);
});

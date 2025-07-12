const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

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

// --- Routes mock Chiliz intégrées ici ---

// GET /users/:userId/balance
app.get('/users/:userId/balance', (req, res) => {
  const { userId } = req.params;

  const mockResponse = {
    userId,
    balances: [
      { token: 'JUV', amount: 120 },
      { token: 'PSG', amount: 75 },
      { token: 'FCB', amount: 40 }
    ]
  };

  res.json(mockResponse);
});

// POST /transactions/validate
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

// POST /auth/socios/login
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

// GET /tokens/:tokenId
app.get('/tokens/:tokenId', (req, res) => {
  const { tokenId } = req.params;

  const tokens = {
    JUV: { name: 'Juventus Fan Token', symbol: 'JUV', priceUSD: 8.25 },
    PSG: { name: 'Paris Saint-Germain Fan Token', symbol: 'PSG', priceUSD: 7.80 },
    FCB: { name: 'FC Barcelona Fan Token', symbol: 'FCB', priceUSD: 9.10 }
  };

  const tokenInfo = tokens[tokenId.toUpperCase()];

  if (!tokenInfo) {
    return res.status(404).json({ error: 'Token non trouvé' });
  }

  res.json(tokenInfo);
});

// Setup WebSocket
setupWebSocket(wss);

// Connexion à MongoDB et lancement serveur
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sportsapp';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connecté à MongoDB');
  server.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('Erreur de connexion à MongoDB:', err);
});

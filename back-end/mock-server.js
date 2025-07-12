const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

/**
 * Route mock : GET /users/:userId/balance
 * Retourne un faux solde de fan tokens pour un utilisateur
 */
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

/**
 * Route mock : POST /transactions/validate
 * Simule la validation d’une transaction de tokens
 */
app.post('/transactions/validate', (req, res) => {
  const { transactionId, userId, token, amount } = req.body;

  if (!transactionId || !userId || !token || !amount) {
    return res.status(400).json({ error: 'Paramètres manquants' });
  }

  // Simulation d’une validation réussie
  res.json({
    transactionId,
    status: 'validated',
    userId,
    token,
    amount,
    validatedAt: new Date().toISOString()
  });
});

/**
 * Route mock : POST /auth/socios/login
 * Simule une authentification via compte Socios
 */
app.post('/auth/socios/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username et password requis' });
  }

  // Simulation succès
  res.json({
    userId: 'mockUserId123',
    username,
    token: 'mock-jwt-token',
    roles: ['user']
  });
});

/**
 * Route mock : GET /tokens/:tokenId
 * Retourne des infos factices sur un fan token
 */
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

app.listen(PORT, () => {
  console.log(`Mock Chiliz API server running at http://localhost:${PORT}`);
});

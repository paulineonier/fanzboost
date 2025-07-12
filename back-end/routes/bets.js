const express = require('express');
const router = express.Router();
const betsController = require('../controllers/betsController');
const chilizClient = require('../chilizClient');

// Middleware : Vérification du solde utilisateur avant de parier
async function checkUserBalance(req, res, next) {
  try {
    const { userId, token, amount } = req.body;

    if (!userId || !token || amount == null) {
      return res.status(400).json({ error: 'Champs requis : userId, token, amount' });
    }

    const balances = await chilizClient.getUserBalance(userId);

    const userTokenBalance = balances.balances.find(b => b.token === token);

    if (!userTokenBalance || userTokenBalance.amount < amount) {
      return res.status(400).json({ error: 'Solde insuffisant pour ce token' });
    }

    next();
  } catch (error) {
    console.error('Erreur dans checkUserBalance:', error);
    res.status(500).json({ error: 'Erreur lors de la vérification du solde utilisateur' });
  }
}

// POST /bets : place un pari (vérifie d'abord le solde)
router.post('/', checkUserBalance, betsController.placeBet);

module.exports = router;

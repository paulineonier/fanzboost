const express = require('express');
const router = express.Router();
const betsController = require('../controllers/betsController');
const chilizClient = require('../chilizClient'); // Import du client Chiliz

// Middleware pour vérifier le solde de l'utilisateur avant de placer un pari
async function checkUserBalance(req, res, next) {
  try {
    const userId = req.body.userId; // Supposons que userId est envoyé dans le body
    if (!userId) {
      return res.status(400).json({ error: 'userId est requis' });
    }

    // Appel à Chiliz pour récupérer le solde utilisateur
    const balances = await chilizClient.getUserBalance(userId);

    // Exemple simple : on vérifie qu'il a un certain token et un certain montant
    // (tu peux adapter selon ta logique)
    const token = req.body.token; // token utilisé pour le pari (ex: "JUV")
    const amount = req.body.amount; // montant parié

    if (!token || !amount) {
      return res.status(400).json({ error: 'token et amount sont requis' });
    }

    // Trouver le solde du token demandé
    const userTokenBalance = balances.balances.find(b => b.token === token);

    if (!userTokenBalance || userTokenBalance.amount < amount) {
      return res.status(400).json({ error: 'Solde insuffisant pour ce token' });
    }

    // Tout est OK, on passe au controller
    next();
  } catch (error) {
    console.error('Erreur checkUserBalance:', error);
    res.status(500).json({ error: 'Erreur lors de la vérification du solde utilisateur' });
  }
}

// On place la vérification avant la route POST /
router.post('/', checkUserBalance, betsController.placeBet);

module.exports = router;

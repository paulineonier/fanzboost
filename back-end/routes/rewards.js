const express = require('express');
const router = express.Router();

// Exemple de route GET pour récupérer les récompenses d'un utilisateur
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  // Simule une réponse de récompenses
  const mockRewards = [
    { id: 1, userId, type: 'token', value: 10, token: 'JUV' },
    { id: 2, userId, type: 'badge', name: 'Champion du mois' }
  ];

  res.json({ rewards: mockRewards });
});

module.exports = router;

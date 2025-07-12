const chilizClient = require('../chilizClient');
const Bet = require('../models/Bets');

exports.placeBet = async (req, res) => {
  const { userId, matchId, betType, token, amount } = req.body;

  if (!userId || !matchId || !betType || !token || !amount) {
    return res.status(400).json({ error: 'Tous les champs userId, matchId, betType, token et amount sont requis' });
  }

  try {
    // Simuler un ID de transaction (à remplacer par un vrai ID si tu en as)
    const transactionId = `tx_${Date.now()}`;

    // Valider la transaction via Chiliz API
    const validationResponse = await chilizClient.validateTransaction({
      transactionId,
      userId,
      token,
      amount,
    });

    // Sauvegarder le pari en base MongoDB
    const newBet = new Bet({
      userId,
      matchId,
      betType,
      token,
      amount,
      transactionId,
      status: 'validated', // ou 'pending' si tu veux gérer différemment
    });

    await newBet.save();

    console.log(`Pari sauvegardé: ${newBet}`);

    // Réponse finale au client
    res.status(201).json({
      success: true,
      message: 'Pari enregistré et transaction validée.',
      bet: newBet,
      transaction: validationResponse,
    });

  } catch (error) {
    console.error('Erreur placeBet:', error);
    res.status(500).json({ error: 'Erreur lors de la validation de la transaction ou sauvegarde' });
  }
};

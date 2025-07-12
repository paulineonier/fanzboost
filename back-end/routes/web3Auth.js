const express = require('express');
const { ethers } = require('ethers');
const jwt = require('jsonwebtoken');

const router = express.Router();

// In-memory store for nonces (à remplacer par une vraie BDD en prod)
const nonces = {};

// Générer un nonce aléatoire
function generateNonce() {
  return `Login nonce: ${Math.floor(Math.random() * 1000000)}`;
}

// Route 1 : Générer un message à signer
router.post('/request-message', (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'Adresse requise' });
  }

  const nonce = generateNonce();
  nonces[address.toLowerCase()] = nonce;

  res.json({ message: nonce });
});

// Route 2 : Vérifier la signature
router.post('/verify-signature', async (req, res) => {
  const { address, signature } = req.body;

  if (!address || !signature) {
    return res.status(400).json({ error: 'Adresse et signature requises' });
  }

  const message = nonces[address.toLowerCase()];
  if (!message) {
    return res.status(400).json({ error: 'Aucun message trouvé pour cette adresse' });
  }

  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ error: 'Signature invalide' });
    }

    // Auth OK — on supprime le nonce
    delete nonces[address.toLowerCase()];

    // Génération d’un token (à sécuriser avec un secret en .env)
    const token = jwt.sign({ address }, process.env.JWT_SECRET || 'dev-secret', {
      expiresIn: '1h'
    });

    res.json({ token, address });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la vérification' });
  }
});

module.exports = router;

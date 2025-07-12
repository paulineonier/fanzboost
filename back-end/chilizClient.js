const axios = require('axios');

const BASE_URL = process.env.CHILIZ_API_URL || 'http://localhost:3000'; // Adresse de ton backend mock ou vraie API

/**
 * Récupère les soldes tokens d’un utilisateur
 * @param {string} userId
 * @returns {Promise<Object>} données balances ou erreur
 */
async function getUserBalance(userId) {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}/balance`);
    return response.data;
  } catch (error) {
    handleError('getUserBalance', error);
  }
}

/**
 * Valide une transaction token
 * @param {Object} transaction { transactionId, userId, token, amount }
 * @returns {Promise<Object>} réponse validation ou erreur
 */
async function validateTransaction(transaction) {
  try {
    const response = await axios.post(`${BASE_URL}/transactions/validate`, transaction);
    return response.data;
  } catch (error) {
    handleError('validateTransaction', error);
  }
}

/**
 * Connexion via Socios
 * @param {Object} credentials { username, password }
 * @returns {Promise<Object>} données utilisateur ou erreur
 */
async function sociosLogin(credentials) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/socios/login`, credentials);
    return response.data;
  } catch (error) {
    handleError('sociosLogin', error);
  }
}

/**
 * Récupère les infos d’un token
 * @param {string} tokenId
 * @returns {Promise<Object>} données token ou erreur
 */
async function getTokenInfo(tokenId) {
  try {
    const response = await axios.get(`${BASE_URL}/tokens/${tokenId}`);
    return response.data;
  } catch (error) {
    handleError('getTokenInfo', error);
  }
}

/**
 * Gestion centralisée des erreurs
 * @param {string} fnName
 * @param {Error} error
 */
function handleError(fnName, error) {
  if (error.response) {
    // Erreur renvoyée par le serveur (ex: 404, 400)
    console.error(`[${fnName}] API error:`, error.response.data);
    throw new Error(error.response.data.error || 'Erreur API');
  } else if (error.request) {
    // Pas de réponse reçue
    console.error(`[${fnName}] No response from API`, error.request);
    throw new Error('Pas de réponse de l’API');
  } else {
    // Erreur axios ou autre
    console.error(`[${fnName}] Axios error:`, error.message);
    throw new Error(error.message);
  }
}

module.exports = {
  getUserBalance,
  validateTransaction,
  sociosLogin,
  getTokenInfo,
};

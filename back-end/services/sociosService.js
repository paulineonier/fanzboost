const axios = require('axios');

const API_URL = 'https://api.socios.com';
const API_KEY = process.env.SOCIOS_API_KEY;

async function getFanTokenBalance(userId) {
  const res = await axios.get(`${API_URL}/users/${userId}/tokens`, {
    headers: { Authorization: `Bearer ${API_KEY}` }
  });
  return res.data;
}

async function validateTokenTransaction(txId) {
  const res = await axios.post(`${API_URL}/transactions/validate`, { txId }, {
    headers: { Authorization: `Bearer ${API_KEY}` }
  });
  return res.data;
}

module.exports = {
  getFanTokenBalance,
  validateTokenTransaction
};

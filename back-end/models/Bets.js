const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  matchId: { type: String, required: true },
  betType: { type: String, required: true },
  token: { type: String, required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true },
  status: { type: String, default: 'validated' }, // ou 'pending', 'rejected', etc.
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bet', betSchema);

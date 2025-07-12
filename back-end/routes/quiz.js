const express = require('express');
const router = express.Router();

// GET /quiz/question : retourne une question aléatoire
router.get('/question', (req, res) => {
  const mockQuestion = {
    id: 'q1',
    question: 'Quelle équipe a remporté la Ligue des Champions en 2021 ?',
    options: ['Chelsea', 'Manchester City', 'PSG', 'Real Madrid']
  };

  res.json(mockQuestion);
});

// POST /quiz/answer : soumet une réponse
router.post('/answer', (req, res) => {
  const { questionId, selectedOption } = req.body;

  if (!questionId || !selectedOption) {
    return res.status(400).json({ error: 'questionId et selectedOption sont requis' });
  }

  // Simulation d'une vérification de réponse
  const isCorrect = selectedOption === 'Chelsea';

  res.json({
    questionId,
    correct: isCorrect,
    explanation: isCorrect
      ? 'Bonne réponse ! Chelsea a gagné en 2021.'
      : 'Mauvaise réponse. La bonne réponse était Chelsea.'
  });
});

module.exports = router;

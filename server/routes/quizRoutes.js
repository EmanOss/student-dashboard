const express = require('express');
const {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  deleteQuiz,
  updateQuiz
} = require('../controllers/quizController');

const router = express.Router();

// get all
router.get('/', getAllQuizzes);

// get by id
router.get('/:id', getQuizById);

// post new
router.post('/', createQuiz);

// delete by id
router.delete('/:id', deleteQuiz);

// update by id
router.patch('/:id', updateQuiz);

module.exports.router = router;
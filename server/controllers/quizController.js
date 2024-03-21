const Quiz = require('../models/QuizModel');
const mongoose = require('mongoose');

// Get all quizzes
const getAllQuizzes = async (req, res) => {
  try {
    const allQuizzes = await Quiz.find({}).sort({ createdAt: -1 });
    return res.status(201).json(allQuizzes);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Get quiz by id
const getQuizById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: 'No quiz with that id' });
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz)
    return res.status(404).json({ error: 'No quiz with that id' });
  return res.status(201).json(quiz);
};

// Post new quiz
const createQuiz = async (req, res) => {
  const { title, course, topic, dueDate } = req.body;

  try {
    const newQuiz = await Quiz.create({ title, course, topic, dueDate });
    return res.status(201).json(newQuiz);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Delete quiz by id
const deleteQuiz = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: 'No quiz with that id' });

  const deletedQuiz = await Quiz.findOneAndDelete({ _id: req.params.id });
  if (!deletedQuiz)
    return res.status(404).json({ error: 'No quiz with that id' });

  return res.status(201).json(deletedQuiz);

};
// Update quiz by id
const updateQuiz = async (req, res) => {
  // const { title, course, topic, dueDate } = req.body;
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: 'No quiz with that id' });
  const updatedQuiz = await Quiz.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true }
  );
  if (!updatedQuiz)
    return res.status(404).json({ error: 'No quiz with that id' });
  return res.status(201).json(updatedQuiz);
};

module.exports = {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  deleteQuiz,
  updateQuiz
};
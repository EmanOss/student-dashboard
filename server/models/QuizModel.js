const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const quizSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  course:{
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);

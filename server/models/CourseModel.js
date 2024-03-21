const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  quizzes: [{
    type: Schema.Types.ObjectId,
    ref: 'Quiz'
  }],
  announcements: [{
    type: Schema.Types.ObjectId,
    ref: 'Announcement'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);

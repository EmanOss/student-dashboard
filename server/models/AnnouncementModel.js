const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const announcementSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  course:{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  text: {
    type: String,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);

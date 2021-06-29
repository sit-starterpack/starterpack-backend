const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FeedbackSchema = new Schema({
  day: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  commentOn: {
    type: Number,
    default: new Date().getTime(),
  },
  commentBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.Schema('feedback', FeedbackSchema);

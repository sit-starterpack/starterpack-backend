const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  std_id: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  feedbacks: [
    {
      feedbackId: {
        type: Schema.Types.ObjectId,
        ref: 'feedback',
      },
    },
  ],
});

module.exports = mongoose.model('user', UserSchema);

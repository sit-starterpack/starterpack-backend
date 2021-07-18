const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const UserSchema = new Schema({
  name: {
    type: String,
  },
  nickname: {
    type: String,
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
UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('user', UserSchema);

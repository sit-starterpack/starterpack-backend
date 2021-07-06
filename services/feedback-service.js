const Feedback = require('../models/Feedback');
const User = require('../models/User');
const { HTTPSTATUS } = require('../enumeration/httpStatus');
module.exports.getAllFeedback = async () => {
  try {
    const result = await Feedback.find({});
    if (result.length === 0) throw HTTPSTATUS.NOT_FOUND;
    return result;
  } catch (err) {
    throw err;
  }
};
module.exports.saveFeedbackByUserId = async (id, payload) => {
  try {
    const { day, comment, commentBy } = payload;
    if (day && comment && commentBy) {
      const newFeedback = new Feedback(payload);
      await newFeedback.save();
      await User.findByIdAndUpdate(id, {
        $push: {
          feedbacks: {
            feedbackId: newFeedback._id,
          },
        },
      });
    } else {
      throw HTTPSTATUS.BAD_REQUEST;
    }
  } catch (err) {
    throw err;
  }
};

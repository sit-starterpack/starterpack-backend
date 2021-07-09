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
      const user = await User.findByIdAndUpdate(id, {
        $push: {
          feedbacks: {
            feedbackId: newFeedback._id,
          },
        },
      });
      if (!user) throw HTTPSTATUS.NOT_FOUND;
      await newFeedback.save();
    } else {
      throw HTTPSTATUS.BAD_REQUEST;
    }
  } catch (err) {
    throw err;
  }
};

module.exports.deleteFeedbackByUserId = async (userId, feedbackId) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          feedbacks: {
            feedbackId: feedbackId,
          },
        },
      },
      { multi: true },
      (err) => {
        if (err) throw err;
      }
    );
    const feedback = await Feedback.findByIdAndDelete(feedbackId, (err) => {
      if (err) throw err;
    });
    if (!feedback || !user) throw HTTPSTATUS.BAD_REQUEST;
  } catch (err) {
    throw err;
  }
};

module.exports.updateFeedbackById = async (id, payload) => {
  try {
    if (Object.keys(payload).length !== 0) {
      const feedback = await Feedback.findByIdAndUpdate(id, { $set: payload });
      if (!feedback) throw HTTPSTATUS.NOT_FOUND;
    } else {
      throw HTTPSTATUS.BAD_REQUEST;
    }
  } catch (err) {
    throw err;
  }
};

const Feedback = require('../models/Feedback');
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

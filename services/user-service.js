const User = require('../models/User');
const bcrypt = require('bcrypt');
const { HTTPSTATUS } = require('../enumeration/httpStatus');

module.exports.saveUser = async (payload) => {
  try {
    const { std_id, name, nickname } = payload;
    if (!name || !nickname || !std_id) {
      throw {
        message: 'Information invalid or empty',
        code: HTTPSTATUS.BAD_REQUEST.code,
      };
    }
    const targetUser = await User.find({ name: name });
    if (targetUser.length) {
      throw HTTPSTATUS.CONFLICT;
    }
    const hashedPassword = await bcrypt.hash(std_id, 10);
    const saveUser = new User({
      ...payload,
      std_id: hashedPassword,
    });
    await saveUser.save();
  } catch (err) {
    throw err;
  }
};

module.exports.getAllUser = async () => {
  try {
    const allUser = await User.find({ role: 'user' });
    if (!allUser.length) throw HTTPSTATUS.NOT_FOUND;
    return allUser;
  } catch (err) {
    throw err;
  }
};

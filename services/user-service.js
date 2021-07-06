const User = require('../models/User');
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
    const targetUser = await User.find({ std_id: std_id });
    if (targetUser.length > 0) {
      throw HTTPSTATUS.CONFLICT;
    }
    const saveUser = new User({
      ...payload,
    });
    await saveUser.save();
  } catch (err) {
    if (err.code === 11000) {
      throw HTTPSTATUS.CONFLICT;
    }
    throw err;
  }
};

module.exports.getAllUser = async () => {
  try {
    const allUser = await User.find({ role: 'user' });
    if (allUser.length === 0) throw HTTPSTATUS.NOT_FOUND;
    return allUser;
  } catch (err) {
    throw err;
  }
};

module.exports.findUserByStdId = async (std_id) => {
  try {
    const userInDB = await User.findOne({ std_id: std_id });
    if (!userInDB) throw HTTPSTATUS.NOT_FOUND;
    return userInDB;
  } catch (err) {
    throw err;
  }
};

module.exports.findUserById = async (id) => {
  try {
    const userInDB = await User.findById(id);
    if (!userInDB) throw HTTPSTATUS.NOT_FOUND;
    return userInDB;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteUserById = async (id) => {
  try {
    await User.findByIdAndDelete(id);
  } catch (err) {
    throw HTTPSTATUS.NOT_FOUND;
  }
};

module.exports.checkRoleAdmin = async (std_id) => {
  try {
    const requestUser = await User.findOne({ std_id: std_id });
    if (requestUser !== null) {
      if (requestUser.role === 'admin') {
        return true;
      }
    }
    throw HTTPSTATUS.FOR_BIDDEN;
  } catch (err) {
    throw err;
  }
};

module.exports.updateUserById = async (id, payload) => {
  try {
    await User.findByIdAndUpdate(id, { $set: payload });
  } catch (err) {
    if (err.code === 11000) {
      throw HTTPSTATUS.CONFLICT;
    }
    throw HTTPSTATUS.NOT_FOUND;
  }
};

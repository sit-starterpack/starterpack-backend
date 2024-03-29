const { findUserByStdId } = require('../services/user-service');
async function checkAuth(req, res, next) {
  const clientAuthorization = req.headers.authorization;
  try {
    if (clientAuthorization) {
      const token = clientAuthorization.split(' ')[1];
      const verifiedUser = await findUserByStdId(token);
      res.locals.verifiedUser = verifiedUser;
      next();
    } else {
      throw {
        code: 403,
        message: "Can't access token. Please login",
      };
    }
  } catch (err) {
    console.log(err);
    res.status(err.code).json({ message: err.message });
  }
}
module.exports = checkAuth;

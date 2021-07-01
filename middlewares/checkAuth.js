const { verifyUser } = require('../services/user-service');
async function checkAuth(req, res, next) {
  try {
    const clientCookie = req.cookies['std_id'];
    await verifyUser(clientCookie);
    next();
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
}
module.exports = checkAuth;

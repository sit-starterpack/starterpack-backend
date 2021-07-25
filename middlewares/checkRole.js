const { checkRoleAdmin } = require('../services/user-service');
async function checkRole(req, res, next) {
  const clientAuthorization = req.headers.authorization;
  try {
    if (!clientAuthorization)
      throw {
        code: 401,
        message: "You don't have permission to do this",
      };
    const std_id = clientAuthorization.split(' ')[1];
    const isAdmin = await checkRoleAdmin(std_id);
    if (isAdmin) next();
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
}
module.exports = checkRole;

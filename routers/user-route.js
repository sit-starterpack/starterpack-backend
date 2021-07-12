const express = require('express');
const router = express.Router();
const { HTTPSTATUS } = require('../enumeration/httpStatus');
const {
  saveUser,
  getAllUser,
  findUserByStdId,
  findUserById,
  deleteUserById,
  updateUserById,
  getUserByPagination,
  getAllAdmin,
} = require('../services/user-service');
const checkAuth = require('../middlewares/checkAuth');
const checkRoleAdmin = require('../middlewares/checkRole');
// GET
router.get('/check/auth', checkAuth, (req, res) => {
  res.status(HTTPSTATUS.OK.code).json({ user: res.locals.verifiedUser });
});
router.get('/user', async (req, res) => {
  try {
    let result = null;
    const { start, end } = req.query;
    if (start && end) {
      const startAt = start - 1 < 0 ? 0 : start - 1;
      result = await getUserByPagination(startAt, end);
    } else {
      result = await getAllUser();
    }
    res.status(HTTPSTATUS.OK.code).json(result);
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
});
router.get('/user/admin', async (req, res) => {
  try {
    const admin = await getAllAdmin();
    res.status(HTTPSTATUS.OK.code).json(admin);
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
});
router.get('/user/length', async (req, res) => {
  try {
    const users = await getAllUser();
    res.status(HTTPSTATUS.OK.code).json({ userLength: users.length });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
});
router.get('/user/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const targetUser = await findUserById(id);
    res.status(HTTPSTATUS.OK.code).json(targetUser);
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
});
// POST
router.post('/user', checkRoleAdmin, async (req, res) => {
  try {
    const { name, std_id, nickname } = req.body;
    await saveUser({ name, std_id, nickname });
    res
      .status(HTTPSTATUS.CREATED.code)
      .json({ message: HTTPSTATUS.CREATED.message });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
});
router.post('/user/auth', async (req, res) => {
  try {
    const { std_id } = req.body;
    const verifiedUser = await findUserByStdId(std_id);
    res.status(HTTPSTATUS.OK.code).json({ token: verifiedUser.std_id });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
});
// PUT
router.put('/user/:id', checkRoleAdmin, async (req, res) => {
  try {
    const _id = req.params.id;
    const { nickname, name, std_id, role } = req.body;
    await updateUserById(_id, { nickname, name, std_id, role });
    res.sendStatus(HTTPSTATUS.NO_CONTENT.code);
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
});
//DELETE
router.delete('/user/:id', checkRoleAdmin, async (req, res) => {
  try {
    const _id = req.params.id;
    await deleteUserById(_id);
    res.sendStatus(HTTPSTATUS.NO_CONTENT.code);
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
});

module.exports = router;

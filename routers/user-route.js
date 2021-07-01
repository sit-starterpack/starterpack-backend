const express = require('express');
const router = express.Router();
const { HTTPSTATUS } = require('../enumeration/httpStatus');
const {
  saveUser,
  getAllUser,
  verifyUser,
} = require('../services/user-service');
// GET
router.get('/user', async (req, res) => {
  try {
    const allUser = await getAllUser();
    res.status(HTTPSTATUS.OK.code).json(allUser);
  } catch (err) {
    res.status(err.code).json(err.message);
  }
});
// POST
router.post('/user', async (req, res) => {
  try {
    const { name, std_id, nickname } = req.body;
    await saveUser({ name, std_id, nickname });
    res.status(HTTPSTATUS.OK.code).json({ message: HTTPSTATUS.OK.message });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
});
router.post('/user/auth', async (req, res) => {
  try {
    const { std_id } = req.body;
    await verifyUser(std_id);
    res.status(HTTPSTATUS.OK.code).json({ message: HTTPSTATUS.OK.message });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
});

module.exports = router;

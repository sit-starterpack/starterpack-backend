const express = require('express');
const router = express.Router();
const { HTTPSTATUS } = require('../enumeration/httpStatus');
const { saveUser, getAllUser } = require('../services/user-service');
// GET
router.get('/user', async (req, res) => {
  try {
    const allUser = getAllUser();
    res.status(HTTPSTATUS.OK).json(allUser);
  } catch (err) {
    res.status(err.code).json(err.message);
  }
});
// POST
router.post('/user', async (req, res) => {
  try {
    const { name, std_id, nickname } = req.body;
    await saveUser({ name, std_id, nickname });
    res.status(HTTPSTATUS.OK.code).json(HTTPSTATUS.OK.message);
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
});

module.exports = router;

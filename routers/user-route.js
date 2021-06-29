const express = require('express');
const router = express.Router();
const { HTTPSTATUS } = require('../enumeration/httpStatus');
const { saveUser } = require('../services/user-service');

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

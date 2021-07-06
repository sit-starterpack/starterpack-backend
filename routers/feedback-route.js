const express = require('express');
const router = express.Router();
const { HTTPSTATUS } = require('../enumeration/httpStatus');
const { getAllFeedback } = require('../services/feedback-service');
const checkRole = require('../middlewares/checkRole');
// GET
router.get('/feedback', async (req, res) => {
  try {
    const allFeedback = await getAllFeedback();
    res.status(HTTPSTATUS.OK.code).json(allFeedback);
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
});

module.exports = router;

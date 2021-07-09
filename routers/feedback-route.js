const express = require('express');
const router = express.Router();
const { HTTPSTATUS } = require('../enumeration/httpStatus');
const {
  getAllFeedback,
  saveFeedbackByUserId,
  deleteFeedbackByUserId,
} = require('../services/feedback-service');
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

router.post('/user/:id/feedback', checkRole, async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    await saveFeedbackByUserId(id, payload);
    res
      .status(HTTPSTATUS.CREATED.code)
      .json({ message: HTTPSTATUS.CREATED.message });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
});
router.delete('/user/:userId/feedback/:feedbackId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const feedbackId = req.params.feedbackId;
    await deleteFeedbackByUserId(userId, feedbackId);
    res.status(HTTPSTATUS.NO_CONTENT.code);
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
});
module.exports = router;

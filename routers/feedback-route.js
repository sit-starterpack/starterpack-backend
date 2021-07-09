const express = require('express');
const router = express.Router();
const { HTTPSTATUS } = require('../enumeration/httpStatus');
const {
  getAllFeedback,
  saveFeedbackByUserId,
  deleteFeedbackByUserId,
  updateFeedbackById,
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
// POST
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
// PUT
router.put('/feedback/:feedbackId', checkRole, async (req, res) => {
  const feedbackId = req.params.feedbackId;
  const payload = req.body;
  try {
    await updateFeedbackById(feedbackId, payload);
    res
      .status(HTTPSTATUS.NO_CONTENT.code)
      .json({ message: HTTPSTATUS.NO_CONTENT.message });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
});
// DELETE
router.delete(
  '/user/:userId/feedback/:feedbackId',
  checkRole,
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const feedbackId = req.params.feedbackId;
      await deleteFeedbackByUserId(userId, feedbackId);
      res.status(HTTPSTATUS.NO_CONTENT.code);
    } catch (err) {
      res.status(err.code).json({ message: err.message });
    }
  }
);
module.exports = router;

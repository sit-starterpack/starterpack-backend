// Require module
const express = require('express');
const db_service = require('./services/database-service');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Router
const userRoute = require('./routers/user-route');
const feedbackRoute = require('./routers/feedback-route');

// Config
app.use(cookieParser());
app.use(express.json());
app.use(cors());

db_service();
app.use('/api/status', (req, res) => {
  res.status(200).json('Backend is already good');
});
app.use('/api', userRoute);
app.use('/api', feedbackRoute);
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

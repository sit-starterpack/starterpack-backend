const express = require('express');
const db_service = require('./services/database-service');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
const userRoute = require('./routers/user-route');
require('dotenv').config();

db_service();
app.use('/api/status', (req, res) => {
  res.status(200).json('Backend is already good');
});
app.use('/api', userRoute);
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

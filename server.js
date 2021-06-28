const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use('/api/status', (req, res) => {
  res.status(200).json('Backend is already good');
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

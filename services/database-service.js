const mongoose = require('mongoose');
module.exports = () => {
  return mongoose.connect(
    process.env.DB_CONNECTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) console.log(err);
      else console.log('DB Connected');
    }
  );
};

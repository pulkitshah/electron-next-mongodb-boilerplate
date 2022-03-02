const mongoose = require('mongoose');

async function connectDb() {
  try {
    await mongoose.connect(
      process.env.NODE_ENV !== 'production'
        ? process.env.mongoURI_DEV.toString()
        : // : process.env.mongoURI_STAG.toString(),
          process.env.mongoURI_PROD.toString(),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Mongodb connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDb;

const mongoose = require("mongoose");
require("dotenv").config({ silent: process.env.NODE_ENV === 'production' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBCONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("MONGOOSE CONNECTION STARTED");
  } catch (err) {
    console.error("MONGOOSE CONNECTION FAILED: " + err);
  }
};

module.exports = connectDB;

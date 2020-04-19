const mongoose = require("mongoose");
require("dotenv").config();

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

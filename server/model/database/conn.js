if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const mongoose = require("mongoose");
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

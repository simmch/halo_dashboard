require("dotenv").config();
const connectDB = require("./model/database/conn");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
  console.log("SERVER LIVE: " + port);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/payroll", require("./routes/payroll"));

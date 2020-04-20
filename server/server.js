require("dotenv").config({ silent: process.env.NODE_ENV === 'production' });
const connectDB = require("./model/database/conn");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

connectDB();

app.listen(port, () => {
  console.log("SERVER LIVE: " + port);
});

// body-parser is built into Express now
// You must "app.use" json to parse the req body
// This configuration works across all routes now
app.use(express.json({ extended: false }));
app.use(express.static(path.resolve(__dirname, '../client/build')));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// })

app.use("/payroll", require("./routes/payroll/payroll"));
app.use("/users", require("./routes/user/user"));
app.use("/auth", require("./routes/user/authenticate"));

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  // Get Token from Header
  const token = req.header("x-auth-token");

  // Check if No Token
  if (!token) {
    res.status(401).json({ msg: "NO TOKEN AUTH DENIED" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.jwtSecret);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: "INVALID TOKEN" });
    }
  }
};

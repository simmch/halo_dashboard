const express = require("express");
require("dotenv").config();
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const gravatar = require("gravatar");
const User = require("../../model/database/user/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// @route   GET /auth
// @desc    Auth route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    // res.status(200).json({ success: [{ msg: "User has been found." }] });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(404).send({ errors: [{ msg: "Unable to Find User" }] });
  }
});

//@route  POST /auth
//@desc   Authenticate user & get token
//@access Public

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token, success: [{ msg: "Logged in successfully." }] });
        }
      );
      // res.status(200).send({ success: [{ msg: "Logged in successfully." }] })
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ errors: [{ msg: "Server error." }] });
    }
  }
);

module.exports = router;
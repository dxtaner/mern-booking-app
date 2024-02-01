// controllers/authController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      age,
      city,
      country,
      img,
      isAdmin,
      phone,
    } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username or email already exists." });
    }

    const user = new User({
      username,
      email,
      password,
      age,
      city,
      country,
      img,
      isAdmin,
      phone,
    });
    await user.save();

    res.json({
      success: true,
      user: user,
      message: "Registration successful.",
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password." });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, { httpOnly: true });

    res.json({ success: true, user: user, token });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

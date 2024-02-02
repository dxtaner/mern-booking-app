// controllers/userController.js

const User = require("../models/User");

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("Error while fetching user profile:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedData = req.body;

    if (req.user.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized. You can only update your own profile.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    res.json({
      success: true,
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error while updating user profile:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (req.user.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized. You can only delete your own account.",
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    res.json({
      success: true,
      message: "User deleted successfully.",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error while deleting user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

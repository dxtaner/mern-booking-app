// routes/user.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const {
  authenticateToken,
  verifyUser,
  verifyAdmin,
} = require("../middleware/authMiddleware.js");

// Get a specific user's profile
router.get("/:userId", authenticateToken, verifyUser, UserController.getUser);

// Get all users (only for admin)
router.get("/", authenticateToken, verifyAdmin, UserController.getUsers);

// Update a specific user's profile
router.put(
  "/:userId",
  authenticateToken,
  verifyUser,
  UserController.updateUser
);

// Delete a specific user
router.delete(
  "/:userId",
  authenticateToken,
  verifyUser,
  UserController.deleteUser
);

module.exports = router;

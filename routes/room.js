const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/authMiddleware");
const {
  createRoom,
  getRooms,
  getRoom,
  updateRoomAvailability,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController.js");

// Create
router.post("/:hotelid", verifyAdmin, createRoom);

// Read (All)
router.get("/", getRooms);

// Read (One)
router.get("/:id", getRoom);

// Update Availability
router.put("/availability/:id", updateRoomAvailability);

// Update
router.put("/:id", verifyAdmin, updateRoom);

// Delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

module.exports = router;

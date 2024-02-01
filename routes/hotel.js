// hotelRoutes.js
const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/authMiddleware");
const {
  createHotel,
  getHotels,
  getHotel,
  countByCity,
  countByType,
  getHotelRooms,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController.js");

router.post("/", verifyAdmin, createHotel);
router.get("/", getHotels);
router.get("/:id", getHotel);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

router.get("/room/:id", getHotelRooms);
router.put("/:id", verifyAdmin, updateHotel);
router.delete("/:id", verifyAdmin, deleteHotel);

module.exports = router;

const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

// Create Room
exports.createRoom = async (req, res) => {
  try {
    const { hotelid } = req.params;
    const { title, price, maxPeople, description, roomNumbers } = req.body;

    const newRoom = await Room.create({
      hotelId: hotelid,
      title,
      price,
      maxPeople,
      description,
      roomNumbers,
    });

    await Hotel.findByIdAndUpdate(hotelid, {
      $push: { rooms: newRoom._id },
    });

    res.status(201).json({ success: true, data: newRoom });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Read (All) Rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json({ success: true, data: rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Read (One) Room
exports.getRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);

    if (room) {
      res.json({ success: true, data: room });
    } else {
      res.status(404).json({ success: false, message: "Room not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Room Availability
exports.updateRoomAvailability = async (req, res) => {
  try {
    const roomId = req.params.id;
    const { dates } = req.body;

    const result = await Room.updateOne(
      { "roomNumbers._id": roomId },
      { $push: { "roomNumbers.$.unavailableDates": { $each: dates } } }
    );

    if (result.nModified > 0) {
      res.status(200).json({
        success: true,
        message: "Room availability has been updated.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Room not found or availability not updated.",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Room
exports.updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (updatedRoom) {
      res.json({ success: true, data: updatedRoom });
    } else {
      res.status(404).json({ success: false, message: "Room not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Room
exports.deleteRoom = async (req, res) => {
  try {
    const { id, hotelid } = req.params;
    const deletedRoom = await Room.findByIdAndDelete(id);

    if (deletedRoom) {
      res.json({ success: true, message: "Room deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Room not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

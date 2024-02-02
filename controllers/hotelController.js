const Hotel = require("../models/Hotel");

exports.createHotel = async (req, res) => {
  try {
    const {
      name,
      type,
      city,
      address,
      distance,
      photos,
      title,
      description,
      rating,
      rooms,
      cheapestPrice,
      featured,
    } = req.body;

    const newHotel = await Hotel.create({
      name,
      type,
      city,
      address,
      distance,
      photos,
      title,
      description,
      rating,
      rooms,
      cheapestPrice,
      featured,
    });

    res.status(201).json({ success: true, data: newHotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate("rooms");
    res.json({ success: true, data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id).populate("rooms");

    if (hotel) {
      res.json({ success: true, data: hotel });
    } else {
      res.status(404).json({ success: false, message: "Hotel not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.countByCity = async (req, res, next) => {
  try {
    const cities = req.query.cities.split(",");
    const list = await Promise.all(
      cities.map(async (city) => {
        const count = await Hotel.countDocuments({ city: city });
        return { city, count };
      })
    );
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    next(error);
  }
};

exports.countByType = async (req, res, next) => {
  try {
    const types = ["hotel", "apartment", "resort", "villa", "cabin"];

    const typeCounts = await Promise.all(
      types.map(async (type) => {
        const count = await Hotel.countDocuments({ type });
        return { type, count };
      })
    );

    res.status(200).json({ success: true, data: typeCounts });
  } catch (error) {
    console.error("Error in countByType:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while counting by type.",
    });
  }
};

exports.getHotelRooms = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);

    if (hotel) {
      res.json({ success: true, data: hotel.rooms });
    } else {
      res.status(404).json({ success: false, message: "Hotel not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const updatedHotel = await Hotel.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (updatedHotel) {
      res.json({ success: true, data: updatedHotel });
    } else {
      res.status(404).json({ success: false, message: "Hotel not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHotel = await Hotel.findByIdAndDelete(id);

    if (deletedHotel) {
      res.json({ success: true, message: "Hotel deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Hotel not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

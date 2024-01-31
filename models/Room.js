// roomModel.js
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  roomNumbers: [
    {
      number: {
        type: Number,
        required: true,
      },
      unavailableDates: {
        type: [Date],
        default: [],
      },
    },
  ],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;

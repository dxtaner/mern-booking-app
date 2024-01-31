const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const hotelRoutes = require("./routes/hotel.js");
const roomRoutes = require("./routes/room.js");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("MongoDB bağlantısı başarılı.");
});

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

app.get("/test-error", (req, res, next) => {
  const err = new Error("Test error");
  err.status = 500;
  next(err);
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/hotel", hotelRoutes);
app.use("/room", roomRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

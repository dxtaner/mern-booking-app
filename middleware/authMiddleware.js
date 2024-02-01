const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Missing token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized: Token has expired" });
      } else {
        return res
          .status(403)
          .json({ success: false, message: "Forbidden: Invalid token" });
      }
    }

    req.user = user;
    next();
  });
}

function verifyUser(req, res, next) {
  authenticateToken(req, res, () => {
    if (req.user.userId === req.params.userId || req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: User is not authorized" });
    }
  });
}

function verifyAdmin(req, res, next) {
  authenticateToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: User is not an admin" });
    }
  });
}

module.exports = {
  authenticateToken,
  verifyUser,
  verifyAdmin,
};

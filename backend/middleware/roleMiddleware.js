// middleware/roleAuthMiddleware.js
const { StatusCodes } = require("http-status-codes");

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: "Access denied. Insufficient permissions." });
    }
    next();
  };
};

module.exports = authorizeRoles;

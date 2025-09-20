const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = {
      e_id: decoded.e_id,
      firstname: decoded.firstname,
      lastname: decoded.lastname,
      role: decoded.role,
      patientId: decoded.patient_id,
      doctorSpecialties: decoded.doctorSpecialties // Add doctor specialty to user object
    };
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
}

module.exports = authMiddleware;

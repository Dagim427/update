const express = require("express");
const router = express.Router();

// auth middleware
const authMiddleware = require("../middleware/authMiddleware");

// user controller import
const {
  login,
  checkUser,
  changePassword,
  verifyOtp,
  patientLogin,
  changePasswordPatient
} = require("../controller/userController");

// login routes
router.post("/login", login);
//  check user
router.get("/check", authMiddleware, checkUser);
// change password
router.post("/change-password/", authMiddleware, changePassword);
// verifyOtp routes
router.post("/verify-otp", verifyOtp)
router.post("/patient-login", patientLogin);
router.post("/patient-change-password", authMiddleware, changePasswordPatient);





module.exports = router;

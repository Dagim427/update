const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware")

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// clerk import controller
const {
  PatientRegisteration,
  generatePatientId,
  generateMRN,
  getAllPatients,
  importPatientFromExcel,
  viewPatientById,
  getPatientById,
  updatePatientById,
  resetPatientPassword
} = require("../controller/clerkController");

// Profile controller
const { getEmployeeProfile } = require("../controller/profileController");


router.use(authMiddleware);
router.use(authorizeRoles("clerk"));

// clerk routes patient registeration
router.post("/patient-Registeration", PatientRegisteration);
router.get("/patient-Registeration/generate-patient-id", generatePatientId);
router.get("/patient-Registeration/generate-MRN", generateMRN);
router.get("/patient-Registeration/get-all-patients", getAllPatients);
router.post("/import-patients", upload.single('file'), importPatientFromExcel);

router.get("/patient/:id", getPatientById);
router.put("/patient/:id", updatePatientById);
router.get("/patient/:id/view", viewPatientById);
router.put("/patient/:id/reset-password", resetPatientPassword);

// Clerk Profile Route
router.get("/profile", getEmployeeProfile);

module.exports = router;

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// triage room controller import
const {
  preTest,
  patientRegistered,
  getAllTriagePatients,
  viewPatientById,
  getPatientById,
  updatePreTestById
} = require("../controller/triageRoomController");

// Profile controller
const { getEmployeeProfile } = require("../controller/profileController");
// admin routes add employee

router.use(authMiddleware);
router.use(authorizeRoles("triage room"));

router.post("/pre-test", preTest);
router.get("/patient-registered", patientRegistered);
router.get("/get-all-triage-patient", getAllTriagePatients);
router.get("/pre-test/:id/view", viewPatientById);

router.get("/pre-test/:id", getPatientById);
router.put("/pre-test/:id/edit", updatePreTestById);

// Triage Room Profile Route
router.get("/profile", getEmployeeProfile);

module.exports = router;

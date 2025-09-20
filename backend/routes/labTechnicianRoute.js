const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  labResult,
  patientDoctorRegistered,
  getAllDoctorEvaluation,
  getAllLabRequest,
  viewLabRequestById,
  getLabRequestById,
  updateLabRequestById
} = require("../controller/labTechnicianController");

// Profile controller
const { getEmployeeProfile } = require("../controller/profileController");

router.use(authMiddleware);
router.use(authorizeRoles("lab technician"));

router.post("/send-lab-result", labResult);
router.get("/get-doctor-patient", patientDoctorRegistered);
router.get("/get-all-doctor-evaluation", getAllDoctorEvaluation);
router.get("/get-all-lab-request", getAllLabRequest);

router.get("/lab-request/:id/view", viewLabRequestById);
router.get("/lab-request/:id", getLabRequestById);
router.put("/lab-request/:id/edit", updateLabRequestById);

// Lab Technician Profile Route
router.get("/profile", getEmployeeProfile);

module.exports = router;

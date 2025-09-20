const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  doctorEvaluation,
  patientTriageRegistered,
  getAllDoctorEvaluation,
  patientLabRegistered,
  getLabResultByPatientId,
  labResultAndPrescripitonForm,
  getAllLabResultAndPrescription,
  viewDoctorEvaluationById,
  updateDoctorEvalutionById,
  getPatientById,
  viewLabResultAndPrescripitonById,
  getlabResultAndPrescripitonById,
  updateLabResultAndPrescripitonById,
  getDoctorProfile
} = require("../controller/doctorController");

router.use(authMiddleware);
router.use(authorizeRoles("doctor"));

router.post("/doctor-evaluation", doctorEvaluation);
router.get("/get-triage-patient", patientTriageRegistered);
router.get("/get-lab-patient", patientLabRegistered);
router.get("/get-all-doctor-evaluation", getAllDoctorEvaluation);
router.get("/lab-result/:patientId", getLabResultByPatientId);
router.post("/lab-result-and-prescripiton-form", labResultAndPrescripitonForm);
router.get(
  "/get-all-lab-result-and-prescription",
  getAllLabResultAndPrescription
);
router.get("/doctor-evaluation/:id/view", viewDoctorEvaluationById);
router.get("/doctor-evaluation/:id", getPatientById);
router.put("/doctor-evaluation/:id/edit", updateDoctorEvalutionById);

router.get("/lab-result-and-prescripiton/:id/view", viewLabResultAndPrescripitonById);
router.get("/lab-result-and-prescripiton/:id", getlabResultAndPrescripitonById);
router.put("/lab-result-and-prescripiton/:id/edit", updateLabResultAndPrescripitonById);

// Doctor Profile Route
router.get("/profile", getDoctorProfile);

module.exports = router;

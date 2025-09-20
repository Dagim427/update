const express = require("express");
const router = express.Router();

const {  prescriptionRead, medicalRecord} = require("../controller/patientController");

router.get("/prescription-read/:patientId", prescriptionRead);
router.get("/medical-record/:patientId", medicalRecord);

module.exports = router;
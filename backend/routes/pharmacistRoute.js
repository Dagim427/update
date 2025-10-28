const express = require("express");
const router = express.Router();

const { prescriptionRead, prescriptionpatientRegistered } = require("../controller/pharmacistController");

router.get("/prescription-read/:patientId", prescriptionRead);

router.get("/prescription-patient-registered", prescriptionpatientRegistered);



module.exports = router;

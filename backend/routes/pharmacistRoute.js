const express = require("express");
const router = express.Router();

const { prescriptionRead } = require("../controller/pharmacistController");

router.get("/prescription-read/:patientId", prescriptionRead);

module.exports = router;

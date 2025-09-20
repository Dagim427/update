const { StatusCodes } = require("http-status-codes");
const {
  prescriptionReadService,
} = require("../services/patient/prescriptionRead");
const { medicalRecordService } = require("../services/patient/medicalRecord");

async function prescriptionRead(req, res) {
  const { patientId } = req.params;

  if (!patientId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Patient ID is required" });
  }

  try {
    const prescriptions = await prescriptionReadService(patientId);
    if (prescriptions.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No prescriptions found for this patient" });
    }
    return res.status(StatusCodes.OK).json(prescriptions);
  } catch (error) {
    console.error("Error fetching prescriptions:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
}
async function medicalRecord(req, res) {
  const { patientId } = req.params;

  if (!patientId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Patient ID is required" });
  }

  try {
    const medicalRecord = await medicalRecordService(patientId);
    if (medicalRecord.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No medical record found for this patient" });
    }
    return res.status(StatusCodes.OK).json(medicalRecord);
  } catch (error) {
    console.error("Error fetching medical record:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
}

module.exports = { prescriptionRead, medicalRecord };

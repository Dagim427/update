const { StatusCodes } = require("http-status-codes");
const {
  prescriptionReadService,
  prescriptionpatientRegisteredService,
} = require("../services/pharmacist/prescriptionRead");

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

const prescriptionpatientRegistered = async (req, res) => {
  try {
    const registered = await prescriptionpatientRegisteredService();
    res.status(StatusCodes.OK).json({ registered });
  } catch (error) {
    console.error("Error fetching registered patients:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};
module.exports = { prescriptionRead, prescriptionpatientRegistered };

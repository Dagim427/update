const { StatusCodes } = require("http-status-codes");
const {
  sendLabResultService,
  patientDoctorRegisteredService,
  getAllDoctorEvalutionService,
} = require("../services/labTechnician/sendLabResultService");
const {
  getAllLabRequestService,
} = require("../services/labTechnician/viewLabRequest");
const {
  viewLabRequestByIdService,
  getLabRequestByIdService,
  updateLabRequestByIdService,
} = require("../services/labTechnician/labRequestById");
const labResult = async (req, res) => {
  const { patientId, labRequest, additonalNotes } = req.body;

  if (!patientId || !labRequest) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "All fields are required" });
  }

  try {
    await sendLabResultService(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "lab result completed" });
  } catch (error) {
    console.error("Error", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const patientDoctorRegistered = async (req, res) => {
  try {
    const registered = await patientDoctorRegisteredService();
    res.status(StatusCodes.OK).json({ registered });
  } catch (error) {
    console.error("Error fetching registered patients:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const getAllDoctorEvaluation = async (req, res) => {
  try {
    const patients = await getAllDoctorEvalutionService();
    res.status(StatusCodes.OK).json({ patients });
  } catch (error) {
    console.error("Error fetching patients:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const getAllLabRequest = async (req, res) => {
  const labRequest = await getAllLabRequestService();
  res.status(StatusCodes.OK).json({ labRequest });
};

const viewLabRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await viewLabRequestByIdService(id);
    res.status(StatusCodes.OK).json({ patient });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
  }
};

const getLabRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await getLabRequestByIdService(id);
    res.status(StatusCodes.OK).json({ patient });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
  }
};

const updateLabRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updateLabRequestByIdService(id, req.body);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
  }
};

module.exports = {
  labResult,
  patientDoctorRegistered,
  getAllDoctorEvaluation,
  getAllLabRequest,
  viewLabRequestById,
  updateLabRequestById,
  getLabRequestById,
};

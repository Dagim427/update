const { StatusCodes } = require("http-status-codes");
const {
  preTestService,
  patientRegisteredService,
  getAllTriagePatientService,
} = require("../services/triageRoom/preTestService");
const {
  viewPatientByIdService,getPatientByIdService,updatePreTestByIdService
} = require("../services/triageRoom/patientById");

const preTest = async (req, res) => {
  const {
    patientId,
    temperature,
    weight,
    blood_pressure,
    pulse_rate,
    respiratory_rate,
    blood_glucose_level,
    symptoms,
    durationOfSymptoms,
    painScale,
    levelOfConsciousness,
    PriorityLevel,
    referredTo,
    allergies,
    Initial_observations,
  } = req.body;

  if (
    !patientId ||
    !temperature ||
    !weight ||
    !blood_pressure ||
    !pulse_rate ||
    !respiratory_rate ||
    !blood_glucose_level ||
    !symptoms ||
    !durationOfSymptoms ||
    !painScale ||
    !levelOfConsciousness ||
    !PriorityLevel ||
    !referredTo ||
    !allergies
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "All fields are required" });
  }

  try {
    await preTestService(req.body);
    return res.status(StatusCodes.CREATED).json({ msg: "Triage completed" });
  } catch (error) {
    console.error("Error", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const patientRegistered = async (req, res) => {
  try {
    const registered = await patientRegisteredService();
    res.status(StatusCodes.OK).json({ registered });
  } catch (error) {
    console.error("Error fetching registered patients:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const getAllTriagePatients = async (req, res) => {
  try {
    const patients = await getAllTriagePatientService();
    res.status(StatusCodes.OK).json({ patients });
  } catch (error) {
    console.error("Error fetching patients:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const viewPatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await viewPatientByIdService(id);
    res.status(StatusCodes.OK).json({ patient });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
  }
};
const getPatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await getPatientByIdService(id);
    res.status(StatusCodes.OK).json({ patient });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
  }
};

const updatePreTestById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updatePreTestByIdService(id, req.body);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
  }
};
module.exports = {
  preTest,
  patientRegistered,
  getAllTriagePatients,
  viewPatientById,
  updatePreTestById,
  getPatientById
};

const { StatusCodes } = require("http-status-codes");

const { addPatientService } = require("../services/clerk/addPatient");
const {
  getAllPatientService,
} = require("../services/clerk/getAllPatientService");

const { handleExcelImport } = require("../services/clerk/importExcelService");

const { viewPatientByIdService, getPatientByIdService, updatePatientByIdService} = require("../services/clerk/patientById");
const { resetPasswordService } = require("../services/clerk/resetPatientPassword");

async function PatientRegisteration(req, res) {
  const {
    patientId,
    mrn,
    firstName,
    lastName,
    dob,
    sex,
    email,
    city,
    phoneNumber,
  } = req.body;

  if (
    !patientId ||
    !mrn ||
    !firstName ||
    !lastName ||
    !dob ||
    !sex ||
    !city ||
    !phoneNumber
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "All fields are required" });
  }

  try {
    await addPatientService(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Patient added successfully" });
  } catch (error) {
    const message = error.message;
    if (message.includes("already added")) {
      return res.status(StatusCodes.CONFLICT).json({ msg: message });
    } else if (message.includes("Password")) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: message });
    } else {
      console.log("Internal error:", message);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Internal server error" });
    }
  }
}

async function generatePatientId(req, res) {
  const prefix = "MFPH";
  const suffix = new Date().getFullYear().toString().slice(-2);

  const randomNumber = Math.floor(Math.random() * 1000000); // 0 to 999999
  const paddedNumber = String(randomNumber).padStart(6, "0");

  const patientId = `${prefix}-${paddedNumber}-${suffix}`;
  res.status(StatusCodes.OK).json({ patientId });
}

async function generateMRN(req, res) {
  const prefix = "MRN";
  const randomNumber = Math.floor(Math.random() * 1000000);
  const paddedNumber = String(randomNumber).padStart(6, "0");

  const MRN = `${prefix}-${paddedNumber}`;
  res.status(StatusCodes.OK).json({ MRN });
}

const getAllPatients = async (req, res) => {
  try {
    const patients = await getAllPatientService();
    res.status(StatusCodes.OK).json({ patients });
  } catch (error) {
    console.error("Error fetching patients:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const importPatientFromExcel = async (req, res) => {
  try {
    const buffer = req.file.buffer;

    const results = await handleExcelImport(buffer);

    return res.status(201).json({
      message: "Patient imported successfully",
      results,
    });
  } catch (err) {
    console.error("Import error:", err);
    return res.status(500).json({ error: err.message });
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

const updatePatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updatePatientByIdService(id, req.body);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
  }
};

const resetPatientPassword = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await resetPasswordService(id);
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(500).json({ error: "Failed to reset password" });
  }
};

module.exports = {
  PatientRegisteration,
  generatePatientId,
  generateMRN,
  getAllPatients,
  importPatientFromExcel,
  viewPatientById,
  getPatientById,
  updatePatientById,
  resetPatientPassword
};

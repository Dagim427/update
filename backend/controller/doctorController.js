const { StatusCodes } = require("http-status-codes");
const dbconnection = require("../db/dbConfig");
const {
  doctorEvaluationService,
  patientTriageRegisteredService,
  patientTriageBySpecialtyService,
  getAllDoctorEvalutionService,
  getAllLabResultAndPrescriptionService,
  patientLabRegisteredService,
} = require("../services/doctor/doctorEvaluationService");

const { getDoctorProfileService } = require("../services/doctor/doctorProfileService");
const {
  viewDoctorEvaluationByIdService,
  updateDoctorEvalutionByIdService,
  getPatientByIdService
} = require("../services/doctor/doctorEvaluationById");

const {
  viewLabResultAndPrescripitonByIdService,
  updateLabResultAndPrescripitonByIdService,
  getlabResultAndPrescripitonByIdService
} = require("../services/doctor/labResultAndPrescripitonById");
const doctorEvaluation = async (req, res) => {
  const { patientId, hpi, physicalExam, labRequest } = req.body;

  if (!patientId || !hpi || !physicalExam || !labRequest) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "All fields are required" });
  }

  try {
    await doctorEvaluationService(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "doctor evaluation completed" });
  } catch (error) {
    console.error("Error", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const patientTriageRegistered = async (req, res) => {
  try {
    // Get doctor's specialty from JWT token
    const doctorSpecialty = req.user.doctorSpecialties;

    let registered;
    if (doctorSpecialty) {
      // Filter patients by doctor's specialty
      registered = await patientTriageBySpecialtyService(doctorSpecialty);
    } else {
      // Fallback to all patients if no specialty (for admin or other roles)
      registered = await patientTriageRegisteredService();
    }

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

const patientLabRegistered = async (req, res) => {
  try {
    // Get doctor's specialty from JWT token
    const doctorSpecialty = req.user.doctorSpecialties;

    let registered;
    if (doctorSpecialty) {
      // Filter patients by doctor's specialty
      registered = await patientLabRegisteredService(doctorSpecialty);
    } else {
      // Fallback to all patients if no specialty (for admin or other roles)
      registered = await patientLabRegisteredService("General");
    }

    res.status(StatusCodes.OK).json({ registered });
  } catch (error) {
    console.error("Error fetching registered patients:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const getLabResultByPatientId = async (req, res) => {
  const { patientId } = req.params;

  try {
    const [rows] = await dbconnection.query(
      "SELECT lab_result FROM lab WHERE patient_id = ? ",
      [patientId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ msg: "Lab result not found" });
    }

    res.status(200).json({ labResult: rows[0].lab_result });
  } catch (error) {
    console.error("Error fetching lab result:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

const labResultAndPrescripitonForm = async (req, res) => {
  const { patientId, diagnosis, advice, medications } = req.body;
  const doctorId = req.user.e_id; // Get doctor ID from JWT token

  if (!patientId || !diagnosis || !Array.isArray(medications)) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Convert medications array into a JSON string
    const medicationsText = JSON.stringify(medications);

    // Check if prescription already exists for this patient
    const [existingRows] = await dbconnection.query(
      "SELECT lp_id FROM lab_result_and_prescripiton WHERE patient_id = ?",
      [patientId]
    );

    if (existingRows.length > 0) {
      // Update existing prescription
      await dbconnection.query(
        `UPDATE lab_result_and_prescripiton 
         SET diagnosis = ?, medication = ?, advice = ?, doctor_id = ?, created_at = CURRENT_TIMESTAMP
         WHERE patient_id = ?`,
        [diagnosis, medicationsText, advice, doctorId, patientId]
      );
    } else {
      // Insert new prescription
      await dbconnection.query(
        `INSERT INTO lab_result_and_prescripiton (patient_id, diagnosis, medication, advice, doctor_id)
         VALUES (?, ?, ?, ?, ?)`,
        [patientId, diagnosis, medicationsText, advice, doctorId]
      );
    }

    // Update patient status
    const updateSql = `UPDATE patient_info SET current_status = 'doctor finish completed' WHERE patient_id = ?`;
    await dbconnection.query(updateSql, [patientId]);

    res.status(201).json({ msg: "Lab prescription saved successfully." });
  } catch (error) {
    console.error("Error inserting into lab_result_and_prescripiton:", error.message);
    res
      .status(500)
      .json({ msg: "Server error while saving lab prescription." });
  }
};
const getAllLabResultAndPrescription = async (req, res) => {
  try {
    const patients = await getAllLabResultAndPrescriptionService();
    res.status(StatusCodes.OK).json({ patients });
  } catch (error) {
    console.error("Error fetching patients:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const viewDoctorEvaluationById = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await viewDoctorEvaluationByIdService(id);
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

const updateDoctorEvalutionById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updateDoctorEvalutionByIdService(id, req.body);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
  }
};

const viewLabResultAndPrescripitonById = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await viewLabResultAndPrescripitonByIdService(id);
    res.status(StatusCodes.OK).json({ patient });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
  }
};


const getlabResultAndPrescripitonById = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await getlabResultAndPrescripitonByIdService(id);
    res.status(StatusCodes.OK).json({ patient });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
  }
};

const updateLabResultAndPrescripitonById = async (req, res) => {
  const { id } = req.params;
  const doctorId = req.user.e_id; // Get doctor ID from JWT token

  try {
    const result = await updateLabResultAndPrescripitonByIdService(id, { ...req.body, doctorId });
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
  }
};

const getDoctorProfile = async (req, res) => {
  try {
    const { e_id } = req.user;
    const profile = await getDoctorProfileService(e_id);
    res.status(StatusCodes.OK).json({ profile });
  } catch (error) {
    console.error("Error fetching doctor profile:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

module.exports = {
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
  updateLabResultAndPrescripitonById,
  getlabResultAndPrescripitonById,
  viewLabResultAndPrescripitonById,
  getDoctorProfile
};

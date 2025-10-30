const dbconnection = require("../../db/dbConfig");

const sendLabResultService = async (data) => {
  const { patientId, labRequest, additonalNotes } = data;

  try {
    const sql = `INSERT INTO lab (patient_id, lab_result ,additional_notes) 
               VALUES (?, ?, ?)`;

    await dbconnection.query(sql, [
      patientId.trim(),
      labRequest,
      additonalNotes
    ]);

    const updateSql = `UPDATE patient_info SET current_status = 'lab result completed' WHERE patient_id = ?`;
    await dbconnection.query(updateSql, [patientId]);
  } catch (error) {
    console.error("Database error in lab result :", error);
    throw error;
  }
};

const patientDoctorRegisteredService = async () => {
  const [rows] = await dbconnection.query(
    `SELECT 
  pi.patient_id, 
  pi.mrn, 
  pi.first_name, 
  pi.last_name, 
  DATE_FORMAT(pi.dob, '%Y-%m-%d') AS dob, 
  pi.sex, 
  pi.current_status, 
  vs.temperature, 
  vs.weight, 
  vs.blood_pressure, 
  vs.pulse_rate, 
  vs.respiratory_rate, 
  vs.blood_glucose_level, 
  de.lab_request,
  de.hpi,
  de.physical_exam
FROM patient_info pi
LEFT JOIN doctor_evalution de ON pi.patient_id = de.patient_id
LEFT JOIN vital_signs vs ON pi.patient_id = vs.patient_id
WHERE pi.current_status = 'doctor evaluation completed';
`
  );
  return rows;
};

const getAllDoctorEvalutionService = async () => {
  const [rows] = await dbconnection.query(
    "SELECT patient_info.patient_id,    patient_info.first_name,     patient_info.last_name,     DATE_FORMAT(patient_info.dob, '%Y-%m-%d') AS dob,    patient_info.sex,   doctor_evalution.hpi, doctor_evalution.physical_exam, doctor_evalution.lab_request FROM patient_info JOIN doctor_evalution ON patient_info.patient_id = doctor_evalution.patient_id"
  );
  return rows;
};

module.exports = {
  sendLabResultService,
  patientDoctorRegisteredService,
  getAllDoctorEvalutionService,
};

const dbconnection = require("../../db/dbConfig");

const preTestService = async (data) => {
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
  } = data;

  try {
    // Insert pre-test data into the database
    const sql = `INSERT INTO vital_signs (patient_id, temperature, weight, blood_pressure, pulse_rate, respiratory_rate, blood_glucose_level) 
               VALUES (?, ?, ?, ?, ?, ?,?)`;

    const sql2 = `INSERT INTO symptoms ( symptoms, duration_of_symptoms, pain_scale, vs_id) 
               VALUES (?, ?, ?, ?)`;
    const sql3 = `INSERT INTO triage_assessment ( level_of_consciousness, Priority_level, referred_to, sy_id) 
               VALUES (?, ?, ?, ?)`;

    const sql4 = `INSERT INTO triage_initial_observations ( allergies, Initial_observations, ta_id) 
               VALUES (?, ?, ?)`;

    const [vitalResult] = await dbconnection.query(sql, [
      patientId.trim(),
      temperature,
      weight,
      blood_pressure,
      pulse_rate,
      respiratory_rate,
      blood_glucose_level,
    ]);

    const vsId = vitalResult.insertId;

    const [symptomsResult] = await dbconnection.query(sql2, [
      symptoms,
      durationOfSymptoms,
      painScale,
      vsId,
    ]);

    const syId = symptomsResult.insertId;

    const [triageAssessmentResult] = await dbconnection.query(sql3, [
      levelOfConsciousness,
      PriorityLevel,
      referredTo,
      syId,
    ]);

    const taId = triageAssessmentResult.insertId;
    await dbconnection.query(sql4, [allergies, Initial_observations, taId]);

    // Update patient status to 'pre-test completed'
    const updateSql = `UPDATE patient_info SET current_status = 'triaged completed' WHERE patient_id = ?`;
    await dbconnection.query(updateSql, [patientId]);
  } catch (error) {
    console.error("Database error in preTestService:", error);
    throw error;
  }
};

const patientRegisteredService = async () => {
  const [rows] = await dbconnection.query(
    `SELECT patient_id, mrn, first_name, last_name, DATE_FORMAT(dob, '%Y-%m-%d') AS dob, sex, current_status
     FROM patient_info WHERE current_status = 'registered'`
  );
  return rows;
};

const getAllTriagePatientService = async () => {
  const [rows] = await dbconnection.query(
    "SELECT patient_info.patient_id,    patient_info.first_name,     patient_info.last_name,     DATE_FORMAT(patient_info.dob, '%Y-%m-%d') AS dob,    patient_info.sex,     vital_signs.temperature, vital_signs.weight, vital_signs.blood_pressure FROM patient_info JOIN vital_signs ON patient_info.patient_id = vital_signs.patient_id"
  );
  return rows;
};

module.exports = {
  preTestService,
  patientRegisteredService,
  getAllTriagePatientService,
};

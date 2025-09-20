const dbconnection = require("../../db/dbConfig");

const doctorEvaluationService = async (data) => {
  const { patientId, hpi, physicalExam, labRequest } = data;

  try {
    const sql = `INSERT INTO doctor_evalution (patient_id, hpi, physical_exam, lab_request) 
               VALUES (?, ?, ?, ?)`;

    await dbconnection.query(sql, [
      patientId.trim(),
      hpi,
      physicalExam,
      labRequest,
    ]);

    const updateSql = `UPDATE patient_info SET current_status = 'doctor evaluation completed' WHERE patient_id = ?`;
    await dbconnection.query(updateSql, [patientId]);
  } catch (error) {
    console.error("Database error in doctor evaluation:", error);
    throw error;
  }
};

const patientTriageRegisteredService = async () => {
  const [rows] = await dbconnection.query(
    `SELECT 
  patient_info.patient_id, 
  patient_info.mrn, 
  patient_info.first_name, 
  patient_info.last_name, 
  DATE_FORMAT(patient_info.dob, '%Y-%m-%d') AS dob, 
  patient_info.sex, 
  patient_info.current_status, 
  vital_signs.temperature, 
  vital_signs.weight, 
  vital_signs.blood_pressure, 
  vital_signs.pulse_rate, 
  vital_signs.respiratory_rate, 
  vital_signs.blood_glucose_level, 
  symptoms.symptoms, 
  symptoms.duration_of_symptoms, 
  symptoms.pain_scale, 
  triage_initial_observations.allergies, 
  triage_initial_observations.Initial_observations
FROM 
  patient_info
JOIN vital_signs ON patient_info.patient_id = vital_signs.patient_id
JOIN symptoms ON vital_signs.vs_id = symptoms.vs_id
JOIN triage_assessment ON symptoms.sy_id = triage_assessment.sy_id
JOIN triage_initial_observations ON triage_assessment.ta_id = triage_initial_observations.ta_id
WHERE 
  patient_info.current_status = 'triaged completed';
`
  );
  return rows;
};

// New service to get patients by doctor specialty
const patientTriageBySpecialtyService = async (doctorSpecialty) => {
  const [rows] = await dbconnection.query(
    `SELECT 
  patient_info.patient_id, 
  patient_info.mrn, 
  patient_info.first_name, 
  patient_info.last_name, 
  DATE_FORMAT(patient_info.dob, '%Y-%m-%d') AS dob, 
  patient_info.sex, 
  patient_info.current_status, 
  vital_signs.temperature, 
  vital_signs.weight, 
  vital_signs.blood_pressure, 
  vital_signs.pulse_rate, 
  vital_signs.respiratory_rate, 
  vital_signs.blood_glucose_level, 
  symptoms.symptoms, 
  symptoms.duration_of_symptoms, 
  symptoms.pain_scale, 
  triage_initial_observations.allergies, 
  triage_initial_observations.Initial_observations,
  triage_assessment.referred_to
FROM 
  patient_info
JOIN vital_signs ON patient_info.patient_id = vital_signs.patient_id
JOIN symptoms ON vital_signs.vs_id = symptoms.vs_id
JOIN triage_assessment ON symptoms.sy_id = triage_assessment.sy_id
JOIN triage_initial_observations ON triage_assessment.ta_id = triage_initial_observations.ta_id
WHERE 
  patient_info.current_status = 'triaged completed'
  AND triage_assessment.referred_to = ?;
`,
    [doctorSpecialty]
  );
  return rows;
};

const getAllDoctorEvalutionService = async () => {
  const [rows] = await dbconnection.query(
    "SELECT patient_info.patient_id,    patient_info.first_name,     patient_info.last_name,     DATE_FORMAT(patient_info.dob, '%Y-%m-%d') AS dob,    patient_info.sex,   doctor_evalution.hpi, doctor_evalution.physical_exam, doctor_evalution.lab_request FROM patient_info JOIN doctor_evalution ON patient_info.patient_id = doctor_evalution.patient_id"
  );
  return rows;
};

const labResultAndPrescripitonService = async (data) => {
  const { patientId, diagnosis, medication, advice, doctorId } = data;

  try {
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
        [diagnosis, medication, advice, doctorId, patientId]
      );
    } else {
      // Insert new prescription
      const sql = `INSERT INTO lab_result_and_prescripiton (patient_id, diagnosis, medication, advice, doctor_id) 
                   VALUES (?, ?, ?, ?, ?)`;

      await dbconnection.query(sql, [
        patientId.trim(),
        diagnosis,
        medication,
        advice,
        doctorId,
      ]);
    }

    const updateSql = `UPDATE patient_info SET current_status = 'doctor finish completed' WHERE patient_id = ?`;
    await dbconnection.query(updateSql, [patientId]);
  } catch (error) {
    console.error("Database error in lab_result_and_prescripiton", error);
    throw error;
  }
};
const patientLabRegisteredService = async (doctorSpecialty) => {
  const [rows] = await dbconnection.query(
    `SELECT 
  patient_info.patient_id, 
  patient_info.mrn, 
  patient_info.first_name, 
  patient_info.last_name, 
  DATE_FORMAT(patient_info.dob, '%Y-%m-%d') AS dob, 
  patient_info.sex, 
  patient_info.current_status, 
  vital_signs.temperature, 
  vital_signs.weight, 
  vital_signs.blood_pressure, 
  vital_signs.pulse_rate, 
  vital_signs.respiratory_rate, 
  vital_signs.blood_glucose_level, 
  symptoms.symptoms, 
  symptoms.duration_of_symptoms, 
  symptoms.pain_scale, 
  triage_initial_observations.allergies, 
  triage_initial_observations.Initial_observations,
  triage_assessment.referred_to
FROM 
  patient_info
JOIN vital_signs ON patient_info.patient_id = vital_signs.patient_id
JOIN symptoms ON vital_signs.vs_id = symptoms.vs_id
JOIN triage_assessment ON symptoms.sy_id = triage_assessment.sy_id
JOIN triage_initial_observations ON triage_assessment.ta_id = triage_initial_observations.ta_id
WHERE 
  patient_info.current_status = 'lab result completed'
  AND triage_assessment.referred_to = ?;
`,
    [doctorSpecialty]
  );
  return rows;
};

const getAllLabResultAndPrescriptionService = async () => {
  const [rows] = await dbconnection.query(
    "SELECT patient_info.patient_id,    patient_info.first_name,     patient_info.last_name,     DATE_FORMAT(patient_info.dob, '%Y-%m-%d') AS dob,    patient_info.sex,   lab_result_and_prescripiton.diagnosis, lab_result_and_prescripiton.medication, lab_result_and_prescripiton.advice FROM patient_info JOIN lab_result_and_prescripiton ON patient_info.patient_id = lab_result_and_prescripiton.patient_id"
  );
  return rows;
};

module.exports = {
  doctorEvaluationService,
  patientTriageRegisteredService,
  patientTriageBySpecialtyService,
  getAllDoctorEvalutionService,
  labResultAndPrescripitonService,
  patientLabRegisteredService,
  getAllLabResultAndPrescriptionService,
};

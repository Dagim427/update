const dbconnection = require("../../db/dbConfig");

const medicalRecordService = async (patientId) => {
  const [rows] = await dbconnection.query(
    `SELECT 
        pi.*, pa.*,vs.*,s.*, lab.*,lrap.*,
        e.First_name as doctor_first_name,
        e.Last_name as doctor_last_name,
        e.doctorSpecialties as doctor_specialty,
        ta.referred_to as department_specialty
     FROM patient_info AS pi
     JOIN patient_address AS pa
       ON pi.patient_id = pa.patient_id 
     JOIN lab_result_and_prescripiton AS lrap
       ON pi.patient_id = lrap.patient_id
     LEFT JOIN employee AS e
       ON lrap.doctor_id = e.E_ID
     JOIN vital_signs AS vs
       ON pi.patient_id = vs.patient_id
     JOIN symptoms AS s
       ON vs.vs_id = s.vs_id
     JOIN triage_assessment AS ta
       ON s.sy_id = ta.sy_id
     JOIN lab 
       ON pi.patient_id = lab.patient_id
     WHERE pi.patient_id = ?`,
    [patientId]
  );
  return rows;
};

module.exports = { medicalRecordService };

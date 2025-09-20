const dbconnection = require("../../db/dbConfig");

const prescriptionReadService = async (patientId) => {
  const [rows] = await dbconnection.query(
    `SELECT 
        patient_info.patient_id,  
        patient_info.mrn,  
        patient_info.first_name,     
        patient_info.last_name,     
        DATE_FORMAT(patient_info.dob, '%Y-%m-%d') AS dob,    
        patient_info.sex,     
        patient_address.email,
        patient_address.city,     
        patient_address.phone_number,
        lab_result_and_prescripiton.medication,
        lab_result_and_prescripiton.diagnosis,
        lab_result_and_prescripiton.advice,
        e.First_name as doctor_first_name,
        e.Last_name as doctor_last_name,
        e.doctorSpecialties as doctor_specialty,
        ta.referred_to as department_specialty,
        DATE_FORMAT(lab_result_and_prescripiton.created_at, '%Y-%m-%d %h:%i %p') as prescription_date
     FROM patient_info 
     JOIN patient_address 
       ON patient_info.patient_id = patient_address.patient_id 
     LEFT JOIN lab_result_and_prescripiton
       ON patient_info.patient_id = lab_result_and_prescripiton.patient_id
     LEFT JOIN employee AS e
       ON lab_result_and_prescripiton.doctor_id = e.E_ID
     LEFT JOIN vital_signs AS vs
       ON patient_info.patient_id = vs.patient_id
     LEFT JOIN symptoms AS s
       ON vs.vs_id = s.vs_id
     LEFT JOIN triage_assessment AS ta
       ON s.sy_id = ta.sy_id
     WHERE patient_info.patient_id = ?`,
    [patientId]
  );
  return rows;
};

module.exports = { prescriptionReadService };

const dbconnection = require("../../db/dbConfig");

const getAllPatientService = async () => {
  const [rows] = await dbconnection.query(
    "SELECT patient_info.patient_id,    patient_info.first_name,     patient_info.last_name,     DATE_FORMAT(patient_info.dob, '%Y-%m-%d') AS dob,    patient_info.sex,     patient_address.email,patient_address.city,     patient_address.phone_number FROM patient_info JOIN patient_address ON patient_info.patient_id = patient_address.patient_id"
  );
  return rows;
};

module.exports = { getAllPatientService };

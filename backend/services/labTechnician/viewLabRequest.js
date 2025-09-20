const dbconnection = require("../../db/dbConfig");

const getAllLabRequestService = async () => {
  const [rows] = await dbconnection.query(
    "SELECT patient_info.patient_id,    patient_info.first_name,     patient_info.last_name,     DATE_FORMAT(patient_info.dob, '%Y-%m-%d') AS dob,    patient_info.sex,     lab.lab_result, lab.additional_notes FROM patient_info JOIN lab ON patient_info.patient_id = lab.patient_id"
  );
  return rows;
};

module.exports = { getAllLabRequestService };

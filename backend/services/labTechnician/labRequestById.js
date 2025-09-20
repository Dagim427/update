const dbconnection = require("../../db/dbConfig");

const getLabRequestByIdService = async (id) => {
  const [results] = await dbconnection.query(
    "SELECT pi.patient_id,  pi.mrn,  pi.first_name,  pi.last_name,  DATE_FORMAT(pi.dob, '%Y-%m-%d') AS dob,  pi.sex,  pi.current_status,  vs.temperature,  vs.weight,  vs.blood_pressure,  vs.pulse_rate,  vs.respiratory_rate,  vs.blood_glucose_level,  de.lab_request,lab.lab_result, lab.additional_notes FROM patient_info pi JOIN doctor_evalution de ON pi.patient_id = de.patient_id JOIN lab ON pi.patient_id = lab.patient_id JOIN vital_signs vs ON pi.patient_id = vs.patient_id WHERE pi.patient_id = ?",
    [id]
  );

  if (results.length === 0) {
    throw new Error("patient not found");
  }

  return results[0];
};

// Update patient by ID using async/await
const updateLabRequestByIdService = async (id, data) => {
  const { lab_result, additional_notes } = data;

  const conn = await dbconnection.getConnection(); // use a transaction-safe connection
  try {
    await conn.beginTransaction();

    const [infoResult] = await conn.query(
      `UPDATE lab SET lab_result = ?, additional_notes = ?
       WHERE patient_id = ?`,
      [lab_result, additional_notes, id]
    );

    await conn.commit();

    // check if at least one row was affected in either table
    if (infoResult.affectedRows === 0) {
      throw new Error("Patient not found or nothing changed");
    }

    return { msg: "Patient updated successfully" };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

const viewLabRequestByIdService = async (id) => {
  const [results] = await dbconnection.query(
    "SELECT patient_info.patient_id, patient_info.mrn,   patient_info.first_name,     patient_info.last_name,     DATE_FORMAT(patient_info.dob, '%Y-%m-%d') AS dob,    patient_info.sex,     lab.lab_result, lab.additional_notes,vs.temperature, vs.weight, vs.blood_pressure, vs.pulse_rate, vs.respiratory_rate, vs.blood_glucose_level, de.lab_request FROM patient_info JOIN lab ON patient_info.patient_id = lab.patient_id JOIN doctor_evalution de ON patient_info.patient_id = de.patient_id JOIN vital_signs vs ON patient_info.patient_id = vs.patient_id",
    [id]
  );

  if (results.length === 0) {
    throw new Error("Patient not found");
  }

  return results[0];
};

module.exports = {
  viewLabRequestByIdService,
  getLabRequestByIdService,
  updateLabRequestByIdService,
};

const dbconnection = require("../../db/dbConfig");

const viewPatientByIdService = async (id) => {
  const [results] = await dbconnection.query(
    `SELECT 
      pi.*, pa.*, vs.*, s.*
     FROM patient_info pi 
     JOIN patient_address pa ON pi.patient_id = pa.patient_id 
     JOIN vital_signs vs ON pi.patient_id = vs.patient_id 
     JOIN symptoms s ON vs.vs_id = s.vs_id 
     WHERE pi.patient_id = ?`,
    [id]
  );

  if (results.length === 0) {
    throw new Error("patient not found");
  }

  return results[0];
};

// Update patient by ID using async/await
const updatePreTestByIdService = async (id, data) => {
  const {
    temperature,
    weight,
    blood_pressure,
    pulse_rate,
    respiratory_rate,
    blood_glucose_level,
  } = data;

  const conn = await dbconnection.getConnection(); // use a transaction-safe connection
  try {
    await conn.beginTransaction();

    const [vitalSign] = await conn.query(
      `UPDATE vital_signs 
       SET temperature = ?, weight = ?, blood_pressure = ?, pulse_rate = ?,   respiratory_rate = ?, blood_glucose_level = ? WHERE patient_id = ?`,
      [
        temperature,
        weight,
        blood_pressure,
        pulse_rate,
        respiratory_rate,
        blood_glucose_level,
        id,
      ]
    );

    await conn.commit();

    // check if at least one row was affected in either table
    if (vitalSign.affectedRows === 0) {
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

const getPatientByIdService = async (id) => {
  const [results] = await dbconnection.query(
    `SELECT 
      pi.*, pa.*, vs.*, s.*
     FROM patient_info pi 
     JOIN patient_address pa ON pi.patient_id = pa.patient_id 
     JOIN vital_signs vs ON pi.patient_id = vs.patient_id 
     JOIN symptoms s ON vs.vs_id = s.vs_id 
     WHERE pi.patient_id = ?`,
    [id]
  );

  if (results.length === 0) {
    throw new Error("Patient not found");
  }

  return results[0];
};

module.exports = {
  viewPatientByIdService,
  getPatientByIdService,
  updatePreTestByIdService,
};

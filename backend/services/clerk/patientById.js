const dbconnection = require("../../db/dbConfig");

const getPatientByIdService = async (id) => {
  const [results] = await dbconnection.query(
    "SELECT pi.patient_id, pi.mrn, pi.first_name, pi.last_name, DATE_FORMAT(pi.dob, '%Y-%m-%d') AS dob, pi.sex, pa.* FROM patient_info pi JOIN patient_address pa ON pi.patient_id = pa.patient_id WHERE pi.patient_id = ?",
    [id]
  );

  if (results.length === 0) {
    throw new Error("patient not found");
  }

  return results[0];
};

// Update patient by ID using async/await
const updatePatientByIdService = async (id, data) => {
  const { first_name, last_name, dob, sex, city, phone_number, email } = data;

  const conn = await dbconnection.getConnection(); // use a transaction-safe connection
  try {
    await conn.beginTransaction();

    const [infoResult] = await conn.query(
      `UPDATE patient_info 
       SET first_name = ?, last_name = ?, dob = ?, sex = ? 
       WHERE patient_id = ?`,
      [first_name, last_name, dob, sex, id]
    );

    const [addressResult] = await conn.query(
      `UPDATE patient_address 
       SET city = ?, phone_number = ?, email = ? 
       WHERE patient_id = ?`,
      [city, phone_number, email, id]
    );

    await conn.commit();

    // check if at least one row was affected in either table
    if (infoResult.affectedRows === 0 && addressResult.affectedRows === 0) {
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


const viewPatientByIdService = async (id) => {
  const [results] = await dbconnection.query(
    "SELECT pi.patient_id, pi.mrn, pi.first_name, pi.last_name, DATE_FORMAT(pi.dob, '%Y-%m-%d') AS dob, pi.sex, pa.* FROM patient_info pi JOIN patient_address pa ON pi.patient_id = pa.patient_id WHERE pi.patient_id = ?",
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
  updatePatientByIdService,
};

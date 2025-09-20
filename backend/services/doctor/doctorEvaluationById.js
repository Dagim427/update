const dbconnection = require("../../db/dbConfig");

const getPatientByIdService = async (id) => {
  const [results] = await dbconnection.query(
    "SELECT * from doctor_evalution WHERE patient_id = ?",
    [id]
  );

  if (results.length === 0) {
    throw new Error("patient not found");
  }

  return results[0];
};

// Update patient by ID using async/await
const updateDoctorEvalutionByIdService = async (id, data) => {
  const { hpi, physical_exam } = data;

  const conn = await dbconnection.getConnection(); // use a transaction-safe connection
  try {
    await conn.beginTransaction();

    const [infoResult] = await conn.query(
      `UPDATE doctor_evalution 
       SET hpi = ?, physical_exam = ?
       WHERE patient_id = ?`,
      [hpi, physical_exam, id]
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

const viewDoctorEvaluationByIdService = async (id) => {
  const [results] = await dbconnection.query(
    "SELECT pi.patient_id, pi.mrn, pi.first_name, pi.last_name, DATE_FORMAT(pi.dob, '%Y-%m-%d') AS dob, pi.sex, pa.*, vs.*, s.*, ta.*,de.* FROM patient_info pi JOIN patient_address pa ON pi.patient_id = pa.patient_id JOIN vital_signs vs ON pi.patient_id = vs.patient_id JOIN symptoms s ON vs.vs_id = s.vs_id JOIN triage_assessment ta ON s.sy_id = ta.sy_id join doctor_evalution de on pi.patient_id = de.patient_id WHERE pi.patient_id = ?",
    [id]
  );

  if (results.length === 0) {
    throw new Error("Patient not found");
  }

  return results[0];
};

module.exports = {
  viewDoctorEvaluationByIdService,
  getPatientByIdService,
  updateDoctorEvalutionByIdService,
};

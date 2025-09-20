const dbconnection = require("../../db/dbConfig");
const bcryptjs = require("bcryptjs");

const resetPasswordService = async (patientId) => {
  const defaultPassword = "motite@123";
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(defaultPassword, salt);

  const conn = await dbconnection.getConnection(); // use a transaction-safe connection
  try {
    await conn.beginTransaction();

    const [infoResult] = await conn.query(
      `UPDATE patient_info 
       SET is_first_login = 1 
       WHERE patient_id = ?`,
      [patientId]
    );

    const [addressResult] = await conn.query(
      `UPDATE patient_address 
       SET password = ?
       WHERE patient_id = ?`,
      [hashedPassword, patientId]
    );

    await conn.commit();
    if (infoResult.affectedRows === 0 && addressResult.affectedRows === 0) {
      throw new Error("Patient not found or nothing changed");
    }

    return "Password reset to default: motite@123";
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

module.exports = { resetPasswordService };

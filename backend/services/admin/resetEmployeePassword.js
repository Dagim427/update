const dbconnection = require("../../db/dbConfig");
const bcryptjs = require("bcryptjs");

const resetPasswordService = async (employeeId) => {
  const defaultPassword = "motite@123";
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(defaultPassword, salt);

  const [result] = await dbconnection.query(
    "UPDATE employee SET PASSWORD = ?, is_first_login = 1 WHERE E_ID = ?" ,
    [hashedPassword, employeeId]
  );

  if (result.affectedRows === 0) {
    throw new Error("Employee not found or password not updated");
  }

  return "Password reset to default: motite@123";
};

module.exports = { resetPasswordService };

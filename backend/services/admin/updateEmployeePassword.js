const dbconnection = require("../../db/dbConfig");
const bcrypt = require("bcryptjs");

async function updateEmployeePassword(employeeId, currentPassword, newPassword) {
  // 1. Fetch current user
  const [rows] = await dbconnection.query(
    "SELECT PASSWORD FROM employee WHERE E_ID = ?",
    [employeeId]
  );

  if (rows.length === 0) {
    const err = new Error("Employee not found");
    err.status = 404;
    throw err;
  }

  const hashedPassword = rows[0].PASSWORD;

  // 2. Check current password match
  const isMatch = await bcrypt.compare(currentPassword, hashedPassword);
  if (!isMatch) {
    const err = new Error("Current password is incorrect");
    err.status = 401;
    throw err;
  }

  // 3. Validate new password (optional)
  if (newPassword.length < 6) {
    const err = new Error("New password must be at least 6 characters");
    err.status = 400;
    throw err;
  }

  // 4. Hash and update new password
  const salt = await bcrypt.genSalt(10);
  const newHashedPassword = await bcrypt.hash(newPassword, salt);

  await dbconnection.query(
    "UPDATE employee SET PASSWORD = ? WHERE E_ID = ?",
    [newHashedPassword, employeeId]
  );

  return { message: "Password updated successfully" };
}

module.exports = { updateEmployeePassword };

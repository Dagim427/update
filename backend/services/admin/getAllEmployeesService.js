const dbconnection = require("../../db/dbConfig");

async function getAllEmployeesService() {
  const [rows] = await dbconnection.query("SELECT E_ID, First_name, Last_name, Role,Phone_number, Email, status FROM employee");
  return rows;
}

module.exports = {getAllEmployeesService }
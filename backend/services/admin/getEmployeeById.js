const dbconnection = require("../../db/dbConfig");

// Get employee by ID using async/await
const getEmployeeByIdService = async (id) => {
  const [results] = await dbconnection.query(
    "SELECT E_ID, First_name, Last_name, Role, Email, status FROM employee WHERE E_ID = ?",
    [id]
  );
  
  if (results.length === 0) {
    throw new Error("Employee not found");
  }

  return results[0];
};

// Update employee by ID using async/await
const updateEmployeeByIdService = async (id, data) => {
  const { First_name, Last_name, Role, Email, status, doctorSpecialties} = data;

  const [result] = await dbconnection.query(
    `
    UPDATE employee 
    SET First_name = ?, Last_name = ?, Role = ?, Email = ?, status = ?, doctorSpecialties = ?
    WHERE E_ID = ?
    `,
    [First_name, Last_name, Role, Email, status,doctorSpecialties, id]
  );

  if (result.affectedRows === 0) {
    throw new Error("Employee not found or nothing changed");
  }

  return { msg: "Employee updated successfully" };
};

const viewEmployeeByIdService = async (id) => {
  const [results] = await dbconnection.query(
    "SELECT * FROM employee WHERE E_ID = ?",
    [id]
  );
  
  if (results.length === 0) {
    throw new Error("Employee not found");
  }

  return results[0];
};
module.exports = { getEmployeeByIdService, updateEmployeeByIdService,viewEmployeeByIdService };

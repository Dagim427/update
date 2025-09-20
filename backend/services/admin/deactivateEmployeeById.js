const dbconnection = require("../../db/dbConfig");

const deactivateEmployeeByIdService = async (employeeId) => {
  const [result] = await dbconnection.query(
    "UPDATE employee SET status = 'inactive' WHERE E_ID = ?",
    [employeeId]
  );

  return result;
};

module.exports = {
  deactivateEmployeeByIdService,
};

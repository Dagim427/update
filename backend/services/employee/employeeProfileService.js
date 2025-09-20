const dbconnection = require("../../db/dbConfig");

const getEmployeeProfileService = async (e_id) => {
    const [rows] = await dbconnection.query(
        `SELECT 
      E_ID,
      First_name,
      Last_name,
      Sex,
      DoB,
      Role,
      Phone_number,
      Email,
      doctorSpecialties,
      last_login,
      DATE_FORMAT(last_login, '%Y-%m-%d %h:%i %p') as formatted_last_login
    FROM employee 
    WHERE E_ID = ?`,
        [e_id]
    );

    if (rows.length === 0) {
        throw new Error("Employee not found");
    }

    return rows[0];
};

module.exports = {
    getEmployeeProfileService,
};

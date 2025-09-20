const dbconnection = require("../../db/dbConfig");
const bcryptjs = require("bcryptjs");

async function addEmployeeService(data) {
  const { First_name, Last_name, Sex, DoB, Role, Phone_number, Email,doctorSpecialties } = data;

  // Check email exists
  const [User] = await dbconnection.query(
    "SELECT First_name, Last_name, E_ID FROM employee WHERE Email = ? ",
    [Email]
  );
  if (User.length > 0) {
    throw new Error("Employee already added");
  }

  const defaultPassword = "motite@123";
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(defaultPassword, salt);

  // Insert new employee
  const sql =
    "INSERT INTO employee (First_name, Last_name, Sex, DoB, Role, Phone_number, Email, PASSWORD,doctorSpecialties) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)";
  dbconnection.query(
    sql,
    [
      First_name,
      Last_name,
      Sex,
      DoB,
      Role,
      Phone_number,
      Email,
      hashedPassword,
      doctorSpecialties
    ],
    (err, result) => {
      if (err)
        return res.status(500).json({ error: "Database error", details: err });
      res
        .status(201)
        .json({ message: "Employee added with default password: motite@123" });
    }
  );
}

module.exports = { addEmployeeService };

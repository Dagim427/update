const xlsx = require("xlsx");
const bcrypt = require("bcryptjs");
const dbconnection = require("../../db/dbConfig");

async function handleExcelUpload(buffer) {
  const workbook = xlsx.read(buffer, { type: "buffer" }); // <-- FIXED
  const sheetName = workbook.SheetNames[0];
  const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const results = [];

  for (const row of sheetData) {
    const { First_name, Last_name, Sex, DoB, Role, Phone_number, Email } = row;

    // Format dob to YYYY-MM-DD
    const formattedDob = new Date(DoB).toISOString().split("T")[0];

    const [existing] = await dbconnection.query(
      "SELECT E_ID FROM employee WHERE Email = ?",
      [Email]
    );

    if (existing.length > 0) {
      results.push({ Email, status: "Already exists" });
      continue;
    }

    const hashedPassword = await bcrypt.hash("motite@123", 10);

    try {
      await dbconnection.query(
        "INSERT INTO employee (First_name, Last_name, Sex, DoB, Role, Phone_number, Email, PASSWORD) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          First_name,
          Last_name,
          Sex,
          formattedDob, 
          Role,
          Phone_number,
          Email,
          hashedPassword,
        ]
      );
      results.push({ Email, status: "Inserted" });
    } catch (err) {
      results.push({ Email, status: "Error", message: err.message });
    }
  }

  return results;
}

module.exports = { handleExcelUpload };

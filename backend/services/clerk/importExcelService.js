const xlsx = require("xlsx");
const bcrypt = require("bcryptjs");
const dbconnection = require("../../db/dbConfig");

async function handleExcelImport(buffer) {
  const workbook = xlsx.read(buffer);
  const sheetName = workbook.SheetNames[0];
  const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const results = [];

  for (const row of sheetData) {
    try {
      const {
        patientId,
        mrn,
        firstName,
        lastName,
        dob,
        sex,
        email,
        city,
        phoneNumber,
      } = row;

      if (!patientId || !mrn || !firstName || !lastName || !dob || !sex) {
        results.push({
          patientId: patientId || "N/A",
          status: "Missing required fields",
        });
        continue;
      }

      const formattedDob =
        typeof dob === "number"
          ? xlsx.SSF.format("yyyy-mm-dd", dob) // Excel serial date
          : new Date(Date.parse(dob)).toISOString().split("T")[0];

      const cleanedSex = (sex || "").trim().toLowerCase();
      if (!["male", "female"].includes(cleanedSex)) {
        results.push({ patientId, status: "Invalid sex value" });
        continue;
      }

      const [existing] = await dbconnection.query(
        "SELECT patient_id FROM patient_info WHERE patient_id = ?",
        [patientId]
      );
      if (existing.length > 0) {
        results.push({ patientId, status: "Already exists" });
        continue;
      }

      const hashedPassword = await bcrypt.hash("motite@123", 10);

       // before inserting


      const sql1 = `
        INSERT INTO patient_info (patient_id, mrn, first_name, last_name, dob, sex)
        VALUES (?, ?, ?, ?, ?, ?)`;
      await dbconnection.query(sql1, [
        patientId,
        mrn,
        firstName,
        lastName,
        formattedDob,
        cleanedSex,
      ]);

      const sql2 = `
        INSERT INTO patient_address (email, city, phone_number, password, patient_id)
        VALUES (?, ?, ?, ?, ?)`;
      await dbconnection.query(sql2, [
        email,
        city,
        phoneNumber,
        hashedPassword,
        patientId.trim(),
      ]);

      results.push({ patientId, status: "Inserted successfully" });
    } catch (error) {
      console.error("Error processing row:", row, error);
      results.push({
        patientId: row.patientId || "N/A",
        status: "Failed",
        error: error.message,
      });
    }
  }

  return {
    message: "Import completed",
    results,
  };
}

module.exports = { handleExcelImport };

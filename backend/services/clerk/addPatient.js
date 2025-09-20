const bcryptjs = require("bcryptjs");
const dbconnection = require("../../db/dbConfig");

async function addPatientService(data) {
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
  } = data;

  // Check if patient already exists
  const [patient] = await dbconnection.query(
    "SELECT patient_id FROM patient_info WHERE patient_id = ?",
    [patientId]
  );

  if (patient.length > 0) {
    throw new Error("Patient already added");
  }

  // Hash the default password
  const defaultPassword = "motite@123";
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(defaultPassword, salt);

  // Insert into patient_info
  const sql1 =
    "INSERT INTO patient_info (patient_id, mrn, first_name, last_name, dob, sex) VALUES (?, ?, ?, ?, ?, ?)";
  await dbconnection.query(sql1, [
    patientId,
    mrn,
    firstName,
    lastName,
    dob,
    sex,
  ]);

  // Insert into patient_address with correct foreign key
  const sql2 =
    "INSERT INTO patient_address (email, city, phone_number, password, patient_id) VALUES (?, ?, ?, ?, ?)";
  await dbconnection.query(sql2, [
    email,
    city,
    phoneNumber,
    hashedPassword,
    patientId, 
  ]);

  return {
    message: "Patient added successfully with default password: motite@123",
  };
}

module.exports = { addPatientService };

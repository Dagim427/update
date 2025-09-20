const dbconnection = require("../db/dbConfig");
const sendEmail = require("../utils/sendEmail");
const { StatusCodes } = require("http-status-codes");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Email and password are required" });
  }

  try {
    const [rows] = await dbconnection.query(
      "SELECT * FROM employee WHERE Email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Email not found" });
    }

    const user = rows[0];

    const isMatch = await bcryptjs.compare(password, user.PASSWORD);
    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Incorrect password" });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        msg: "Your account has been deactivated. Contact the administrator.",
      });
    }

    if (user.is_first_login === 1) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

      await dbconnection.query(
        "UPDATE employee SET otp_code = ?, otp_expiry = ? WHERE E_ID = ?",
        [otp, expiry, user.E_ID]
      );

      await sendEmail(user.Email, "Your OTP Code", `Your OTP is: ${otp}`);

      return res.status(401).json({
        msg: "OTP sent to email.",
        otpRequired: true,
        e_id: user.E_ID,
      });
    }

    // Update last login time
    await dbconnection.query(
      "UPDATE employee SET last_login = CURRENT_TIMESTAMP WHERE E_ID = ?",
      [user.E_ID]
    );

    const token = jwt.sign(
      {
        e_id: user.E_ID,
        firstname: user.Firstname,
        lastname: user.Lastname,
        role: user.Role,
        doctorSpecialties: user.doctorSpecialties, // Add doctor specialty to JWT
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(StatusCodes.OK).json({
      token,
      role: user.Role,
      e_id: user.E_ID,
      isFirstLogin: user.is_first_login,
      expiresIn: 3600,
    });
  } catch (error) {
    console.error("Login error:", error); // Log for debugging
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const checkUser = (req, res) => {
  const { e_id, firstname, lastname } = req.user;
  res.status(StatusCodes.OK).json({
    msg: "User is authenticated",
    e_id,
    firstname,
    lastname,
    role: req.user.role,
  });
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { e_id } = req.user;

  if (!currentPassword || !newPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "All fields are required" });
  }

  try {
    const [rows] = await dbconnection.query(
      "SELECT PASSWORD, is_first_login FROM employee WHERE E_ID = ?",
      [e_id]
    );

    if (rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    const user = rows[0];
    const isMatch = await bcryptjs.compare(currentPassword, user.PASSWORD);
    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcryptjs.hash(newPassword, 10);
    await dbconnection.query(
      "UPDATE employee SET PASSWORD = ?, is_first_login = 0 WHERE E_ID = ?",
      [hashedNewPassword, e_id]
    );

    res.status(StatusCodes.OK).json({ msg: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error); // Debug log
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
};
const verifyOtp = async (req, res) => {
  const { e_id, otp } = req.body || {};

  if (!e_id || !otp) {
    return res.status(400).json({ msg: "Missing e_id or OTP" });
  }
  try {
    const [[user]] = await dbconnection.execute(
      "SELECT otp_code, otp_expiry, E_ID, First_name, Last_name, Role, doctorSpecialties FROM employee WHERE E_ID = ?",
      [e_id]
    );

    if (!user || !user.otp_code || !user.otp_expiry) {
      return res.status(404).json({ msg: "No OTP found" });
    }

    if (new Date() > new Date(user.otp_expiry)) {
      return res.status(401).json({ msg: "OTP expired" });
    }

    if (otp !== user.otp_code) {
      return res.status(401).json({ msg: "Invalid OTP" });
    }

    // Clear OTP after success
    await dbconnection.execute(
      "UPDATE employee SET otp_code = NULL, otp_expiry = NULL WHERE E_ID = ?",
      [e_id]
    );
    // Generate token after OTP verification
    const token = jwt.sign(
      {
        e_id: user.E_ID,
        firstname: user.Firstname,
        lastname: user.Lastname,
        role: user.Role,
        doctorSpecialties: user.doctorSpecialties, // Add doctor specialty to JWT
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      msg: "OTP verified",
      token,
      role: user.Role,
      e_id: user.E_ID,
      isFirstLogin: true,
      expiresIn: 3600,
    });
  } catch (error) {
    console.error("OTP Verification error:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const patientLogin = async (req, res) => {
  const { patientId, password } = req.body;

  if (!patientId || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Patient ID and password are required" });
  }

  try {
    const [rows] = await dbconnection.query(
      `SELECT pi.*, pa.*
FROM patient_info pi
JOIN patient_address pa ON pi.patient_id = pa.patient_id
WHERE pi.patient_id = ?`,
      [patientId]
    );

    if (rows.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Patient not found" });
    }

    const patient = rows[0];

    const isMatch = await bcryptjs.compare(password, patient.password);
    if (!patient.password) {
      return res.status(500).json({ msg: "Password not found for patient" });
    }

    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Incorrect password" });
    }

    if (patient.is_first_login === 1) {
    }

    // Generate JWT
    const token = jwt.sign(
      {
        patient_id: patient.patient_id,
        firstname: patient.first_name,
        lastname: patient.last_name,
        role: patient.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(StatusCodes.OK).json({
      token,
      role: patient.role,
      patient_id: patient.patient_id,
      firstname: patient.first_name,
      lastname: patient.last_name,
      isFirstLogin: patient.is_first_login,
      expiresIn: 3600,
    });
  } catch (error) {
    console.error("Patient login error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const changePasswordPatient = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { patientId } = req.user;

  if (!currentPassword || !newPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "All fields are required" });
  }

  try {
    const [rows] = await dbconnection.query(
      "SELECT pa.Password FROM patient_address pa WHERE pa.patient_id = ?",
      [patientId]
    );

    if (rows.length === 0) {
      console.log("DEBUG: No patient found for ID:", patientId);
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Patient not found" });
    }

    const user = rows[0];
    const isMatch = await bcryptjs.compare(currentPassword, user.Password);
    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcryptjs.hash(newPassword, 10);

    // Update password in patient_address
    await dbconnection.query(
      "UPDATE patient_address SET Password = ? WHERE patient_id = ?",
      [hashedNewPassword, patientId]
    );

    // Update is_first_login = 0 in patient_info
    await dbconnection.query(
      "UPDATE patient_info SET is_first_login = 0 WHERE patient_id = ?",
      [patientId]
    );

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Password changed successfully" });
  } catch (error) {
    console.error("Patient change password error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
};

module.exports = {
  login,
  checkUser,
  changePassword,
  verifyOtp,
  patientLogin,
  changePasswordPatient,
};

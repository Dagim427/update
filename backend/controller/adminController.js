const { addEmployeeService } = require("../services/admin/addEmployee");
const {
  getAllEmployeesService,
} = require("../services/admin/getAllEmployeesService");

const {
  updateEmployeePassword,
} = require("../services/admin/updateEmployeePassword");
const {
  getContactMessageService,
} = require("../services/admin/viewContactMsg");
const { handleExcelUpload } = require("../services/admin/importExcelService");

const fs = require("fs");
const { StatusCodes } = require("http-status-codes");

const {
  getEmployeeByIdService,
  updateEmployeeByIdService,
  viewEmployeeByIdService,
} = require("../services/admin/getEmployeeById");
const {
  resetPasswordService,
} = require("../services/admin/resetEmployeePassword");
const {
  deactivateEmployeeByIdService,
} = require("../services/admin/deactivateEmployeeById");

async function addEmployee(req, res) {
  const { First_name, Last_name, Sex, DoB, Role, Phone_number, Email } =
    req.body;

  if (
    !First_name ||
    !Last_name ||
    !Sex ||
    !DoB ||
    !Role ||
    !Phone_number ||
    !Email
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "All fields are required" });
  }

  try {
    await addEmployeeService(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Employee added successfully" });
  } catch (error) {
    const message = error.message;
    if (message.includes("already added")) {
      return res.status(StatusCodes.CONFLICT).json({ msg: message });
    } else if (message.includes("Password")) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: message });
    } else {
      console.log("Internal error:", message);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Internal server error" });
    }
  }
}

async function getAllEmployees(req, res) {
  try {
    const employees = await getAllEmployeesService();
    res.status(200).json({ employees });
  } catch (err) {
    console.error("Error fetching employees:", err.message);
    res.status(500).json({ msg: "Internal server error" });
  }
}

const updatePassword = async (req, res) => {
  const employeeId = req.params.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const result = await updateEmployeePassword(
      employeeId,
      currentPassword,
      newPassword
    );
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};
async function getContactMessage(req, res) {
  try {
    const feedback = await getContactMessageService();
    res.status(200).json({ feedback });
  } catch (err) {
    console.error("Error fetching feedback:", err.message);
    res.status(500).json({ msg: "Internal server error" });
  }
}

async function importEmployeesFromExcel(req, res) {
  try {
    const buffer = req.file.buffer;

    const results = await handleExcelUpload(buffer);

    return res.status(StatusCodes.CREATED).json({
      message: "Employees imported successfully",
      results,
    });
  } catch (err) {
    console.error("Error importing employees:", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}

const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await getEmployeeByIdService(id);
    res.status(StatusCodes.OK).json({ employee });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
  }
};

const updateEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updateEmployeeByIdService(id, req.body);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
  }
};

const viewEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await viewEmployeeByIdService(id);
    res.status(StatusCodes.OK).json({ employee });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
  }
};

const resetEmployeePassword = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await resetPasswordService(id);
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(500).json({ error: "Failed to reset password" });
  }
};

const deactivateEmployeeAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deactivateEmployeeByIdService(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.status(200).json({ msg: "Employee account deactivated" });
  } catch (err) {
    console.error("Deactivation error:", err);
    return res.status(500).json({ error: "Failed to deactivate account" });
  }
};

module.exports = {
  addEmployee,
  importEmployeesFromExcel,
  getAllEmployees,
  updatePassword,
  getContactMessage,
  getEmployeeById,
  viewEmployeeById,
  updateEmployeeById,
  resetEmployeePassword,
  deactivateEmployeeAccount,
};

const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

// Middleware
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Admin controller
const {
  addEmployee,
  getAllEmployees,
  updatePassword,
  getContactMessage,
  importEmployeesFromExcel,
  getEmployeeById,
  updateEmployeeById,
  viewEmployeeById,
  resetEmployeePassword,
  deactivateEmployeeAccount
} = require("../controller/adminController");

// Profile controller
const { getEmployeeProfile } = require("../controller/profileController");

router.use(authMiddleware);
router.use(authorizeRoles("admin"));

// Admin Routes
router.post("/add-employee", addEmployee);
router.get("/employees", getAllEmployees);
router.put("/employee/:id/update-password", updatePassword);
router.get("/view-feedback", getContactMessage);
router.post(
  "/import-employees",
  upload.single("file"),
  importEmployeesFromExcel
);

router.get("/employee/:id", getEmployeeById);
router.put("/employee/:id", updateEmployeeById);
router.get("/employee/:id/view", viewEmployeeById);
router.put("/employee/:id/reset-password", resetEmployeePassword);
router.put("/employee/:id/deactivate", deactivateEmployeeAccount);

// Admin Profile Route
router.get("/profile", getEmployeeProfile);

module.exports = router;

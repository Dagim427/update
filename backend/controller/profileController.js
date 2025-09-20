const { StatusCodes } = require("http-status-codes");
const { getEmployeeProfileService } = require("../services/employee/employeeProfileService");

const getEmployeeProfile = async (req, res) => {
    try {
        const { e_id } = req.user;
        const profile = await getEmployeeProfileService(e_id);
        res.status(StatusCodes.OK).json({ profile });
    } catch (error) {
        console.error("Error fetching employee profile:", error.message);
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
};

module.exports = {
    getEmployeeProfile,
};

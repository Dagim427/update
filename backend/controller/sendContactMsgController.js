const { sendContactMsgService } = require("../services/sendContactMsg");
const { StatusCodes } = require("http-status-codes");

async function sendContactMessage(req, res) {
  const { fullName, email, message } = req.body;

  if (!fullName || !email || !message) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "all field are required" });
  }

  try {
    await sendContactMsgService(fullName, email, message);
    res.status(StatusCodes.CREATED).json({ msg: "submmited successfully" });
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = {sendContactMessage}
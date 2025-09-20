const express = require("express");
const router = express.Router();

const {  sendContactMessage} = require("../controller/sendContactMsgController")

router.post("/contact-msg", sendContactMessage);

module.exports = router;
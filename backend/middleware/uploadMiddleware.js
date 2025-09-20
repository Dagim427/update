const multer = require("multer");

// Store uploaded file in memory instead of saving to disk
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;

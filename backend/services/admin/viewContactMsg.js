const dbconnection = require("../../db/dbConfig");

async function getContactMessageService() {
  const [rows] = await dbconnection.query("SELECT * FROM contactmessage ORDER BY ID DESC");
  return rows;
}

module.exports = { getContactMessageService };

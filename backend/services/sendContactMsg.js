const dbconnection = require("../db/dbConfig");

const sendContactMsgService = async (fullName, email, message) => {
  const sql =
    "insert into contactmessage (FullName, Email, Message) values(?, ?, ?)";
  const [result] = await dbconnection.query(sql, [fullName, email, message]);
  return result;
};

module.exports = { sendContactMsgService };

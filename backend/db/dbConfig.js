const mysql2 = require("mysql2/promise");

const dbconnection = mysql2.createPool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

module.exports = dbconnection;

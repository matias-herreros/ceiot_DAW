const mysql = require("mysql");
const util = require("util");
const config = require("../../config");

const connection = mysql.createConnection({
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});

connection.query = util.promisify(connection.query).bind(connection);

connection.connect((err) => {
  if (err) {
    console.error("Error while connect to DB: " + err.stack);
    return;
  }
  console.log("Connected to DB under thread ID: " + connection.threadId);
});

module.exports = connection;

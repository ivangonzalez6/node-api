const mysql = require("mysql");
const mysqlConnection = mysql.createConnection({
  host: "sql5.freemysqlhosting.net",
  user: "sql5448044",
  password: "nW1SwRP8Ja",
  database: "sql5448044",
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("DB is connected");
  }
});

module.exports = mysqlConnection;

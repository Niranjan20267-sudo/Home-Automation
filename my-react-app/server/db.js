const mysql = require("mysql2");
require("dotenv").config();

console.log("==========================================");
console.log("Checking MySQL configuration...");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log(
  "DB_PASSWORD:",
  process.env.DB_PASSWORD ? "Password loaded ✅" : "Password missing ❌"
);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT || 3306);
console.log("==========================================");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL connection failed:");
    console.error(err.message);
    return;
  }

  console.log("✅ MySQL connected successfully!");

  connection.query(
    "SELECT DATABASE() AS database_name",
    (error, result) => {
      if (error) {
        console.error("❌ Database check failed:", error.message);
      } else {
        console.log(
          "📁 Database:",
          result[0].database_name
        );
      }

      connection.release();
    }
  );
});

module.exports = db;
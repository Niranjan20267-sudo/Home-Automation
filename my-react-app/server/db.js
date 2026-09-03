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
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "smarthome",
  port: Number(process.env.DB_PORT) || 3306,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// =====================================================
// TEST DATABASE CONNECTION
// =====================================================

db.getConnection((err, connection) => {
  if (err) {
    console.error("");
    console.error("❌ MySQL connection failed:");
    console.error(err.message);
    console.error("");
    return;
  }

  console.log("✅ MySQL connected successfully!");

  // IMPORTANT:
  // Check which database Node.js is actually using
  connection.query(
    "SELECT DATABASE() AS database_name",
    (databaseError, databaseResult) => {
      if (databaseError) {
        console.error(
          "❌ Database name check failed:",
          databaseError.message
        );
      } else {
        console.log(
          "📁 Node.js is using database:",
          databaseResult[0].database_name
        );
      }

      // Check users table
      connection.query(
        "DESCRIBE users",
        (tableError, tableResult) => {
          if (tableError) {
            console.error(
              "❌ users table check failed:",
              tableError.message
            );
          } else {
            console.log("");
            console.log("📋 users table columns:");

            tableResult.forEach((column) => {
              console.log("   -", column.Field);
            });

            console.log("");
          }

          connection.release();
        }
      );
    }
  );
});

module.exports = db;
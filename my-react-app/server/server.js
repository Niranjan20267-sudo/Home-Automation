// =====================================================
// SMART HOME SERVER
// =====================================================
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const db = require("./db");

const app = express();

const PORT = process.env.PORT || 5000;


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());


// =====================================================
// TEST SERVER
// =====================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart Home Server is running",
  });
});


// =====================================================
// TEST DATABASE
// =====================================================

app.get("/api/test-db", (req, res) => {
  const sql = "SELECT 1 AS connected";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(
        "❌ Database error:",
        err.message
      );

      return res.status(500).json({
        success: false,
        message: "MySQL connection failed",
        error: err.message,
      });
    }

    return res.json({
      success: true,
      message:
        "MySQL database connected successfully!",
      result: results,
    });
  });
});


// =====================================================
// GET USERS
// =====================================================

app.get("/api/users", (req, res) => {
  const sql = `
    SELECT
      id,
      name,
      email,
      provider,
      created_at
    FROM users
    ORDER BY id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(
        "❌ Get users error:",
        err.message
      );

      return res.status(500).json({
        success: false,
        message: "Database error",
        error: err.message,
      });
    }

    return res.json({
      success: true,
      users: results,
    });
  });
});


// =====================================================
// SIGNUP
// =====================================================

app.post("/api/signup", async (req, res) => {
  try {
    console.log("");
    console.log("==========================================");
    console.log("📥 SIGNUP REQUEST RECEIVED");
    console.log("==========================================");

    const {
      name,
      email,
      password,
    } = req.body;


    // -------------------------------------------------
    // REQUIRED FIELDS
    // -------------------------------------------------

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and password are required",
      });
    }


    const normalizedName =
      String(name).trim();

    const normalizedEmail =
      String(email)
        .trim()
        .toLowerCase();


    // -------------------------------------------------
    // NAME VALIDATION
    // -------------------------------------------------

    if (normalizedName.length < 2) {
      return res.status(400).json({
        success: false,
        message:
          "Name must contain at least 2 characters",
      });
    }


    // -------------------------------------------------
    // EMAIL VALIDATION
    // -------------------------------------------------

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid email address",
      });
    }


    // -------------------------------------------------
    // PASSWORD VALIDATION
    // -------------------------------------------------

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters",
      });
    }

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain an uppercase letter",
      });
    }

    if (!/[a-z]/.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain a lowercase letter",
      });
    }

    if (!/[0-9]/.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain a number",
      });
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain a special character",
      });
    }


    // -------------------------------------------------
    // CHECK EMAIL
    // -------------------------------------------------

    const checkSql = `
      SELECT id
      FROM users
      WHERE email = ?
      LIMIT 1
    `;

    db.query(
      checkSql,
      [normalizedEmail],
      async (checkError, results) => {

        if (checkError) {
          console.error(
            "❌ CHECK EMAIL ERROR:",
            checkError.message
          );

          return res.status(500).json({
            success: false,
            message:
              "Database error while checking email",
            error:
              checkError.message,
          });
        }


        // -------------------------------------------------
        // DUPLICATE EMAIL
        // -------------------------------------------------

        if (results.length > 0) {
          return res.status(409).json({
            success: false,
            message:
              "Email already registered",
          });
        }


        try {

          // -------------------------------------------------
          // HASH PASSWORD
          // -------------------------------------------------

          const hashedPassword =
            await bcrypt.hash(
              password,
              10
            );

          console.log(
            "🔐 Password hashed successfully"
          );


          // -------------------------------------------------
          // INSERT USER
          // -------------------------------------------------

          const insertSql = `
            INSERT INTO users
            (
              name,
              email,
              password_hash,
              provider
            )
            VALUES (?, ?, ?, ?)
          `;

          const values = [
            normalizedName,
            normalizedEmail,
            hashedPassword,
            "email",
          ];


          db.query(
            insertSql,
            values,
            (insertError, insertResult) => {

              if (insertError) {

                console.error(
                  "❌ INSERT USER ERROR:",
                  insertError.message
                );

                return res.status(500).json({
                  success: false,
                  message:
                    "Unable to create account",
                  error:
                    insertError.message,
                });
              }


              console.log("");
              console.log(
                "=========================================="
              );
              console.log(
                "✅ NEW USER CREATED"
              );
              console.log(
                "ID:",
                insertResult.insertId
              );
              console.log(
                "Name:",
                normalizedName
              );
              console.log(
                "Email:",
                normalizedEmail
              );
              console.log(
                "=========================================="
              );
              console.log("");


              return res.status(201).json({
                success: true,
                message:
                  "Account created successfully!",
                user: {
                  id:
                    insertResult.insertId,
                  name:
                    normalizedName,
                  email:
                    normalizedEmail,
                },
              });
            }
          );

        } catch (hashError) {

          console.error(
            "❌ PASSWORD HASH ERROR:",
            hashError.message
          );

          return res.status(500).json({
            success: false,
            message:
              "Unable to securely process password",
            error:
              hashError.message,
          });
        }
      }
    );

  } catch (error) {

    console.error(
      "❌ SIGNUP ERROR:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});


// =====================================================
// LOGIN
// =====================================================

app.post("/api/login", async (req, res) => {
  try {

    console.log("");
    console.log(
      "📥 LOGIN REQUEST RECEIVED"
    );


    const {
      email,
      password,
    } = req.body;


    // -------------------------------------------------
    // REQUIRED FIELDS
    // -------------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }


    const normalizedEmail =
      String(email)
        .trim()
        .toLowerCase();


    // -------------------------------------------------
    // FIND USER
    // -------------------------------------------------

    const sql = `
      SELECT
        id,
        name,
        email,
        password_hash,
        provider,
        created_at
      FROM users
      WHERE email = ?
      LIMIT 1
    `;


    db.query(
      sql,
      [normalizedEmail],
      async (err, results) => {

        if (err) {

          console.error(
            "❌ LOGIN DATABASE ERROR:",
            err.message
          );

          return res.status(500).json({
            success: false,
            message: "Database error",
            error: err.message,
          });
        }


        // -------------------------------------------------
        // USER NOT FOUND
        // -------------------------------------------------

        if (results.length === 0) {

          return res.status(401).json({
            success: false,
            message:
              "Invalid email or password",
          });
        }


        const user = results[0];


        // -------------------------------------------------
        // PASSWORD HASH CHECK
        // -------------------------------------------------

        if (
          !user.password_hash ||
          !user.password_hash.startsWith("$2")
        ) {

          console.error(
            "❌ Invalid password hash stored for:",
            user.email
          );

          return res.status(401).json({
            success: false,
            message:
              "Invalid email or password",
          });
        }


        // -------------------------------------------------
        // COMPARE PASSWORD
        // -------------------------------------------------

        try {

          const passwordMatch =
            await bcrypt.compare(
              password,
              user.password_hash
            );


          if (!passwordMatch) {

            console.log(
              "❌ Wrong password:",
              normalizedEmail
            );

            return res.status(401).json({
              success: false,
              message:
                "Invalid email or password",
            });
          }


          // -------------------------------------------------
          // LOGIN SUCCESS
          // -------------------------------------------------

          console.log(
            "✅ Login successful:",
            normalizedEmail
          );


          return res.status(200).json({
            success: true,
            message:
              "Login successful",
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });

        } catch (passwordError) {

          console.error(
            "❌ PASSWORD COMPARISON ERROR:",
            passwordError.message
          );

          return res.status(500).json({
            success: false,
            message:
              "Password verification failed",
            error:
              passwordError.message,
          });
        }
      }
    );

  } catch (error) {

    console.error(
      "❌ LOGIN ERROR:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});


// =====================================================
// 404 HANDLER
// =====================================================

app.use((req, res) => {

  return res.status(404).json({
    success: false,
    message:
      `Route ${req.method} ${req.originalUrl} not found`,
  });

});


// =====================================================
// ERROR HANDLER
// =====================================================

app.use(
  (err, req, res, next) => {

    console.error(
      "❌ SERVER ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });

  }
);


// =====================================================
// START SERVER
// =====================================================

app.listen(
  PORT,
  () => {

    console.log("");
    console.log(
      "=========================================="
    );

    console.log(
      "🚀 Smart Home Server Started Successfully"
    );

    console.log(
      "=========================================="
    );

    console.log(
      `🌐 Server: http://localhost:${PORT}`
    );

    console.log(
      `🧪 Test: http://localhost:${PORT}/api/test-db`
    );

    console.log(
      `📝 Signup: http://localhost:${PORT}/api/signup`
    );

    console.log(
      `🔐 Login: http://localhost:${PORT}/api/login`
    );

    console.log(
      "=========================================="
    );

  }
);
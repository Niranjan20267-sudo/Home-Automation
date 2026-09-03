import React, { useState } from "react";
import "./Signup.css";

export default function Signup({
  onSignupSuccess,
  onLoginClick,
}) {
  // =====================================================
  // STATE
  // =====================================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);


  // =====================================================
  // PASSWORD REQUIREMENTS
  // =====================================================

  const passwordRequirements = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };


  const isPasswordValid =
    passwordRequirements.minLength &&
    passwordRequirements.uppercase &&
    passwordRequirements.lowercase &&
    passwordRequirements.number &&
    passwordRequirements.special;


  // =====================================================
  // SIGNUP
  // =====================================================

  const handleSignup = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }


    // ---------------------------------------------------
    // CHECK ALL FIELDS
    // ---------------------------------------------------

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }


    // ---------------------------------------------------
    // CHECK NAME
    // ---------------------------------------------------

    const normalizedName = name.trim();

    if (normalizedName.length < 2) {
      alert(
        "Name must contain at least 2 characters."
      );
      return;
    }


    // ---------------------------------------------------
    // CHECK EMAIL
    // ---------------------------------------------------

    const normalizedEmail =
      email.trim().toLowerCase();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      alert(
        "Please enter a valid email address."
      );
      return;
    }


    // ---------------------------------------------------
    // CHECK PASSWORD
    // ---------------------------------------------------

    if (!isPasswordValid) {
      alert(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }


    // ---------------------------------------------------
    // CHECK CONFIRM PASSWORD
    // ---------------------------------------------------

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }


    // ---------------------------------------------------
    // START LOADING
    // ---------------------------------------------------

    setLoading(true);


    try {
      console.log("📤 Sending signup request...");


      // =================================================
      // IMPORTANT
      // This matches server.js:
      //
      // app.post("/api/signup", ...)
      // =================================================

const response = await fetch(
  "http://localhost:5000/api/signup",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim(),
      password: password,
    }),
  }
);


      // -------------------------------------------------
      // GET BACKEND RESPONSE
      // -------------------------------------------------

      const data = await response.json();

      console.log(
        "📥 Backend response:",
        data
      );


      // -------------------------------------------------
      // BACKEND ERROR
      // -------------------------------------------------

      if (!response.ok || !data.success) {
        alert(
          data.message ||
          "Unable to create account."
        );

        return;
      }


      // -------------------------------------------------
      // SUCCESS
      // -------------------------------------------------

      console.log(
        "✅ User saved in MySQL:",
        data.user
      );

      alert(
        data.message ||
        "Account created successfully!"
      );


      // -------------------------------------------------
      // CLEAR FORM
      // -------------------------------------------------

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");


      // -------------------------------------------------
      // CALLBACK
      // -------------------------------------------------

      if (onSignupSuccess) {
        onSignupSuccess(data.user);
      }

    } catch (error) {

      console.error(
        "❌ Signup error:",
        error
      );

      alert(
        "Cannot connect to the server. Make sure Node.js server is running on port 5000."
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // LOGIN BUTTON
  // =====================================================

  const handleLoginClick = (e) => {
    e.preventDefault();

    if (onLoginClick) {
      onLoginClick();
    } else {
      alert(
        "Please connect the Login page using onLoginClick."
      );
    }
  };


  // =====================================================
  // RETURN UI
  // =====================================================

  return (
    <div className="signup-page">

      {/* ================================================
          BACKGROUND
      ================================================= */}

      <div className="signup-overlay"></div>


      {/* ================================================
          SIGNUP CARD
      ================================================= */}

      <div className="signup-card">


        {/* ==============================================
            LOGO
        =============================================== */}

        <div className="signup-logo">

          <div className="signup-logo-icon">
            ⌂
          </div>

          <span>
            SmartHome
          </span>

        </div>


        {/* ==============================================
            HEADER
        =============================================== */}

        <div className="signup-header">

          <h1>
            Create Account
          </h1>

          <p>
            Join your smart home experience
          </p>

        </div>


        {/* ==============================================
            FORM
        =============================================== */}

        <form onSubmit={handleSignup}>


          {/* ============================================
              FULL NAME
          ============================================= */}

          <div className="signup-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Niranjan"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              autoComplete="name"
            />

          </div>


          {/* ============================================
              EMAIL
          ============================================= */}

          <div className="signup-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="niranjan@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              autoComplete="email"
            />

          </div>


          {/* ============================================
              PASSWORD
          ============================================= */}

          <div className="signup-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="new-password"
            />

          </div>


          {/* ============================================
              PASSWORD REQUIREMENTS
          ============================================= */}

          {password.length > 0 && (

            <div className="password-requirements">


              <p
                className={
                  passwordRequirements.minLength
                    ? "valid"
                    : ""
                }
              >
                {passwordRequirements.minLength
                  ? "✓"
                  : "○"}{" "}
                At least 8 characters
              </p>


              <p
                className={
                  passwordRequirements.uppercase
                    ? "valid"
                    : ""
                }
              >
                {passwordRequirements.uppercase
                  ? "✓"
                  : "○"}{" "}
                One uppercase letter
              </p>


              <p
                className={
                  passwordRequirements.lowercase
                    ? "valid"
                    : ""
                }
              >
                {passwordRequirements.lowercase
                  ? "✓"
                  : "○"}{" "}
                One lowercase letter
              </p>


              <p
                className={
                  passwordRequirements.number
                    ? "valid"
                    : ""
                }
              >
                {passwordRequirements.number
                  ? "✓"
                  : "○"}{" "}
                One number
              </p>


              <p
                className={
                  passwordRequirements.special
                    ? "valid"
                    : ""
                }
              >
                {passwordRequirements.special
                  ? "✓"
                  : "○"}{" "}
                One special character
              </p>

            </div>

          )}


          {/* ============================================
              CONFIRM PASSWORD
          ============================================= */}

          <div className="signup-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              autoComplete="new-password"
            />


            {/* Password match message */}

            {confirmPassword.length > 0 && (

              <p
                className={
                  password === confirmPassword
                    ? "password-match"
                    : "password-no-match"
                }
              >

                {password === confirmPassword
                  ? "✓ Passwords match"
                  : "✕ Passwords do not match"}

              </p>

            )}

          </div>


          {/* ============================================
              TERMS
          ============================================= */}

          <label className="terms">

            <input
              type="checkbox"
              required
            />

            <span>
              I agree to{" "}
              <a
                href="#"
                onClick={(e) =>
                  e.preventDefault()
                }
              >
                Terms & Conditions
              </a>
            </span>

          </label>


          {/* ============================================
              CREATE ACCOUNT BUTTON
          ============================================= */}

          <button
            type="submit"
            className="signup-button"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>


        {/* ==============================================
            DIVIDER
        =============================================== */}

        <div className="signup-divider">

          <span>
            or continue with
          </span>

        </div>


        {/* ==============================================
            SOCIAL LOGIN
        =============================================== */}

        <div className="signup-social">


          {/* Google */}

          <button
            type="button"
            className="signup-social-button"
            onClick={() =>
              alert(
                "Google login will be available soon."
              )
            }
          >

            <span className="google-icon">
              G
            </span>

          </button>


          {/* Apple */}

          <button
            type="button"
            className="signup-social-button"
            onClick={() =>
              alert(
                "Apple login will be available soon."
              )
            }
          >
            
          </button>


          {/* Other */}

          <button
            type="button"
            className="signup-social-button"
            onClick={() =>
              alert(
                "Social login will be available soon."
              )
            }
          >
            ◉
          </button>

        </div>


        {/* ==============================================
            LOGIN
        =============================================== */}

        <div className="already-account">

          <span>
            Already have an account?
          </span>

          <a
            href="#"
            onClick={handleLoginClick}
          >
            Login
          </a>

        </div>


      </div>

    </div>
  );
}
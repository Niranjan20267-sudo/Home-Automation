import React, { useState } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
} from "@react-oauth/google";

import "./login.css";


// =====================================================
// BACKEND URL
// =====================================================

const API_URL = "http://localhost:5000";


// =====================================================
// LOGIN COMPONENT
// =====================================================

export default function Login({ onLoginSuccess }) {

  // ===================================================
  // STATE
  // ===================================================

  const [isSignUp, setIsSignUp] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);


  // ===================================================
  // PASSWORD REQUIREMENTS
  // ===================================================

  const passwordRequirements = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special:
      /[!@#$%^&*(),.?":{}|<>_\-+=]/.test(password),
  };


  const isPasswordValid =
    passwordRequirements.minLength &&
    passwordRequirements.uppercase &&
    passwordRequirements.lowercase &&
    passwordRequirements.number &&
    passwordRequirements.special;


  // ===================================================
  // LOGIN
  // ===================================================

  const handleLogin = async (e) => {

    e.preventDefault();

    if (loading) {
      return;
    }

    // Check fields
    if (!email.trim() || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {

      console.log("📤 Sending login request...");

      const response = await fetch(
        `${API_URL}/api/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password: password,
          }),
        }
      );


      // Read response safely
      const data = await response.json();

      console.log("📥 LOGIN RESPONSE:", data);


      // Login failed
      if (!response.ok || !data.success) {

        alert(
          data.message ||
          "Invalid email or password."
        );

        return;
      }


      // Login successful
      console.log(
        "✅ Login successful:",
        data.user
      );


      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      // Send user to App.jsx
      if (onLoginSuccess) {
        onLoginSuccess(data.user);
      }

    } catch (error) {

      console.error(
        "❌ LOGIN ERROR:",
        error
      );

      alert(
        "Cannot connect to the backend. Make sure Node.js server is running on port 5000."
      );

    } finally {

      setLoading(false);

    }
  };


  // ===================================================
  // SIGNUP
  // ===================================================

  const handleSignup = async (e) => {

    e.preventDefault();

    if (loading) {
      return;
    }


    // Check fields
    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {

      alert(
        "Please fill in all fields."
      );

      return;
    }


    // Check email
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {

      alert(
        "Please enter a valid email address."
      );

      return;
    }


    // Check password
    if (!isPasswordValid) {

      alert(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      );

      return;
    }


    // Confirm password
    if (password !== confirmPassword) {

      alert(
        "Passwords do not match."
      );

      return;
    }


    setLoading(true);

    try {

      console.log("📤 Sending signup request...");

      const response = await fetch(
        `${API_URL}/api/signup`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: password,
          }),
        }
      );


      const data = await response.json();

      console.log(
        "📥 SIGNUP RESPONSE:",
        data
      );


      // Signup failed
      if (!response.ok || !data.success) {

        alert(
          data.message ||
          "Unable to create account."
        );

        return;
      }


      // Signup successful
      alert(
        data.message ||
        "Account created successfully!"
      );


      console.log(
        "✅ Account created:",
        data.user
      );


      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");


      // Switch to login
      setIsSignUp(false);

    } catch (error) {

      console.error(
        "❌ SIGNUP ERROR:",
        error
      );

      alert(
        "Cannot connect to the backend. Make sure Node.js server is running on port 5000."
      );

    } finally {

      setLoading(false);

    }
  };


  // ===================================================
  // GOOGLE LOGIN
  // ===================================================

  const handleGoogleSuccess = (
    credentialResponse
  ) => {

    try {

      console.log(
        "Google Login Success:",
        credentialResponse
      );


      const token =
        credentialResponse?.credential;


      if (!token) {

        alert(
          "Google login failed."
        );

        return;
      }


      // Decode JWT
      const base64Url =
        token.split(".")[1];


      const base64 =
        base64Url
          .replace(/-/g, "+")
          .replace(/_/g, "/");


      const jsonPayload =
        decodeURIComponent(
          atob(base64)
            .split("")
            .map(
              (c) =>
                "%" +
                (
                  "00" +
                  c
                    .charCodeAt(0)
                    .toString(16)
                ).slice(-2)
            )
            .join("")
        );


      const userInfo =
        JSON.parse(jsonPayload);


      console.log(
        "Google User Info:",
        userInfo
      );


      const googleUser = {

        id:
          userInfo.sub || "",

        email:
          userInfo.email || "",

        name:
          userInfo.name ||
          userInfo.email ||
          "Google User",

        provider:
          "google",

        picture:
          userInfo.picture || "",
      };


      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(googleUser)
      );


      // Continue to app
      if (onLoginSuccess) {

        onLoginSuccess(
          googleUser
        );

      }

    } catch (error) {

      console.error(
        "❌ Google token error:",
        error
      );

      alert(
        "Google login failed. Please try again."
      );
    }
  };


  // ===================================================
  // GOOGLE LOGIN ERROR
  // ===================================================

  const handleGoogleError = () => {

    console.error(
      "❌ Google Login Failed"
    );

    alert(
      "Google login failed. Please try again."
    );
  };


  // ===================================================
  // DEMO GOOGLE LOGIN
  // ===================================================

  const handleDemoGoogleLogin = () => {

    const demoUser = {

      email:
        "demo@gmail.com",

      name:
        "Demo User",

      provider:
        "google",

      picture:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser",
    };


    console.log(
      "Demo Google Login:",
      demoUser
    );


    localStorage.setItem(
      "user",
      JSON.stringify(demoUser)
    );


    if (onLoginSuccess) {

      onLoginSuccess(
        demoUser
      );

    }
  };


  // ===================================================
  // SWITCH TO SIGNUP
  // ===================================================

  const switchToSignup = (e) => {

    e.preventDefault();

    setIsSignUp(true);

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };


  // ===================================================
  // SWITCH TO LOGIN
  // ===================================================

  const switchToLogin = (e) => {

    e.preventDefault();

    setIsSignUp(false);

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };


  // ===================================================
  // FORGOT PASSWORD
  // ===================================================

  const handleForgotPassword = (e) => {

    e.preventDefault();

    alert(
      "Forgot password feature will be available soon."
    );
  };


  // ===================================================
  // RETURN
  // ===================================================

  return (

    <div className="login-page">

      {/* Background */}
      <div className="background-overlay"></div>


      {/* Login Card */}
      <div className="login-card">


        {/* =========================================
            LOGO
        ========================================= */}

        <div className="logo">

          <div className="logo-icon">
            ⌂
          </div>

          <span>
            SmartHome
          </span>

        </div>


        {/* =========================================
            HEADER
        ========================================= */}

        <div className="login-header">

          <h1>
            {isSignUp
              ? "Create Account"
              : "Welcome Back!"}
          </h1>

          <p>
            {isSignUp
              ? "Join us today"
              : "Sign in to your account"}
          </p>

        </div>


        {/* =========================================
            FORM
        ========================================= */}

        <form
          onSubmit={
            isSignUp
              ? handleSignup
              : handleLogin
          }
        >


          {/* =======================================
              NAME
          ======================================= */}

          {isSignUp && (

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                autoComplete="name"
              />

            </div>

          )}


          {/* =======================================
              EMAIL
          ======================================= */}

          <div className="form-group">

            <label>
              Email
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


          {/* =======================================
              PASSWORD
          ======================================= */}

          <div className="form-group">

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
              autoComplete={
                isSignUp
                  ? "new-password"
                  : "current-password"
              }
            />

          </div>


          {/* =======================================
              PASSWORD REQUIREMENTS
          ======================================= */}

          {isSignUp &&
            password.length > 0 && (

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


          {/* =======================================
              CONFIRM PASSWORD
          ======================================= */}

          {isSignUp && (

            <div className="form-group">

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


              {confirmPassword.length > 0 && (

                <p
                  className={
                    password ===
                    confirmPassword
                      ? "password-match"
                      : "password-no-match"
                  }
                >

                  {password ===
                  confirmPassword
                    ? "✓ Passwords match"
                    : "✕ Passwords do not match"}

                </p>

              )}

            </div>

          )}


          {/* =======================================
              REMEMBER ME
          ======================================= */}

          {!isSignUp && (

            <div className="form-options">

              <label className="remember">

                <input
                  type="checkbox"
                  defaultChecked={false}
                />

                <span>
                  Remember me
                </span>

              </label>


              <a
                href="#"
                className="forgot"
                onClick={
                  handleForgotPassword
                }
              >
                Forgot Password?
              </a>

            </div>

          )}


          {/* =======================================
              SUBMIT BUTTON
          ======================================= */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading
              ? "Please wait..."
              : isSignUp
                ? "Sign Up"
                : "Login"}

          </button>

        </form>


        {/* =========================================
            DIVIDER
        ========================================= */}

        <div className="divider">

          <span>
            or continue with
          </span>

        </div>


        {/* =========================================
            GOOGLE LOGIN
        ========================================= */}

        <div className="social-buttons">

          {import.meta.env.VITE_GOOGLE_CLIENT_ID &&
          !import.meta.env.VITE_GOOGLE_CLIENT_ID.includes(
            "YOUR_GOOGLE_CLIENT_ID"
          ) ? (

            <GoogleOAuthProvider
              clientId={
                import.meta.env
                  .VITE_GOOGLE_CLIENT_ID
              }
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >

                <GoogleLogin
                  onSuccess={
                    handleGoogleSuccess
                  }
                  onError={
                    handleGoogleError
                  }
                  theme="dark"
                  size="large"
                  text="signin_with"
                />

              </div>

            </GoogleOAuthProvider>

          ) : (

            <button
              type="button"
              onClick={
                handleDemoGoogleLogin
              }

              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "10px 20px",
                backgroundColor: "white",
                color: "#1f2937",
                border:
                  "1px solid #e5e7eb",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                width: "100%",
                maxWidth: "300px",
              }}
            >

              <span
                style={{
                  fontSize: "18px",
                }}
              >
                🔗
              </span>

              <span>
                Sign in with Google (Demo)
              </span>

            </button>

          )}

        </div>


        {/* =========================================
            SWITCH LOGIN / SIGNUP
        ========================================= */}

        <div className="signup">

          {isSignUp ? (

            <>

              <span>
                Already have an account?
              </span>

              <a
                href="#"
                onClick={
                  switchToLogin
                }
              >
                Sign in
              </a>

            </>

          ) : (

            <>

              <span>
                Don't have an account?
              </span>

              <a
                href="#"
                onClick={
                  switchToSignup
                }
              >
                Sign up
              </a>

            </>

          )}

        </div>

      </div>

    </div>
  );
}
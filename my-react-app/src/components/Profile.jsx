import React, { useEffect, useMemo, useState } from "react";
import "./profile.css";

function Profile({ user, onProfileUpdate }) {
  // =========================================================
  // DEFAULT PROFILE
  // =========================================================

  const defaultProfile = {
    name: user?.name || "Niranjan",
    email: user?.email || "niranjan@example.com",
    phone: user?.phone || "+91 XXXXX XXXXX",
  };

  // =========================================================
  // LOAD PROFILE
  // =========================================================

  const getSavedProfile = () => {
    try {
      const saved = localStorage.getItem("profileData");

      if (saved) {
        const parsed = JSON.parse(saved);

        return {
          ...defaultProfile,
          ...parsed,
        };
      }
    } catch (error) {
      console.error("Unable to load profile:", error);
    }

    return defaultProfile;
  };

  const savedProfile = getSavedProfile();

  // =========================================================
  // STATES
  // =========================================================

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(savedProfile.name);
  const [email, setEmail] = useState(savedProfile.email);
  const [phone, setPhone] = useState(savedProfile.phone);

  const [message, setMessage] = useState("");
  const [activeSetting, setActiveSetting] = useState(null);

  const [subscription, setSubscription] = useState(null);

  const [showPasses, setShowPasses] = useState(false);

  // =========================================================
  // MESSAGE
  // =========================================================

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // =========================================================
  // LOAD SUBSCRIPTION
  // =========================================================

  useEffect(() => {
    try {
      const savedSubscription =
        localStorage.getItem("smartHomeSubscription");

      if (!savedSubscription) {
        setSubscription(null);
        return;
      }

      const parsed = JSON.parse(savedSubscription);

      // Check expiry
      if (parsed.expiryDate <= Date.now()) {
        localStorage.removeItem("smartHomeSubscription");
        setSubscription(null);
        return;
      }

      setSubscription(parsed);
    } catch (error) {
      console.error("Subscription loading error:", error);
      setSubscription(null);
    }
  }, []);

  // =========================================================
  // CHECK SUBSCRIPTION EXPIRY
  // =========================================================

  useEffect(() => {
    const checkSubscription = () => {
      try {
        const saved =
          localStorage.getItem("smartHomeSubscription");

        if (!saved) return;

        const parsed = JSON.parse(saved);

        if (parsed.expiryDate <= Date.now()) {
          localStorage.removeItem("smartHomeSubscription");
          setSubscription(null);
          showMessage("Your SmartHome Pass has expired.");
        } else {
          setSubscription(parsed);
        }
      } catch (error) {
        console.error("Subscription check error:", error);
      }
    };

    const interval = setInterval(
      checkSubscription,
      60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  // =========================================================
  // PROFILE COMPLETION
  // =========================================================

  const completion = useMemo(() => {
    let score = 0;

    if (name.trim()) score += 34;
    if (email.trim()) score += 33;
    if (phone.trim() && !phone.includes("XXXXX")) score += 33;

    return Math.min(score, 100);
  }, [name, email, phone]);

  // =========================================================
  // LOAD SAVED PROFILE DATA
  // =========================================================

  useEffect(() => {
    try {
      const saved = localStorage.getItem("profileData");

      if (!saved) return;

      const profile = JSON.parse(saved);

      setName(profile.name || defaultProfile.name);
      setEmail(profile.email || defaultProfile.email);
      setPhone(profile.phone || defaultProfile.phone);
    } catch (error) {
      console.error("Profile loading error:", error);
    }
  }, []);

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateProfile = () => {
    if (!name.trim()) {
      showMessage("Please enter your full name.");
      return false;
    }

    if (!email.trim()) {
      showMessage("Please enter your email.");
      return false;
    }

    if (!email.includes("@")) {
      showMessage("Please enter a valid email address.");
      return false;
    }

    if (!phone.trim()) {
      showMessage("Please enter your phone number.");
      return false;
    }

    return true;
  };

  // =========================================================
  // SAVE PROFILE
  // =========================================================

  const handleSave = () => {
    if (!validateProfile()) return;

    const updatedUser = {
      ...(user || {}),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };

    try {
      localStorage.setItem(
        "profileData",
        JSON.stringify(updatedUser)
      );

      localStorage.setItem(
        "smartHomeUser",
        JSON.stringify(updatedUser)
      );

      if (onProfileUpdate) {
        onProfileUpdate(updatedUser);
      }

      setName(updatedUser.name);
      setEmail(updatedUser.email);
      setPhone(updatedUser.phone);

      setIsEditing(false);

      showMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Profile save error:", error);

      showMessage("Unable to save profile.");
    }
  };

  // =========================================================
  // CANCEL
  // =========================================================

  const handleCancel = () => {
    const saved = getSavedProfile();

    setName(saved.name);
    setEmail(saved.email);
    setPhone(saved.phone);

    setIsEditing(false);

    showMessage("Changes discarded.");
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = () => {
    setIsEditing(true);
  };

  // =========================================================
  // SETTINGS
  // =========================================================

  const handleSettingClick = (setting) => {
    setActiveSetting(setting);

    showMessage(`${setting} settings selected.`);
  };

  // =========================================================
  // GET DAYS REMAINING
  // =========================================================

  const getDaysRemaining = () => {
    if (!subscription) return 0;

    const difference =
      subscription.expiryDate - Date.now();

    return Math.max(
      0,
      Math.ceil(
        difference / (1000 * 60 * 60 * 24)
      )
    );
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // BUY / ACTIVATE PASS
  // =========================================================

  const activatePass = (type) => {
    const now = new Date();

    let expiryDate;
    let durationDays;

    if (type === "Monthly") {
      expiryDate = new Date(now);
      expiryDate.setMonth(
        expiryDate.getMonth() + 1
      );
      durationDays = 30;
    } else {
      expiryDate = new Date(now);
      expiryDate.setFullYear(
        expiryDate.getFullYear() + 1
      );
      durationDays = 365;
    }

    const newSubscription = {
      type,
      startDate: now.getTime(),
      expiryDate: expiryDate.getTime(),
      durationDays,
      status: "active",
    };

    localStorage.setItem(
      "smartHomeSubscription",
      JSON.stringify(newSubscription)
    );

    setSubscription(newSubscription);

    setShowPasses(false);

    showMessage(
      `${type} Pass activated successfully!`
    );
  };

  // =========================================================
  // REMOVE / CANCEL PASS
  // =========================================================

  const cancelPass = () => {
    localStorage.removeItem(
      "smartHomeSubscription"
    );

    setSubscription(null);

    showMessage("SmartHome Pass cancelled.");
  };

  // =========================================================
  // PASS ACTIVE
  // =========================================================

  const isPassActive =
    subscription &&
    subscription.status === "active" &&
    subscription.expiryDate > Date.now();

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div className="profile-page">

      {/* =====================================================
          TOAST
      ===================================================== */}

      {message && (
        <div className="profile-toast">
          <span className="toast-check">✓</span>
          <span>{message}</span>
        </div>
      )}

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="profile-hero">

        <div className="hero-content">

          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot"></span>
            ACCOUNT CENTER
          </div>

          <h1>My Profile</h1>

          <p>
            Manage your personal information, account
            details, subscription and SmartHome preferences.
          </p>

        </div>

        <div className="hero-status">

          <span className="hero-status-dot"></span>

          <div>
            <strong>
              {isPassActive
                ? "Premium Active"
                : "Account Active"}
            </strong>

            <small>
              {isPassActive
                ? `${subscription.type} Pass`
                : "Free Account"}
            </small>
          </div>

        </div>

      </section>

      {/* =====================================================
          MAIN PROFILE CARD
      ===================================================== */}

      <section className="profile-main-card">

        <div className="profile-main-background"></div>

        <div className="profile-main-content">

          <div className="profile-identity">

            {!isEditing ? (
              <>
                <div className="identity-name-row">

                  <h2>{name}</h2>

                  <span className="verified-badge">
                    ✓ Verified
                  </span>

                </div>

                <p className="identity-email">
                  {email}
                </p>

                <div className="identity-meta">

                  <span>
                    <span className="meta-icon">
                      ◆
                    </span>
                    {isPassActive
                      ? `${subscription.type} Pass`
                      : "Free Member"}
                  </span>

                  <span>
                    <span className="meta-icon">
                      ●
                    </span>
                    Account Active
                  </span>

                </div>
              </>
            ) : (
              <div className="profile-edit-summary">

                <span className="edit-label">
                  EDITING PROFILE
                </span>

                <h2>
                  Update your information
                </h2>

                <p>
                  Make changes below and save them to
                  your SmartHome account.
                </p>

              </div>
            )}

          </div>

          <div className="profile-top-action">

            {!isEditing ? (
              <button
                type="button"
                className="primary-profile-button"
                onClick={handleEdit}
              >
                <span>✎</span>
                Edit Profile
              </button>
            ) : (
              <div className="profile-action-group">

                <button
                  type="button"
                  className="save-profile-button"
                  onClick={handleSave}
                >
                  <span>✓</span>
                  Save Changes
                </button>

                <button
                  type="button"
                  className="cancel-profile-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

              </div>
            )}

          </div>

        </div>

        {/* =================================================
            PROFILE STATS
        ================================================= */}

        <div className="profile-stats">

          <div className="profile-stat">
            <span className="stat-icon">◈</span>

            <div>
              <strong>
                {isPassActive
                  ? subscription.type
                  : "Free"}
              </strong>

              <small>Plan</small>
            </div>
          </div>

          <div className="profile-stat">
            <span className="stat-icon">◉</span>

            <div>
              <strong>
                {isPassActive
                  ? "Unlocked"
                  : "Locked"}
              </strong>

              <small>Premium</small>
            </div>
          </div>

          <div className="profile-stat">
            <span className="stat-icon">⌁</span>

            <div>
              <strong>SmartHome</strong>
              <small>Connected</small>
            </div>
          </div>

          <div className="profile-stat">
            <span className="stat-icon">✓</span>

            <div>
              <strong>{completion}%</strong>
              <small>Profile Complete</small>
            </div>
          </div>

        </div>

      </section>

      {/* =====================================================
          PASS / SUBSCRIPTION
      ===================================================== */}

      <section className="profile-section subscription-section">

        <div className="section-heading">

          <div>
            <span className="section-eyebrow">
              PREMIUM ACCESS
            </span>

            <h2>SmartHome Pass</h2>

            <p>
              Unlock advanced SmartHome features with
              a monthly or yearly pass.
            </p>
          </div>

          {isPassActive && (
            <div className="subscription-active-label">
              <span></span>
              PASS ACTIVE
            </div>
          )}

        </div>

        {/* ACTIVE PASS */}

        {isPassActive ? (
          <div className="active-pass-card">

            <div className="active-pass-left">

              <div className="pass-crown">
                ★
              </div>

              <div>

                <span className="active-pass-label">
                  CURRENT PLAN
                </span>

                <h3>
                  {subscription.type} Pass
                </h3>

                <p>
                  Your premium SmartHome features are
                  currently unlocked.
                </p>

              </div>

            </div>

            <div className="active-pass-details">

              <div>
                <span>STATUS</span>
                <strong className="active-text">
                  ● Active
                </strong>
              </div>

              <div>
                <span>EXPIRES</span>
                <strong>
                  {formatDate(
                    subscription.expiryDate
                  )}
                </strong>
              </div>

              <div>
                <span>REMAINING</span>
                <strong>
                  {getDaysRemaining()} Days
                </strong>
              </div>

            </div>

            <button
              type="button"
              className="manage-pass-button"
              onClick={() =>
                setShowPasses(!showPasses)
              }
            >
              Change Pass
            </button>

          </div>
        ) : (
          <div className="no-pass-card">

            <div className="lock-circle">
              🔒
            </div>

            <div className="no-pass-content">

              <h3>
                Premium features are locked
              </h3>

              <p>
                Choose a SmartHome Pass to unlock
                advanced automation, analytics, scenes,
                security and more.
              </p>

            </div>

            <button
              type="button"
              className="unlock-button"
              onClick={() =>
                setShowPasses(!showPasses)
              }
            >
              🔓 Unlock Now
            </button>

          </div>
        )}

        {/* =================================================
            PASS OPTIONS
        ================================================= */}

        {showPasses && (
          <div className="pass-options">

            {/* MONTHLY */}

            <div className="pass-card monthly-pass">

              <div className="pass-card-header">

                <div className="pass-icon">
                  ◷
                </div>

                <span className="pass-duration">
                  MONTHLY
                </span>

              </div>

              <h3>
                Monthly Pass
              </h3>

              <div className="pass-price">
                <strong>₹99</strong>
                <span>/ month</span>
              </div>

              <div className="pass-divider"></div>

              <ul>

                <li>
                  <span>✓</span>
                  Unlimited Smart Devices
                </li>

                <li>
                  <span>✓</span>
                  Advanced Automations
                </li>

                <li>
                  <span>✓</span>
                  Custom Scenes
                </li>

                <li>
                  <span>✓</span>
                  Energy Analytics
                </li>

                <li>
                  <span>✓</span>
                  Smart Security
                </li>

              </ul>

              <button
                type="button"
                className="choose-pass-button"
                onClick={() =>
                  activatePass("Monthly")
                }
              >
                Get Monthly Pass
              </button>

            </div>

            {/* YEARLY */}

            <div className="pass-card yearly-pass">

              <div className="recommended-badge">
                ⭐ BEST VALUE
              </div>

              <div className="pass-card-header">

                <div className="pass-icon">
                  ★
                </div>

                <span className="pass-duration">
                  YEARLY
                </span>

              </div>

              <h3>
                Yearly Pass
              </h3>

              <div className="pass-price">
                <strong>₹799</strong>
                <span>/ year</span>
              </div>

              <div className="saving-text">
                Save more with yearly access
              </div>

              <div className="pass-divider"></div>

              <ul>

                <li>
                  <span>✓</span>
                  Unlimited Smart Devices
                </li>

                <li>
                  <span>✓</span>
                  Advanced Automations
                </li>

                <li>
                  <span>✓</span>
                  Custom Scenes
                </li>

                <li>
                  <span>✓</span>
                  Energy Analytics
                </li>

                <li>
                  <span>✓</span>
                  Smart Security
                </li>

                <li>
                  <span>✓</span>
                  Priority Premium Features
                </li>

              </ul>

              <button
                type="button"
                className="choose-pass-button yearly-button"
                onClick={() =>
                  activatePass("Yearly")
                }
              >
                Get Yearly Pass
              </button>

            </div>

          </div>
        )}

        {/* =================================================
            PREMIUM FEATURES
        ================================================= */}

        <div className="premium-features">

          <div className="premium-features-header">

            <div>
              <span className="section-eyebrow">
                PREMIUM FEATURES
              </span>

              <h3>
                {isPassActive
                  ? "Everything is unlocked"
                  : "Unlock more from SmartHome"}
              </h3>
            </div>

            <span
              className={`unlock-status ${
                isPassActive
                  ? "unlocked"
                  : "locked"
              }`}
            >
              {isPassActive
                ? "✓ UNLOCKED"
                : "🔒 LOCKED"}
            </span>

          </div>

          <div className="premium-feature-grid">

            <div
              className={`premium-feature ${
                !isPassActive
                  ? "feature-locked"
                  : ""
              }`}
            >
              <span>⚡</span>
              <div>
                <strong>
                  Advanced Automation
                </strong>
                <small>
                  Create unlimited routines
                </small>
              </div>
              {!isPassActive && <b>🔒</b>}
            </div>

            <div
              className={`premium-feature ${
                !isPassActive
                  ? "feature-locked"
                  : ""
              }`}
            >
              <span>◈</span>
              <div>
                <strong>
                  Smart Scenes
                </strong>
                <small>
                  Build advanced scenes
                </small>
              </div>
              {!isPassActive && <b>🔒</b>}
            </div>

            <div
              className={`premium-feature ${
                !isPassActive
                  ? "feature-locked"
                  : ""
              }`}
            >
              <span>◉</span>
              <div>
                <strong>
                  Energy Analytics
                </strong>
                <small>
                  Detailed energy insights
                </small>
              </div>
              {!isPassActive && <b>🔒</b>}
            </div>

            <div
              className={`premium-feature ${
                !isPassActive
                  ? "feature-locked"
                  : ""
              }`}
            >
              <span>🛡</span>
              <div>
                <strong>
                  Smart Security
                </strong>
                <small>
                  Advanced security controls
                </small>
              </div>
              {!isPassActive && <b>🔒</b>}
            </div>

          </div>

        </div>

        {/* CANCEL */}

        {isPassActive && (
          <button
            type="button"
            className="cancel-pass-link"
            onClick={cancelPass}
          >
            Cancel current pass
          </button>
        )}

      </section>

      {/* =====================================================
          EDIT FORM
      ===================================================== */}

      {isEditing && (
        <section className="profile-section edit-profile-section">

          <div className="section-heading">

            <div>

              <span className="section-eyebrow">
                PROFILE DETAILS
              </span>

              <h2>Personal Information</h2>

              <p>
                Keep your account information accurate
                and up to date.
              </p>

            </div>

            <div className="completion-box">

              <div className="completion-top">
                <span>
                  Profile completion
                </span>

                <strong>
                  {completion}%
                </strong>
              </div>

              <div className="completion-bar">

                <span
                  style={{
                    width: `${completion}%`,
                  }}
                ></span>

              </div>

            </div>

          </div>

          <div className="profile-form-grid">

            <div className="profile-form-field">

              <label>Full Name</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ◎
                </span>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your full name"
                />

              </div>

            </div>

            <div className="profile-form-field">

              <label>Email Address</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  @
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                />

              </div>

            </div>

            <div className="profile-form-field">

              <label>Phone Number</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ⌕
                </span>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="Enter your phone number"
                />

              </div>

            </div>

            <div className="profile-form-field">

              <label>Account Type</label>

              <div className="input-wrapper readonly-input">

                <span className="input-icon">
                  ◆
                </span>

                <input
                  type="text"
                  value={
                    isPassActive
                      ? `${subscription.type} Pass`
                      : "Free Account"
                  }
                  readOnly
                />

                <span className="locked-text">
                  {isPassActive
                    ? "Active"
                    : "Free"}
                </span>

              </div>

            </div>

          </div>

        </section>
      )}

      {/* =====================================================
          VIEW INFORMATION
      ===================================================== */}

      {!isEditing && (
        <section className="profile-section">

          <div className="section-heading">

            <div>

              <span className="section-eyebrow">
                ACCOUNT INFORMATION
              </span>

              <h2>Personal Information</h2>

              <p>
                Your saved SmartHome account information.
              </p>

            </div>

            <div className="secure-label">
              <span>●</span>
              Private & Secure
            </div>

          </div>

          <div className="profile-info-grid">

            <div className="info-card">

              <div className="info-card-icon">
                ◎
              </div>

              <div>
                <span>Full Name</span>
                <strong>{name}</strong>
              </div>

            </div>

            <div className="info-card">

              <div className="info-card-icon">
                @
              </div>

              <div>
                <span>Email Address</span>
                <strong>{email}</strong>
              </div>

            </div>

            <div className="info-card">

              <div className="info-card-icon">
                ⌕
              </div>

              <div>
                <span>Phone Number</span>
                <strong>{phone}</strong>
              </div>

            </div>

            <div className="info-card">

              <div className="info-card-icon premium-info-icon">
                ◆
              </div>

              <div>
                <span>Current Pass</span>

                <strong>
                  {isPassActive
                    ? `${subscription.type} Pass`
                    : "No Active Pass"}
                </strong>

              </div>

            </div>

          </div>

        </section>
      )}

      {/* =====================================================
          ACCOUNT SETTINGS
      ===================================================== */}

      <section className="profile-section">

        <div className="section-heading">

          <div>

            <span className="section-eyebrow">
              CONTROL CENTER
            </span>

            <h2>Account Settings</h2>

            <p>
              Configure your SmartHome account experience.
            </p>

          </div>

        </div>

        <div className="settings-grid">

          <button
            type="button"
            className={`advanced-setting-card ${
              activeSetting === "Security"
                ? "setting-active"
                : ""
            }`}
            onClick={() =>
              handleSettingClick("Security")
            }
          >

            <div className="setting-card-top">

              <div className="advanced-setting-icon security-icon">
                🔒
              </div>

              <span className="setting-arrow">
                →
              </span>

            </div>

            <div className="setting-card-content">

              <h3>Security</h3>

              <p>
                Manage your password, account
                protection, and security preferences.
              </p>

            </div>

            <div className="setting-status">
              <span></span>
              Protected
            </div>

          </button>

          <button
            type="button"
            className={`advanced-setting-card ${
              activeSetting === "Notifications"
                ? "setting-active"
                : ""
            }`}
            onClick={() =>
              handleSettingClick("Notifications")
            }
          >

            <div className="setting-card-top">

              <div className="advanced-setting-icon notification-icon">
                🔔
              </div>

              <span className="setting-arrow">
                →
              </span>

            </div>

            <div className="setting-card-content">

              <h3>Notifications</h3>

              <p>
                Control alerts, device updates,
                and important SmartHome notifications.
              </p>

            </div>

            <div className="setting-status">
              <span></span>
              Enabled
            </div>

          </button>

          <button
            type="button"
            className={`advanced-setting-card ${
              activeSetting === "Preferences"
                ? "setting-active"
                : ""
            }`}
            onClick={() =>
              handleSettingClick("Preferences")
            }
          >

            <div className="setting-card-top">

              <div className="advanced-setting-icon preference-icon">
                ⚙
              </div>

              <span className="setting-arrow">
                →
              </span>

            </div>

            <div className="setting-card-content">

              <h3>Preferences</h3>

              <p>
                Customize your SmartHome interface
                and personal experience.
              </p>

            </div>

            <div className="setting-status">
              <span></span>
              Customized
            </div>

          </button>

        </div>

      </section>

      {/* =====================================================
          SECURITY BANNER
      ===================================================== */}

      <section className="profile-security-banner">

        <div className="security-banner-icon">
          ✓
        </div>

        <div className="security-banner-content">

          <strong>
            Your account is secure
          </strong>

          <p>
            Your profile information and SmartHome
            preferences are stored locally within
            your application.
          </p>

        </div>

        <div className="security-banner-badge">
          Protected
        </div>

      </section>

    </div>
  );
}

export default Profile;
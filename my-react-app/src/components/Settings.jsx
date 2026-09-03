import React, { useState } from "react";
import "./Settings.css";

export default function Settings({ theme, toggleTheme }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [activePanel, setActivePanel] = useState(null);

  // ================================
  // PERSONAL INFORMATION
  // ================================

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Niranjan",
    email: "niranjan@example.com",
    phone: "+91 9876543210",
    address: "123 Smart Street",
    city: "Hyderabad",
    country: "India",
    zipCode: "500001",
  });

  const [editingPersonalInfo, setEditingPersonalInfo] =
    useState(personalInfo);

  // ================================
  // PASSWORD
  // ================================

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ================================
  // NOTIFICATIONS
  // ================================

  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    security: true,
    deviceAlerts: true,
    automationAlerts: true,
    energyReports: false,
  });

  // ================================
  // GENERAL SETTINGS
  // ================================

  const [generalSettings, setGeneralSettings] = useState({
    autoRefresh: true,
    sounds: true,
    animations: true,
    compactMode: false,
  });

  // ================================
  // UNITS
  // ================================

  const [units, setUnits] = useState({
    temperature: "Celsius",
    energy: "kWh",
    distance: "Kilometers",
    time: "12-hour",
  });

  // ================================
  // SUPPORT
  // ================================

  const [supportMessage, setSupportMessage] = useState("");

  // ================================
  // SETTINGS DATA
  // ================================

  const settingsData = [
    {
      category: "Account",
      items: [
        {
          title: "Personal Information",
          icon: "👤",
          description: "Manage your profile and personal details",
        },
        {
          title: "Change Password",
          icon: "🔐",
          description: "Update your account password",
        },
        {
          title: "Notification Settings",
          icon: "🔔",
          description: "Control alerts and notifications",
        },
      ],
    },
    {
      category: "Preferences",
      items: [
        {
          title: "General Settings",
          icon: "⚙️",
          description: "Customize application behavior",
        },
        {
          title: "Units & Formats",
          icon: "📐",
          description: "Configure units, time and display formats",
        },
        {
          title: "Theme",
          icon: theme === "dark" ? "🌙" : "☀️",
          value: theme === "dark" ? "Dark" : "Light",
          description: "Switch between light and dark appearance",
        },
      ],
    },
    {
      category: "Support",
      items: [
        {
          title: "Help Center",
          icon: "❓",
          description: "Find answers and useful information",
        },
        {
          title: "Contact Support",
          icon: "💬",
          description: "Get help from our support team",
        },
        {
          title: "About SmartHome",
          icon: "ℹ️",
          description: "Learn more about SmartHome",
        },
      ],
    },
  ];

  // ================================
  // OPEN PANEL
  // ================================

  const handleItemClick = (title) => {
    if (title === "Theme") {
      toggleTheme();
      return;
    }

    if (title === "Personal Information") {
      setEditingPersonalInfo({ ...personalInfo });
    }

    setActivePanel(title);
  };

  // ================================
  // CLOSE PANEL
  // ================================

  const closePanel = () => {
    setActivePanel(null);
  };

  // ================================
  // SAVE PERSONAL INFORMATION
  // ================================

  const savePersonalInfo = () => {
    setPersonalInfo({ ...editingPersonalInfo });
    alert("Personal information updated successfully.");
    closePanel();
  };

  // ================================
  // CHANGE PASSWORD
  // ================================

  const handlePasswordChange = () => {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      alert("Password must contain at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    alert("Password changed successfully.");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    closePanel();
  };

  // ================================
  // TOGGLE HELPERS
  // ================================

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleGeneral = (key) => {
    setGeneralSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // ================================
  // SAVE UNITS
  // ================================

  const saveUnits = () => {
    alert("Units and formats saved successfully.");
    closePanel();
  };

  // ================================
  // SEND SUPPORT
  // ================================

  const sendSupportMessage = () => {
    if (!supportMessage.trim()) {
      alert("Please enter your message.");
      return;
    }

    alert("Your support request has been submitted.");
    setSupportMessage("");
    closePanel();
  };

  // ================================
  // RENDER PANEL CONTENT
  // ================================

  const renderPanelContent = () => {
    switch (activePanel) {
      // ==========================================
      // PERSONAL INFORMATION
      // ==========================================

      case "Personal Information":
        return (
          <>
            <div className="panel-icon">👤</div>

            <h2>Personal Information</h2>

            <p className="panel-description">
              Manage your personal details and account information.
            </p>

            <div className="settings-form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  value={editingPersonalInfo.fullName}
                  onChange={(e) =>
                    setEditingPersonalInfo({
                      ...editingPersonalInfo,
                      fullName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={editingPersonalInfo.email}
                  onChange={(e) =>
                    setEditingPersonalInfo({
                      ...editingPersonalInfo,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={editingPersonalInfo.phone}
                  onChange={(e) =>
                    setEditingPersonalInfo({
                      ...editingPersonalInfo,
                      phone: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  value={editingPersonalInfo.city}
                  onChange={(e) =>
                    setEditingPersonalInfo({
                      ...editingPersonalInfo,
                      city: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group full-width">
                <label>Address</label>
                <input
                  value={editingPersonalInfo.address}
                  onChange={(e) =>
                    setEditingPersonalInfo({
                      ...editingPersonalInfo,
                      address: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Country</label>
                <input
                  value={editingPersonalInfo.country}
                  onChange={(e) =>
                    setEditingPersonalInfo({
                      ...editingPersonalInfo,
                      country: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>ZIP / Postal Code</label>
                <input
                  value={editingPersonalInfo.zipCode}
                  onChange={(e) =>
                    setEditingPersonalInfo({
                      ...editingPersonalInfo,
                      zipCode: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="panel-actions">
              <button className="secondary-button" onClick={closePanel}>
                Cancel
              </button>

              <button
                className="primary-button"
                onClick={savePersonalInfo}
              >
                Save Changes
              </button>
            </div>
          </>
        );

      // ==========================================
      // CHANGE PASSWORD
      // ==========================================

      case "Change Password":
        return (
          <>
            <div className="panel-icon">🔐</div>

            <h2>Change Password</h2>

            <p className="panel-description">
              Create a strong password to keep your SmartHome account secure.
            </p>

            <div className="form-group">
              <label>Current Password</label>

              <input
                type="password"
                placeholder="Enter current password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>New Password</label>

              <input
                type="password"
                placeholder="Enter new password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
              />

              <span className="input-hint">
                Minimum 8 characters recommended.
              </span>
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>

              <input
                type="password"
                placeholder="Confirm new password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>

            <div className="panel-actions">
              <button className="secondary-button" onClick={closePanel}>
                Cancel
              </button>

              <button
                className="primary-button"
                onClick={handlePasswordChange}
              >
                Update Password
              </button>
            </div>
          </>
        );

      // ==========================================
      // NOTIFICATIONS
      // ==========================================

      case "Notification Settings":
        return (
          <>
            <div className="panel-icon">🔔</div>

            <h2>Notification Settings</h2>

            <p className="panel-description">
              Choose which SmartHome notifications you want to receive.
            </p>

            <div className="option-list">

              {[
                ["push", "Push Notifications", "Receive alerts directly in the app."],
                ["email", "Email Notifications", "Receive important updates by email."],
                ["security", "Security Alerts", "Get notified about security events."],
                ["deviceAlerts", "Device Alerts", "Know when devices change status."],
                ["automationAlerts", "Automation Alerts", "Receive automation activity updates."],
                ["energyReports", "Energy Reports", "Receive energy usage summaries."],
              ].map(([key, title, description]) => (
                <div className="option-row" key={key}>
                  <div>
                    <strong>{title}</strong>
                    <span>{description}</span>
                  </div>

                  <button
                    className={`toggle-switch ${
                      notifications[key] ? "active" : ""
                    }`}
                    onClick={() => toggleNotification(key)}
                  >
                    <span />
                  </button>
                </div>
              ))}

            </div>

            <div className="panel-actions">
              <button className="primary-button" onClick={closePanel}>
                Done
              </button>
            </div>
          </>
        );

      // ==========================================
      // GENERAL SETTINGS
      // ==========================================

      case "General Settings":
        return (
          <>
            <div className="panel-icon">⚙️</div>

            <h2>General Settings</h2>

            <p className="panel-description">
              Customize how the SmartHome application behaves.
            </p>

            <div className="option-list">

              {[
                ["autoRefresh", "Automatic Refresh", "Keep dashboard information updated automatically."],
                ["sounds", "Interface Sounds", "Enable interface interaction sounds."],
                ["animations", "Smooth Animations", "Enable modern interface animations."],
                ["compactMode", "Compact Mode", "Use a more compact dashboard layout."],
              ].map(([key, title, description]) => (
                <div className="option-row" key={key}>
                  <div>
                    <strong>{title}</strong>
                    <span>{description}</span>
                  </div>

                  <button
                    className={`toggle-switch ${
                      generalSettings[key] ? "active" : ""
                    }`}
                    onClick={() => toggleGeneral(key)}
                  >
                    <span />
                  </button>
                </div>
              ))}

            </div>

            <div className="panel-actions">
              <button className="primary-button" onClick={closePanel}>
                Save Preferences
              </button>
            </div>
          </>
        );

      // ==========================================
      // UNITS
      // ==========================================

      case "Units & Formats":
        return (
          <>
            <div className="panel-icon">📐</div>

            <h2>Units & Formats</h2>

            <p className="panel-description">
              Choose how measurements and information are displayed.
            </p>

            <div className="form-group">
              <label>Temperature</label>

              <select
                value={units.temperature}
                onChange={(e) =>
                  setUnits({
                    ...units,
                    temperature: e.target.value,
                  })
                }
              >
                <option>Celsius</option>
                <option>Fahrenheit</option>
              </select>
            </div>

            <div className="form-group">
              <label>Energy</label>

              <select
                value={units.energy}
                onChange={(e) =>
                  setUnits({
                    ...units,
                    energy: e.target.value,
                  })
                }
              >
                <option>kWh</option>
                <option>Wh</option>
              </select>
            </div>

            <div className="form-group">
              <label>Distance</label>

              <select
                value={units.distance}
                onChange={(e) =>
                  setUnits({
                    ...units,
                    distance: e.target.value,
                  })
                }
              >
                <option>Kilometers</option>
                <option>Miles</option>
              </select>
            </div>

            <div className="form-group">
              <label>Time Format</label>

              <select
                value={units.time}
                onChange={(e) =>
                  setUnits({
                    ...units,
                    time: e.target.value,
                  })
                }
              >
                <option>12-hour</option>
                <option>24-hour</option>
              </select>
            </div>

            <div className="panel-actions">
              <button className="secondary-button" onClick={closePanel}>
                Cancel
              </button>

              <button className="primary-button" onClick={saveUnits}>
                Save Changes
              </button>
            </div>
          </>
        );

      // ==========================================
      // HELP CENTER
      // ==========================================

      case "Help Center":
        return (
          <>
            <div className="panel-icon">❓</div>

            <h2>Help Center</h2>

            <p className="panel-description">
              Find quick answers about your SmartHome system.
            </p>

            <div className="help-list">

              <div className="help-card">
                <strong>How do I add a device?</strong>
                <span>
                  Open the Devices page and select Add Device to connect a
                  compatible smart device.
                </span>
              </div>

              <div className="help-card">
                <strong>How do I create an automation?</strong>
                <span>
                  Go to Automation and create a routine using triggers,
                  conditions and actions.
                </span>
              </div>

              <div className="help-card">
                <strong>How do I change the theme?</strong>
                <span>
                  Open Settings and click Theme to switch between Light and
                  Dark mode.
                </span>
              </div>

              <div className="help-card">
                <strong>Why is my device offline?</strong>
                <span>
                  Check the device power, Wi-Fi connection and make sure the
                  device is connected to your SmartHome network.
                </span>
              </div>

              <div className="help-card">
                <strong>How can I monitor energy usage?</strong>
                <span>
                  Open the Energy page to view consumption and usage trends.
                </span>
              </div>

            </div>

            <div className="panel-actions">
              <button className="primary-button" onClick={closePanel}>
                Close Help Center
              </button>
            </div>
          </>
        );

      // ==========================================
      // CONTACT SUPPORT
      // ==========================================

      case "Contact Support":
        return (
          <>
            <div className="panel-icon">💬</div>

            <h2>Contact Support</h2>

            <p className="panel-description">
              Tell us what you need help with and our support team can assist
              you.
            </p>

            <div className="form-group">
              <label>Your Message</label>

              <textarea
                rows="6"
                placeholder="Describe your issue..."
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
              />
            </div>

            <div className="panel-actions">
              <button className="secondary-button" onClick={closePanel}>
                Cancel
              </button>

              <button
                className="primary-button"
                onClick={sendSupportMessage}
              >
                Send Request
              </button>
            </div>
          </>
        );

      // ==========================================
      // ABOUT
      // ==========================================

      case "About SmartHome":
        return (
          <>
            <div className="about-logo">
              <span>⌂</span>
            </div>

            <h2>SmartHome</h2>

            <p className="version-text">
              Smart Home Automation Platform
            </p>

            <div className="about-content">

              <div className="about-stat">
                <strong>1.0.0</strong>
                <span>Version</span>
              </div>

              <div className="about-stat">
                <strong>Smart</strong>
                <span>Technology</span>
              </div>

              <div className="about-stat">
                <strong>24/7</strong>
                <span>Automation</span>
              </div>

            </div>

            <p className="about-description">
              SmartHome gives you one central place to monitor devices,
              automate routines, manage scenes, track energy and protect
              your home.
            </p>

            <div className="panel-actions">
              <button className="primary-button" onClick={closePanel}>
                Done
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // ================================
  // RETURN
  // ================================

  return (
    <div
      className={`settings-container ${
        theme === "dark" ? "dark-mode" : "light-mode"
      }`}
    >

      {/* HEADER */}

      <header className="settings-header">
        <div>
          <p className="settings-eyebrow">CONTROL CENTER</p>

          <h1>Settings</h1>

          <p>
            Manage your preferences, account and SmartHome experience.
          </p>
        </div>

        <div className="settings-status">
          <span className="status-dot" />
          System Online
        </div>
      </header>

      {/* SETTINGS */}

      <div className="settings-grid">

        {settingsData.map((group, groupIdx) => (
          <section className="settings-section" key={group.category}>

            <div className="settings-group-header">
              <h2>{group.category}</h2>

              <span>
                {group.items.length}{" "}
                {group.items.length === 1 ? "option" : "options"}
              </span>
            </div>

            <div className="settings-card">

              {group.items.map((item, itemIdx) => {

                const uniqueKey = `${groupIdx}-${itemIdx}`;

                const isHovered = hoveredIdx === uniqueKey;

                return (
                  <button
                    key={item.title}
                    className={`settings-row ${
                      isHovered ? "settings-row-hover" : ""
                    }`}
                    onClick={() => handleItemClick(item.title)}
                    onMouseEnter={() =>
                      setHoveredIdx(uniqueKey)
                    }
                    onMouseLeave={() =>
                      setHoveredIdx(null)
                    }
                  >

                    <div className="settings-row-left">

                      <div className="settings-icon">
                        {item.icon}
                      </div>

                      <div className="settings-row-text">

                        <span className="settings-row-title">
                          {item.title}
                        </span>

                        <span className="settings-row-description">
                          {item.description}
                        </span>

                      </div>

                    </div>

                    <div className="settings-row-right">

                      {item.value && (
                        <span className="settings-row-value">
                          {item.value}
                        </span>
                      )}

                      <span
                        className={`settings-arrow ${
                          isHovered ? "arrow-hover" : ""
                        }`}
                      >
                        →
                      </span>

                    </div>

                  </button>
                );
              })}

            </div>

          </section>
        ))}

      </div>

      {/* =====================================
          RELATED SETTINGS PANEL
      ===================================== */}

      {activePanel && (
        <div
          className="settings-overlay"
          onClick={closePanel}
        >

          <div
            className={`settings-modal ${
              activePanel === "Personal Information"
                ? "large-modal"
                : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={closePanel}
              aria-label="Close"
            >
              ×
            </button>

            <div className="modal-content">
              {renderPanelContent()}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
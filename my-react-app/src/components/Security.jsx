import React, { useState } from "react";
import "./Security.css";

export default function Security() {
  // =====================================================
  // CAMERA DATA
  // =====================================================

  const [cameraList] = useState([
    {
      id: 1,
      name: "Front Door",
      location: "Entrance",
      status: "Live",
      isLive: true,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
    },
    {
      id: 2,
      name: "Living Room",
      location: "Indoor",
      status: "Live",
      isLive: true,
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85",
    },
    {
      id: 3,
      name: "Driveway",
      location: "Outdoor",
      status: "Offline",
      isLive: false,
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85",
    },
  ]);

  // =====================================================
  // SMART LOCKS
  // =====================================================

  const [lockList, setLockList] = useState([
    {
      id: 1,
      name: "Main Door",
      status: "Unlocked",
      isLocked: false,
      lastUnlocked: "Today, 8:30 AM",
      battery: 92,
      location: "Front Entrance",
    },
    {
      id: 2,
      name: "Back Door",
      status: "Locked",
      isLocked: true,
      lastUnlocked: "Today, 7:45 AM",
      battery: 76,
      location: "Back Entrance",
    },
  ]);

  // =====================================================
  // STATES
  // =====================================================

  const [selectedCamera, setSelectedCamera] = useState(null);
  const [selectedLock, setSelectedLock] = useState(null);
  const [activePanel, setActivePanel] = useState(null);
  const [showAllCameras, setShowAllCameras] = useState(false);
  const [showAllLocks, setShowAllLocks] = useState(false);

  // =====================================================
  // LOCK TOGGLE
  // =====================================================

  const toggleLock = (id) => {
    setLockList((prev) =>
      prev.map((lock) =>
        lock.id === id
          ? {
              ...lock,
              isLocked: !lock.isLocked,
              status: !lock.isLocked ? "Locked" : "Unlocked",
              lastUnlocked: !lock.isLocked
                ? lock.lastUnlocked
                : "Just now",
            }
          : lock
      )
    );

    setSelectedLock(null);
  };

  // =====================================================
  // SECURITY SCORE
  // =====================================================

  const lockedDoors = lockList.filter((lock) => lock.isLocked).length;
  const liveCameras = cameraList.filter((camera) => camera.isLive).length;

  const securityScore =
    lockedDoors === lockList.length && liveCameras === cameraList.length
      ? 98
      : lockedDoors >= 1 && liveCameras >= 1
      ? 86
      : 72;

  // =====================================================
  // CAMERA LIST
  // =====================================================

  const visibleCameras = showAllCameras
    ? cameraList
    : cameraList.slice(0, 3);

  // =====================================================
  // LOCK LIST
  // =====================================================

  const visibleLocks = showAllLocks
    ? lockList
    : lockList.slice(0, 2);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="security-container">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="security-header">

        <div className="security-heading">

          <div className="security-title-row">

            <div className="security-shield">
              🛡️
            </div>

            <div>
              <h1>Security Center</h1>

              <p>
                Monitor and protect your home in real time.
              </p>
            </div>

          </div>

          <div className="home-protected">
            <span className="protected-dot"></span>
            Home protected
          </div>

        </div>

        <div className="security-header-actions">

          <button
            className="header-action"
            onClick={() => setActivePanel("activity")}
          >
            <span>◷</span>
            Activity
          </button>

          <button
            className="emergency-btn"
            onClick={() => setActivePanel("emergency")}
          >
            <span>⚠</span>
            Emergency
          </button>

        </div>

      </header>


      {/* =================================================
          SECURITY OVERVIEW
      ================================================= */}

      <section className="security-overview">

        <div className="overview-main">

          <div className="overview-content">

            <div className="overview-label">
              <span className="pulse-dot"></span>
              SECURITY STATUS
            </div>

            <h2>
              Your home is{" "}
              <span>secure.</span>
            </h2>

            <p>
              All connected security systems are being monitored.
              Your home is protected around the clock.
            </p>

            <div className="overview-meta">

              <div>
                <strong>{liveCameras}</strong>
                <span>Live Cameras</span>
              </div>

              <div>
                <strong>{lockedDoors}</strong>
                <span>Doors Locked</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Monitoring</span>
              </div>

            </div>

          </div>

          <div className="security-score">

            <div
              className="score-circle"
              style={{
                "--score": `${securityScore * 3.6}deg`,
              }}
            >
              <div className="score-inner">
                <strong>{securityScore}</strong>
                <span>SECURE</span>
              </div>
            </div>

            <p>Protection Score</p>

          </div>

        </div>

      </section>


      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="stats-grid">

        <button
          className="stat-card"
          onClick={() => setActivePanel("cameras")}
        >

          <div className="stat-icon blue">
            📹
          </div>

          <div className="stat-content">
            <span className="stat-label">
              Cameras
            </span>

            <strong className="stat-number">
              {cameraList.length}
            </strong>

            <span className="stat-status positive">
              {liveCameras} online
            </span>
          </div>

          <span className="stat-arrow">→</span>

        </button>


        <button
          className="stat-card"
          onClick={() => setActivePanel("locks")}
        >

          <div className="stat-icon green">
            🔒
          </div>

          <div className="stat-content">
            <span className="stat-label">
              Door Locks
            </span>

            <strong className="stat-number">
              {lockList.length}
            </strong>

            <span className="stat-status positive">
              {lockedDoors} secured
            </span>
          </div>

          <span className="stat-arrow">→</span>

        </button>


        <button
          className="stat-card"
          onClick={() => setActivePanel("alerts")}
        >

          <div className="stat-icon purple">
            🔔
          </div>

          <div className="stat-content">
            <span className="stat-label">
              Alerts
            </span>

            <strong className="stat-number">
              0
            </strong>

            <span className="stat-status positive">
              No threats detected
            </span>
          </div>

          <span className="stat-arrow">→</span>

        </button>


        <button
          className="stat-card"
          onClick={() => setActivePanel("monitoring")}
        >

          <div className="stat-icon orange">
            👁️
          </div>

          <div className="stat-content">
            <span className="stat-label">
              Monitoring
            </span>

            <strong className="stat-number">
              24/7
            </strong>

            <span className="stat-status positive">
              Active
            </span>
          </div>

          <span className="stat-arrow">→</span>

        </button>

      </div>


      {/* =================================================
          CAMERAS
      ================================================= */}

      <section className="security-section">

        <div className="section-header">

          <div>
            <span className="section-kicker">
              SURVEILLANCE
            </span>

            <h2>Security Cameras</h2>

            <p>
              Live monitoring from around your home.
            </p>
          </div>

          <button
            className="view-all-btn"
            onClick={() =>
              setShowAllCameras(!showAllCameras)
            }
          >
            {showAllCameras ? "Show less" : "View all"}
            <span>→</span>
          </button>

        </div>


        <div className="cameras-grid">

          {visibleCameras.map((cam) => (

            <button
              className={`camera-card ${
                !cam.isLive ? "camera-offline" : ""
              }`}
              key={cam.id}
              onClick={() => setSelectedCamera(cam)}
            >

              <img
                src={cam.image}
                alt={cam.name}
                className={`camera-img ${
                  !cam.isLive ? "grayscale" : ""
                }`}
              />

              <div className="camera-gradient"></div>

              <div className="camera-top">

                <span
                  className={`camera-status ${
                    cam.isLive ? "live" : "offline"
                  }`}
                >
                  <span></span>
                  {cam.status}
                </span>

                <span className="camera-more">
                  ↗
                </span>

              </div>

              <div className="camera-bottom">

                <div>
                  <span className="camera-location">
                    {cam.location}
                  </span>

                  <h3>{cam.name}</h3>
                </div>

                <span className="camera-play">
                  {cam.isLive ? "▶" : "×"}
                </span>

              </div>

            </button>

          ))}

        </div>

      </section>


      {/* =================================================
          LOWER GRID
      ================================================= */}

      <div className="security-lower-grid">

        {/* =================================================
            SMART LOCKS
        ================================================= */}

        <section className="security-section locks-section">

          <div className="section-header">

            <div>
              <span className="section-kicker">
                ACCESS CONTROL
              </span>

              <h2>Smart Locks</h2>

              <p>
                Manage your connected doors.
              </p>
            </div>

            <button
              className="view-all-btn"
              onClick={() =>
                setShowAllLocks(!showAllLocks)
              }
            >
              {showAllLocks ? "Show less" : "View all"}
              <span>→</span>
            </button>

          </div>


          <div className="locks-list">

            {visibleLocks.map((lock) => (

              <div
                className={`lock-card ${
                  lock.isLocked ? "is-locked" : "is-unlocked"
                }`}
                key={lock.id}
              >

                <button
                  className={`lock-icon-box ${
                    lock.isLocked ? "locked" : "unlocked"
                  }`}
                  onClick={() => setSelectedLock(lock)}
                >
                  {lock.isLocked ? "🔒" : "🔓"}
                </button>


                <div className="lock-info">

                  <div className="lock-name-row">

                    <h3>{lock.name}</h3>

                    <span
                      className={`lock-status-badge ${
                        lock.isLocked
                          ? "locked"
                          : "unlocked"
                      }`}
                    >
                      {lock.status}
                    </span>

                  </div>

                  <p>
                    {lock.location}
                  </p>

                  <div className="lock-meta">

                    <span>
                      ◷ {lock.lastUnlocked}
                    </span>

                    <span>
                      🔋 {lock.battery}%
                    </span>

                  </div>

                </div>


                <button
                  className={`lock-switch ${
                    lock.isLocked ? "active" : ""
                  }`}
                  onClick={() => toggleLock(lock.id)}
                  aria-label={`${
                    lock.isLocked ? "Unlock" : "Lock"
                  } ${lock.name}`}
                >
                  <span></span>
                </button>

              </div>

            ))}

          </div>

        </section>


        {/* =================================================
            SECURITY ACTIVITY
        ================================================= */}

        <section className="security-section activity-section">

          <div className="section-header">

            <div>
              <span className="section-kicker">
                LIVE FEED
              </span>

              <h2>Recent Activity</h2>

              <p>
                Latest security events.
              </p>
            </div>

            <button
              className="activity-icon-btn"
              onClick={() => setActivePanel("activity")}
            >
              →
            </button>

          </div>


          <div className="activity-list">

            <ActivityItem
              icon="🔒"
              title="Back Door"
              text="Door locked successfully"
              time="12 min ago"
              type="success"
            />

            <ActivityItem
              icon="📹"
              title="Front Door Camera"
              text="Motion monitoring active"
              time="24 min ago"
              type="info"
            />

            <ActivityItem
              icon="🔓"
              title="Main Door"
              text="Door was unlocked"
              time="1 hr ago"
              type="warning"
            />

            <ActivityItem
              icon="🛡️"
              title="Security System"
              text="Daily security check completed"
              time="2 hrs ago"
              type="success"
            />

          </div>

        </section>

      </div>


      {/* =================================================
          CAMERA MODAL
      ================================================= */}

      {selectedCamera && (

        <div
          className="modal-backdrop"
          onClick={() => setSelectedCamera(null)}
        >

          <div
            className="security-modal camera-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setSelectedCamera(null)}
            >
              ×
            </button>

            <div className="modal-image-wrapper">

              <img
                src={selectedCamera.image}
                alt={selectedCamera.name}
              />

              <span
                className={`modal-live ${
                  selectedCamera.isLive
                    ? "live"
                    : "offline"
                }`}
              >
                ● {selectedCamera.status}
              </span>

            </div>

            <div className="modal-content">

              <span className="section-kicker">
                SECURITY CAMERA
              </span>

              <h2>{selectedCamera.name}</h2>

              <p>
                {selectedCamera.location} surveillance camera.
              </p>

              <div className="modal-info-grid">

                <div>
                  <span>Status</span>
                  <strong>
                    {selectedCamera.status}
                  </strong>
                </div>

                <div>
                  <span>Monitoring</span>
                  <strong>
                    {selectedCamera.isLive
                      ? "Active"
                      : "Unavailable"}
                  </strong>
                </div>

                <div>
                  <span>Resolution</span>
                  <strong>1080p HD</strong>
                </div>

                <div>
                  <span>Connection</span>
                  <strong>Secure</strong>
                </div>

              </div>

              <button
                className="modal-primary-btn"
                onClick={() =>
                  setSelectedCamera(null)
                }
              >
                {selectedCamera.isLive
                  ? "Open Live View"
                  : "Close"}
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =================================================
          LOCK MODAL
      ================================================= */}

      {selectedLock && (

        <div
          className="modal-backdrop"
          onClick={() => setSelectedLock(null)}
        >

          <div
            className="security-modal lock-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setSelectedLock(null)}
            >
              ×
            </button>

            <div className="large-lock-icon">
              {selectedLock.isLocked
                ? "🔒"
                : "🔓"}
            </div>

            <span className="section-kicker">
              SMART LOCK
            </span>

            <h2>{selectedLock.name}</h2>

            <p>
              {selectedLock.location}
            </p>

            <div
              className={`modal-lock-status ${
                selectedLock.isLocked
                  ? "locked"
                  : "unlocked"
              }`}
            >
              <span></span>

              {selectedLock.status}
            </div>

            <div className="modal-lock-details">

              <div>
                <span>Battery</span>
                <strong>
                  {selectedLock.battery}%
                </strong>
              </div>

              <div>
                <span>Last Activity</span>
                <strong>
                  {selectedLock.lastUnlocked}
                </strong>
              </div>

              <div>
                <span>Encryption</span>
                <strong>Secure</strong>
              </div>

            </div>

            <button
              className={`modal-primary-btn ${
                selectedLock.isLocked
                  ? "unlock-action"
                  : ""
              }`}
              onClick={() =>
                toggleLock(selectedLock.id)
              }
            >
              {selectedLock.isLocked
                ? "🔓 Unlock Door"
                : "🔒 Lock Door"}
            </button>

          </div>

        </div>

      )}


      {/* =================================================
          INFORMATION MODAL
      ================================================= */}

      {activePanel && (

        <div
          className="modal-backdrop"
          onClick={() => setActivePanel(null)}
        >

          <div
            className="security-modal info-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setActivePanel(null)}
            >
              ×
            </button>

            {activePanel === "emergency" && (
              <>
                <div className="emergency-icon">
                  ⚠
                </div>

                <span className="section-kicker">
                  EMERGENCY CENTER
                </span>

                <h2>Emergency Controls</h2>

                <p>
                  Emergency controls are available for
                  immediate home protection.
                </p>

                <div className="emergency-actions">

                  <button
                    onClick={() => {
                      alert(
                        "Security alert triggered successfully."
                      );
                      setActivePanel(null);
                    }}
                  >
                    🚨 Trigger Security Alert
                  </button>

                  <button
                    onClick={() => {
                      alert(
                        "All doors have been requested to lock."
                      );
                      setActivePanel(null);
                    }}
                  >
                    🔒 Lock All Doors
                  </button>

                </div>
              </>
            )}

            {activePanel === "activity" && (
              <>
                <div className="info-modal-icon">
                  ◷
                </div>

                <span className="section-kicker">
                  SECURITY LOG
                </span>

                <h2>Security Activity</h2>

                <p>
                  Your home has had no critical security
                  events today.
                </p>

                <div className="large-status-box success-box">
                  <span>✓</span>

                  <div>
                    <strong>
                      No threats detected
                    </strong>

                    <small>
                      System monitoring is active.
                    </small>
                  </div>
                </div>
              </>
            )}

            {activePanel === "alerts" && (
              <>
                <div className="info-modal-icon">
                  🔔
                </div>

                <span className="section-kicker">
                  ALERT CENTER
                </span>

                <h2>Security Alerts</h2>

                <p>
                  Everything looks good.
                </p>

                <div className="large-status-box success-box">
                  <span>✓</span>

                  <div>
                    <strong>
                      0 active alerts
                    </strong>

                    <small>
                      No suspicious activity detected.
                    </small>
                  </div>
                </div>
              </>
            )}

            {activePanel === "monitoring" && (
              <>
                <div className="info-modal-icon">
                  👁️
                </div>

                <span className="section-kicker">
                  MONITORING
                </span>

                <h2>24/7 Monitoring</h2>

                <p>
                  Your connected security devices are
                  continuously monitored.
                </p>

                <div className="large-status-box success-box">
                  <span>●</span>

                  <div>
                    <strong>
                      Monitoring active
                    </strong>

                    <small>
                      {liveCameras} cameras online.
                    </small>
                  </div>
                </div>
              </>
            )}

            {activePanel === "cameras" && (
              <>
                <div className="info-modal-icon">
                  📹
                </div>

                <span className="section-kicker">
                  CAMERA NETWORK
                </span>

                <h2>Camera Overview</h2>

                <p>
                  Manage and monitor all connected cameras.
                </p>

                <div className="large-status-box success-box">
                  <span>✓</span>

                  <div>
                    <strong>
                      {liveCameras} cameras online
                    </strong>

                    <small>
                      {cameraList.length - liveCameras} offline.
                    </small>
                  </div>
                </div>
              </>
            )}

            {activePanel === "locks" && (
              <>
                <div className="info-modal-icon">
                  🔐
                </div>

                <span className="section-kicker">
                  ACCESS CONTROL
                </span>

                <h2>Door Lock Overview</h2>

                <p>
                  Control and monitor all smart locks.
                </p>

                <div className="large-status-box success-box">
                  <span>✓</span>

                  <div>
                    <strong>
                      {lockedDoors} doors secured
                    </strong>

                    <small>
                      {lockList.length - lockedDoors} doors
                      currently unlocked.
                    </small>
                  </div>
                </div>
              </>
            )}

            <button
              className="modal-primary-btn"
              onClick={() => setActivePanel(null)}
            >
              Done
            </button>

          </div>

        </div>

      )}

    </div>
  );
}


// =====================================================
// ACTIVITY ITEM
// =====================================================

function ActivityItem({
  icon,
  title,
  text,
  time,
  type,
}) {
  return (
    <div className="activity-item">

      <div className={`activity-icon ${type}`}>
        {icon}
      </div>

      <div className="activity-content">

        <strong>{title}</strong>

        <p>{text}</p>

      </div>

      <span className="activity-time">
        {time}
      </span>

    </div>
  );
}
import React, { useEffect, useMemo, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  // =====================================================
  // SEARCH
  // =====================================================

  const [search, setSearch] = useState("");

  const [energyPeriod, setEnergyPeriod] =
    useState("This Month");

  // =====================================================
  // DEVICES
  // =====================================================

  const [devices, setDevices] = useState({
    livingRoom: true,
    bedroom: false,
    kitchen: true,
    studyRoom: false,
  });

  const toggleDevice = (device) => {
    setDevices((prev) => ({
      ...prev,
      [device]: !prev[device],
    }));
  };

  const activeDevices =
    Object.values(devices).filter(Boolean).length;

  // =====================================================
  // NOTIFICATIONS
  // =====================================================

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: "💡",
      title: "Smart Light",
      message: "Living Room light is ON",
      time: "Just now",
      type: "success",
    },
    {
      id: 2,
      icon: "🌡️",
      title: "Temperature Alert",
      message: "Bedroom temperature is 28°C",
      time: "5 min ago",
      type: "warning",
    },
    {
      id: 3,
      icon: "🔒",
      title: "Security",
      message: "Main door is locked",
      time: "10 min ago",
      type: "security",
    },
    {
      id: 4,
      icon: "⚡",
      title: "Energy Usage",
      message: "Energy usage increased today",
      time: "20 min ago",
      type: "energy",
    },
  ]);

  // =====================================================
  // WEATHER
  // =====================================================

  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setWeatherError("");

        const url =
          "https://api.open-meteo.com/v1/forecast" +
          "?latitude=17.3850" +
          "&longitude=78.4867" +
          "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m" +
          "&timezone=Asia%2FKolkata";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Weather request failed");
        }

        const data = await response.json();

        if (!data.current) {
          throw new Error("Weather unavailable");
        }

        setWeather(data.current);
      } catch (error) {
        console.error(error);
        setWeatherError(
          "Unable to load weather"
        );
      }
    };

    fetchWeather();

    const interval = setInterval(
      fetchWeather,
      10 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  // =====================================================
  // WEATHER CONDITION
  // =====================================================

  const getWeatherCondition = (code) => {
    if (code === 0) {
      return {
        icon: "☀️",
        text: "Clear Sky",
      };
    }

    if (code === 1 || code === 2) {
      return {
        icon: "🌤️",
        text: "Partly Cloudy",
      };
    }

    if (code === 3) {
      return {
        icon: "☁️",
        text: "Cloudy",
      };
    }

    if (code === 45 || code === 48) {
      return {
        icon: "🌫️",
        text: "Foggy",
      };
    }

    if (code >= 51 && code <= 57) {
      return {
        icon: "🌦️",
        text: "Drizzle",
      };
    }

    if (code >= 61 && code <= 67) {
      return {
        icon: "🌧️",
        text: "Rain",
      };
    }

    if (code >= 71 && code <= 77) {
      return {
        icon: "❄️",
        text: "Snow",
      };
    }

    if (code >= 80 && code <= 82) {
      return {
        icon: "🌧️",
        text: "Rain Showers",
      };
    }

    if (code >= 95 && code <= 99) {
      return {
        icon: "⛈️",
        text: "Thunderstorm",
      };
    }

    return {
      icon: "🌤️",
      text: "Unknown",
    };
  };

  const weatherInfo = weather
    ? getWeatherCondition(
        weather.weather_code
      )
    : null;

  // =====================================================
  // ENERGY
  // =====================================================

  const energyData = {
    "This Month": {
      usage: "128.7",
      change: "18%",
      dates: [
        "1 May",
        "10 May",
        "20 May",
        "31 May",
      ],
      selectedDate: "20 May",
      selectedUsage: "6.2 kWh",
    },

    "Last Month": {
      usage: "156.4",
      change: "12%",
      dates: [
        "1 Apr",
        "10 Apr",
        "20 Apr",
        "30 Apr",
      ],
      selectedDate: "20 Apr",
      selectedUsage: "7.8 kWh",
    },

    "This Year": {
      usage: "1,482.6",
      change: "24%",
      dates: [
        "Jan",
        "Apr",
        "Aug",
        "Dec",
      ],
      selectedDate: "August",
      selectedUsage: "142.8 kWh",
    },
  };

  const currentEnergy =
    energyData[energyPeriod];

  // =====================================================
  // SEARCH FILTER
  // =====================================================

  const searchText =
    search.trim().toLowerCase();

  const visibleRooms = useMemo(() => {
    const rooms = [
      "Living Room",
      "Bedroom",
      "Kitchen",
      "Study Room",
    ];

    if (!searchText) {
      return rooms;
    }

    return rooms.filter((room) =>
      room.toLowerCase().includes(searchText)
    );
  }, [searchText]);

  // =====================================================
  // QUICK ACTION
  // =====================================================

  const handleQuickAction = (action) => {
    const newNotification = {
      id: Date.now(),
      icon: action.icon,
      title: action.title,
      message: action.message,
      time: "Just now",
      type: "success",
    };

    setNotifications((prev) => [
      newNotification,
      ...prev,
    ]);

    setShowNotifications(true);
  };

  // =====================================================
  // TOTAL DEVICE STATUS
  // =====================================================

  const deviceStatus =
    activeDevices === 0
      ? "All devices offline"
      : `${activeDevices} of 4 rooms active`;

  // =====================================================
  // DASHBOARD
  // =====================================================

  return (
    <div className="dashboard-page">

      {/* =================================================
          AMBIENT BACKGROUND
      ================================================= */}

      <div className="dashboard-glow glow-one"></div>
      <div className="dashboard-glow glow-two"></div>

      <main className="dashboard-main">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="dashboard-header">

          <div className="welcome-area">

            <div className="welcome-label">
              <span></span>
              SMART HOME CONTROL CENTER
            </div>

            <h1>
              Good Morning,
              <strong> Niranjan</strong>
              <span className="wave">👋</span>
            </h1>

            <p>
              Everything is connected and running
              smoothly at your home.
            </p>

          </div>

          <div className="header-actions">


            {/* NOTIFICATION */}

            <div className="notification-wrapper">

              <button
                className={`premium-notification ${
                  showNotifications
                    ? "notification-active"
                    : ""
                }`}
                onClick={() =>
                  setShowNotifications(
                    !showNotifications
                  )
                }
              >

                <span>♧</span>

                {notifications.length > 0 && (
                  <b>
                    {notifications.length}
                  </b>
                )}

              </button>

              {showNotifications && (

                <div className="premium-notification-panel">

                  <div className="notification-panel-top">

                    <div>

                      <span>
                        ACTIVITY CENTER
                      </span>

                      <h3>
                        Notifications
                      </h3>

                    </div>

                    <button
                      onClick={() =>
                        setNotifications([])
                      }
                    >
                      Clear
                    </button>

                  </div>

                  <div className="notification-items">

                    {notifications.length === 0 ? (

                      <div className="empty-notification">

                        <div>✓</div>

                        <strong>
                          You're all caught up
                        </strong>

                        <p>
                          No new notifications
                        </p>

                      </div>

                    ) : (

                      notifications.map(
                        (notification) => (

                          <div
                            className="premium-notification-item"
                            key={
                              notification.id
                            }
                          >

                            <div
                              className={`notification-item-icon ${notification.type}`}
                            >
                              {notification.icon}
                            </div>

                            <div>

                              <strong>
                                {notification.title}
                              </strong>

                              <p>
                                {notification.message}
                              </p>

                              <small>
                                {notification.time}
                              </small>

                            </div>

                          </div>

                        )
                      )

                    )}

                  </div>

                </div>

              )}

            </div>

          </div>

        </header>

        {/* =================================================
            OVERVIEW
        ================================================= */}

        <section className="overview-grid">

          <PremiumStat
            icon="◈"
            label="Total Devices"
            value="24"
            detail="Across your home"
            className="purple"
          />

          <PremiumStat
            icon="●"
            label="Active Devices"
            value={activeDevices}
            detail={deviceStatus}
            className="green"
            live
          />

          <PremiumStat
            icon="⌁"
            label="Automations"
            value="08"
            detail="Running smoothly"
            className="orange"
          />

          <PremiumStat
            icon="↗"
            label="Energy Saved"
            value="32%"
            detail="Compared to last month"
            className="blue"
          />

        </section>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="dashboard-content-grid">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="dashboard-left">

            {/* QUICK ACTIONS */}

            <section className="dashboard-section">

              <SectionHeader
                eyebrow="SMART CONTROL"
                title="Quick Actions"
                description="Control your home with one tap."
              />

              <div className="premium-quick-grid">

                <PremiumQuickAction
                  icon="💡"
                  title="All Lights"
                  text="Turn on all lights"
                  onClick={() =>
                    handleQuickAction({
                      icon: "💡",
                      title: "All Lights",
                      message:
                        "All lights have been turned on",
                    })
                  }
                />

                <PremiumQuickAction
                  icon="🌙"
                  title="Good Night"
                  text="Activate night mode"
                  onClick={() =>
                    handleQuickAction({
                      icon: "🌙",
                      title: "Good Night",
                      message:
                        "Night mode activated",
                    })
                  }
                />

                <PremiumQuickAction
                  icon="🛡️"
                  title="Away Mode"
                  text="Secure your home"
                  onClick={() =>
                    handleQuickAction({
                      icon: "🛡️",
                      title: "Away Mode",
                      message:
                        "Home security mode activated",
                    })
                  }
                />

                <PremiumQuickAction
                  icon="🎬"
                  title="Movie Time"
                  text="Dim lights and play"
                  onClick={() =>
                    handleQuickAction({
                      icon: "🎬",
                      title: "Movie Time",
                      message:
                        "Movie mode activated",
                    })
                  }
                />

              </div>

            </section>

            {/* ROOMS */}

            <section className="dashboard-section">

              <SectionHeader
                eyebrow="YOUR HOME"
                title="Rooms"
                description="Monitor and control every room."
                action="View all"
              />

              <div className="premium-rooms">

                {visibleRooms.includes(
                  "Living Room"
                ) && (
                  <PremiumRoom
                    name="Living Room"
                    devices="4 Devices"
                    image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"
                    isOn={devices.livingRoom}
                    accent="purple"
                    onToggle={() =>
                      toggleDevice(
                        "livingRoom"
                      )
                    }
                  />
                )}

                {visibleRooms.includes(
                  "Bedroom"
                ) && (
                  <PremiumRoom
                    name="Bedroom"
                    devices="3 Devices"
                    image="https://images.unsplash.com/photo-1616594039964-ae9021a400a0"
                    isOn={devices.bedroom}
                    accent="blue"
                    onToggle={() =>
                      toggleDevice("bedroom")
                    }
                  />
                )}

                {visibleRooms.includes(
                  "Kitchen"
                ) && (
                  <PremiumRoom
                    name="Kitchen"
                    devices="5 Devices"
                    image="https://images.unsplash.com/photo-1556912167-f556f1f39fdf"
                    isOn={devices.kitchen}
                    accent="orange"
                    onToggle={() =>
                      toggleDevice("kitchen")
                    }
                  />
                )}

                {visibleRooms.includes(
                  "Study Room"
                ) && (
                  <PremiumRoom
                    name="Study Room"
                    devices="2 Devices"
                    image="https://images.unsplash.com/photo-1497366754035-f200968a6e72"
                    isOn={devices.studyRoom}
                    accent="green"
                    onToggle={() =>
                      toggleDevice(
                        "studyRoom"
                      )
                    }
                  />
                )}

              </div>

              {visibleRooms.length === 0 && (
                <div className="no-search-results">
                  <span>⌕</span>
                  <strong>
                    No rooms found
                  </strong>
                  <p>
                    Try searching for another
                    room.
                  </p>
                </div>
              )}

            </section>

          </div>

          {/* =================================================
              RIGHT
          ================================================= */}

          <aside className="dashboard-right">

            {/* WEATHER / HOME */}

            <section className="premium-weather-card">

              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
                alt="Smart Home"
              />

              <div className="weather-overlay"></div>

              <div className="weather-card-content">

                <div className="home-location">

                  <span>⌖</span>

                  <div>
                    <small>
                      YOUR HOME
                    </small>

                    <strong>
                      Hyderabad, India
                    </strong>
                  </div>

                </div>

                {weatherError && (
                  <div className="weather-message">
                    {weatherError}
                  </div>
                )}

                {!weatherError &&
                  !weather && (
                    <div className="weather-message">
                      Loading weather...
                    </div>
                  )}

                {weather &&
                  !weatherError && (
                    <>

                      <div className="weather-primary">

                        <div className="large-weather-icon">
                          {weatherInfo.icon}
                        </div>

                        <div>

                          <strong>
                            {Math.round(
                              weather.temperature_2m
                            )}
                            <sup>°C</sup>
                          </strong>

                          <span>
                            {weatherInfo.text}
                          </span>

                        </div>

                      </div>

                      <div className="weather-bottom">

                        <div>

                          <span>
                            💧
                          </span>

                          <div>
                            <strong>
                              {
                                weather.relative_humidity_2m
                              }
                              %
                            </strong>

                            <small>
                              Humidity
                            </small>
                          </div>

                        </div>

                        <div>

                          <span>
                            💨
                          </span>

                          <div>
                            <strong>
                              {Math.round(
                                weather.wind_speed_10m
                              )}{" "}
                              km/h
                            </strong>

                            <small>
                              Wind
                            </small>
                          </div>

                        </div>

                      </div>

                    </>
                  )}

              </div>

            </section>

            {/* ENERGY */}

            <section className="premium-energy-card">

              <div className="energy-card-header">

                <div>

                  <span className="card-eyebrow">
                    ENERGY MONITOR
                  </span>

                  <h2>
                    Energy Usage
                  </h2>

                </div>

                <select
                  value={energyPeriod}
                  onChange={(e) =>
                    setEnergyPeriod(
                      e.target.value
                    )
                  }
                >
                  <option>
                    This Month
                  </option>

                  <option>
                    Last Month
                  </option>

                  <option>
                    This Year
                  </option>
                </select>

              </div>

              <div className="energy-summary">

                <div>

                  <strong>
                    {currentEnergy.usage}
                  </strong>

                  <span>
                    kWh
                  </span>

                </div>

                <div className="energy-saving">

                  <span>↓</span>

                  {currentEnergy.change}

                  <small>
                    vs last month
                  </small>

                </div>

              </div>

              <div className="premium-chart">

                <div className="chart-y-labels">

                  <span>
                    10
                  </span>

                  <span>
                    7
                  </span>

                  <span>
                    4
                  </span>

                  <span>
                    0
                  </span>

                </div>

                <svg
                  viewBox="0 0 500 180"
                  preserveAspectRatio="none"
                >

                  <defs>

                    <linearGradient
                      id="energyFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#7651e8"
                        stopOpacity="0.28"
                      />

                      <stop
                        offset="100%"
                        stopColor="#7651e8"
                        stopOpacity="0"
                      />

                    </linearGradient>

                  </defs>

                  <line
                    x1="0"
                    y1="35"
                    x2="500"
                    y2="35"
                    className="chart-grid"
                  />

                  <line
                    x1="0"
                    y1="80"
                    x2="500"
                    y2="80"
                    className="chart-grid"
                  />

                  <line
                    x1="0"
                    y1="125"
                    x2="500"
                    y2="125"
                    className="chart-grid"
                  />

                  <path
                    d="
                      M0 120
                      C30 126 45 130 70 112
                      C95 94 105 120 130 105
                      C155 90 170 110 190 98
                      C215 83 220 48 245 38
                      C270 28 285 70 310 72
                      C335 74 345 108 365 95
                      C390 80 405 62 425 78
                      C450 96 470 102 485 70
                      C493 55 498 45 500 38
                      L500 180
                      L0 180
                      Z
                    "
                    fill="url(#energyFill)"
                  />

                  <path
                    d="
                      M0 120
                      C30 126 45 130 70 112
                      C95 94 105 120 130 105
                      C155 90 170 110 190 98
                      C215 83 220 48 245 38
                      C270 28 285 70 310 72
                      C335 74 345 108 365 95
                      C390 80 405 62 425 78
                      C450 96 470 102 485 70
                      C493 55 498 45 500 38
                    "
                    fill="none"
                    stroke="#7651e8"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  <circle
                    cx="310"
                    cy="72"
                    r="7"
                    fill="white"
                    stroke="#7651e8"
                    strokeWidth="3"
                  />

                </svg>

                <div className="chart-floating-tooltip">

                  <span>
                    {currentEnergy.selectedDate}
                  </span>

                  <strong>
                    {currentEnergy.selectedUsage}
                  </strong>

                </div>

              </div>

              <div className="chart-labels">

                {currentEnergy.dates.map(
                  (date) => (
                    <span key={date}>
                      {date}
                    </span>
                  )
                )}

              </div>

            </section>

            {/* HOME STATUS */}

            <section className="home-status-card">

              <div className="status-heading">

                <div>

                  <span>
                    SYSTEM STATUS
                  </span>

                  <h3>
                    Home Overview
                  </h3>

                </div>

                <div className="system-online">
                  <span></span>
                  Online
                </div>

              </div>

              <div className="status-grid">

                <StatusItem
                  icon="⌁"
                  title="Connectivity"
                  value="Excellent"
                />

                <StatusItem
                  icon="⚡"
                  title="Power"
                  value="Stable"
                />

                <StatusItem
                  icon="🛡️"
                  title="Security"
                  value="Protected"
                />

                <StatusItem
                  icon="☁"
                  title="Cloud"
                  value="Synced"
                />

              </div>

            </section>

          </aside>

        </div>

      </main>

    </div>
  );
}

// =====================================================
// PREMIUM STAT
// =====================================================

function PremiumStat({
  icon,
  label,
  value,
  detail,
  className,
  live,
}) {
  return (
    <div
      className={`premium-stat-card ${className}`}
    >

      <div className="stat-card-top">

        <div className="premium-stat-icon">
          {icon}
        </div>

        {live && (
          <span className="live-indicator">
            <i></i>
            LIVE
          </span>
        )}

      </div>

      <div className="premium-stat-number">
        {value}
      </div>

      <div className="premium-stat-label">
        {label}
      </div>

      <div className="premium-stat-detail">
        <span>↗</span>
        {detail}
      </div>

    </div>
  );
}

// =====================================================
// SECTION HEADER
// =====================================================

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}) {
  return (
    <div className="premium-section-header">

      <div>

        <span>
          {eyebrow}
        </span>

        <h2>
          {title}
        </h2>

        <p>
          {description}
        </p>

      </div>

      {action && (
        <button>
          {action} →
        </button>
      )}

    </div>
  );
}

// =====================================================
// QUICK ACTION
// =====================================================

function PremiumQuickAction({
  icon,
  title,
  text,
  onClick,
}) {
  return (
    <button
      className="premium-quick-card"
      onClick={onClick}
    >

      <div className="quick-card-icon">
        {icon}
      </div>

      <div className="quick-card-content">

        <strong>
          {title}
        </strong>

        <p>
          {text}
        </p>

      </div>

      <span className="quick-arrow">
        →
      </span>

    </button>
  );
}

// =====================================================
// ROOM
// =====================================================

function PremiumRoom({
  name,
  devices,
  image,
  isOn,
  accent,
  onToggle,
}) {
  return (
    <div className="premium-room-card">

      <div className="room-image-wrapper">

        <img
          src={image}
          alt={name}
        />

        <div className="room-image-overlay"></div>

        <div className="room-status">

          <span
            className={
              isOn
                ? "room-online"
                : "room-offline"
            }
          ></span>

          {isOn ? "Active" : "Standby"}

        </div>

        <button
          className={`premium-toggle ${
            isOn ? "on" : "off"
          }`}
          onClick={onToggle}
          aria-label={`Toggle ${name}`}
        >
          <span></span>
        </button>

      </div>

      <div className="premium-room-info">

        <div>

          <h3>
            {name}
          </h3>

          <p>
            {devices}
            <span> • </span>
            {isOn
              ? "Devices active"
              : "Devices idle"}
          </p>

        </div>

        <span
          className={`room-accent ${accent}`}
        ></span>

      </div>

    </div>
  );
}

// =====================================================
// STATUS ITEM
// =====================================================

function StatusItem({
  icon,
  title,
  value,
}) {
  return (
    <div className="status-item">

      <div className="status-icon">
        {icon}
      </div>

      <div>

        <span>
          {title}
        </span>

        <strong>
          {value}
        </strong>

      </div>

    </div>
  );
}

export default Dashboard;
import React, { useEffect, useMemo, useState } from "react";

import Dashboard from "./components/Dashboard";
import Devices from "./components/Devices";
import Automation from "./components/Automation";
import Scenes from "./components/Scenes";
import Energy from "./components/Energy";
import Security from "./components/Security";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import Login from "./components/login";
import Profile from "./components/Profile";

import "./App.css";

/* =========================================================
   HELPERS
========================================================= */

const getSavedUser = () => {
  try {
    const savedUser = localStorage.getItem("smartHomeUser");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("Unable to load saved user:", error);
    return null;
  }
};

const getInitials = (name = "Niranjan") => {
  const cleanName = name.trim();

  if (!cleanName) return "NI";

  const words = cleanName.split(/\s+/);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return (
    words[0].charAt(0) +
    words[words.length - 1].charAt(0)
  ).toUpperCase();
};

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [user, setUser] = useState(getSavedUser);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("smartHomeLoggedIn") === "true";
  });

  const [activeNav, setActiveNav] = useState(() => {
    return localStorage.getItem("smartHomeActiveNav") || "Dashboard";
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("smartHomeTheme") || "light";
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const navItems = [
    {
      name: "Dashboard",
      icon: "⌂",
      description: "Overview of your smart home",
    },
    {
      name: "Devices",
      icon: "◉",
      description: "Manage connected devices",
    },
    {
      name: "Automation",
      icon: "ϟ",
      description: "Create smart routines",
    },
    {
      name: "Scenes",
      icon: "◆",
      description: "Control multiple devices",
    },
    {
      name: "Energy",
      icon: "◒",
      description: "Monitor energy usage",
    },
    {
      name: "Security",
      icon: "◇",
      description: "Protect your smart home",
    },
    {
      name: "Analytics",
      icon: "▥",
      description: "View home analytics",
    },
    {
      name: "Settings",
      icon: "⚙",
      description: "Manage your preferences",
    },
  ];


  /* =========================================================
     PAGE INFORMATION
  ========================================================= */

  const pageInfo = {
    Dashboard: {
      title: "Dashboard",
      subtitle: "Everything important about your smart home at a glance.",
    },

    Devices: {
      title: "Devices",
      subtitle: "Control and manage all your connected smart devices.",
    },

    Automation: {
      title: "Automation",
      subtitle: "Create routines that make your home work automatically.",
    },

    Scenes: {
      title: "Scenes",
      subtitle: "Control multiple devices with a single action.",
    },

    Energy: {
      title: "Energy",
      subtitle: "Track consumption and discover ways to save energy.",
    },

    Security: {
      title: "Security",
      subtitle: "Monitor and protect your smart home.",
    },

    Analytics: {
      title: "Analytics",
      subtitle: "Understand how your smart home is performing.",
    },

    Settings: {
      title: "Settings",
      subtitle: "Customize your SmartHome experience.",
    },

    Profile: {
      title: "Profile",
      subtitle: "Manage your personal information and preferences.",
    },
  };

  /* =========================================================
     THEME
  ========================================================= */

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("smartHomeTheme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  };

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleLoginSuccess = (loginUser) => {
    const updatedUser = {
      name: loginUser?.name || "Niranjan",
      email: loginUser?.email || "niranjan@gmail.com",
      phone: loginUser?.phone || "",
      profileImage: null,
    };

    setUser(updatedUser);
    setIsLoggedIn(true);

    localStorage.setItem(
      "smartHomeUser",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem("smartHomeLoggedIn", "true");
  };

  /* =========================================================
     PROFILE UPDATE
  ========================================================= */

  const handleProfileUpdate = (updatedProfile) => {
    const updatedUser = {
      ...user,
      ...updatedProfile,
      profileImage: null,
    };

    setUser(updatedUser);

    localStorage.setItem(
      "smartHomeUser",
      JSON.stringify(updatedUser)
    );
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);

    localStorage.removeItem("smartHomeLoggedIn");
    localStorage.removeItem("smartHomeUser");

    setActiveNav("Dashboard");
    setMobileMenuOpen(false);
  };

  /* =========================================================
     NAVIGATION HANDLER
  ========================================================= */

  const handleNavigation = (page) => {
    setActiveNav(page);

    localStorage.setItem("smartHomeActiveNav", page);

    setMobileMenuOpen(false);
    setSearchOpen(false);
    setSearchValue("");
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredPages = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    if (!search) return [];

    return navItems.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
    );
  }, [searchValue]);

  /* =========================================================
     PAGE CONTENT
  ========================================================= */

  const renderContent = () => {
    switch (activeNav) {
      case "Dashboard":
        return <Dashboard theme={theme} />;

      case "Devices":
        return <Devices theme={theme} />;

      case "Automation":
        return <Automation theme={theme} />;

      case "Scenes":
        return <Scenes theme={theme} />;

      case "Energy":
        return <Energy theme={theme} />;

      case "Security":
        return <Security theme={theme} />;

      case "Analytics":
        return <Analytics theme={theme} />;

      case "Settings":
        return (
          <Settings
            theme={theme}
            toggleTheme={toggleTheme}
          />
        );

      case "Profile":
        return (
          <Profile
            user={user}
            onProfileUpdate={handleProfileUpdate}
          />
        );

      default:
        return <Dashboard theme={theme} />;
    }
  };

  /* =========================================================
     NOT LOGGED IN
  ========================================================= */

  if (!isLoggedIn) {
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  const currentPage =
    pageInfo[activeNav] || pageInfo.Dashboard;

  const initials = getInitials(user?.name || "Niranjan");

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="app-shell">

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {mobileMenuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`app-sidebar ${
          mobileMenuOpen ? "sidebar-open" : ""
        }`}
      >
        {/* BRAND */}

        <div className="sidebar-brand">
          <div className="brand-mark">
            <span>⌂</span>
          </div>

          <div className="brand-content">
            <div className="brand-name">
              SmartHome
            </div>

            <div className="brand-version">
              Intelligent Living
            </div>
          </div>
        </div>

        {/* HOME STATUS */}

        <div className="home-status">
          <span className="status-dot" />

          <div>
            <span className="status-title">
              Home Online
            </span>

            <span className="status-subtitle">
              All systems operational
            </span>
          </div>
        </div>

        {/* NAVIGATION */}

        <div className="sidebar-section-title">
          MAIN MENU
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${
                activeNav === item.name
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleNavigation(item.name)
              }
            >
              <span className="nav-icon">
                {item.icon}
              </span>

              <span className="nav-label">
                {item.name}
              </span>

              {activeNav === item.name && (
                <span className="nav-active-line" />
              )}
            </button>
          ))}
        </nav>
        {/* SIDEBAR PROFILE */}

        <div className="sidebar-bottom">
          <button
            className="sidebar-profile"
            onClick={() =>
              handleNavigation("Profile")
            }
          >
            <div className="premium-avatar-wrap">
              <div className="premium-avatar sidebar-avatar">
                {initials}
              </div>

              <span className="avatar-online-dot" />
            </div>

            <div className="profile-mini-info">
              <span className="profile-mini-name">
                {user?.name || "Niranjan"}
              </span>

              <span className="profile-mini-status">
                Online
              </span>
            </div>

            <span className="profile-arrow">
              ›
            </span>
          </button>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            <span>↪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <main className="app-main">

        {/* TOPBAR */}

        <header className="app-topbar">

          {/* LEFT */}

          <div className="topbar-left">

            <button
              className="mobile-menu-button"
              onClick={() =>
                setMobileMenuOpen(true)
              }
              aria-label="Open menu"
            >
              ☰
            </button>

            <div className="breadcrumb">
              <span className="breadcrumb-home">
                SmartHome
              </span>

              <span className="breadcrumb-arrow">
                /
              </span>

              <span className="breadcrumb-current">
                {currentPage.title}
              </span>
            </div>
          </div>

          {/* RIGHT */}

          <div className="topbar-actions">

            {/* SEARCH */}

            <div
              className={`topbar-search ${
                searchOpen ? "search-active" : ""
              }`}
            >
              <button
                className="topbar-icon-button"
                onClick={() => {
                  setSearchOpen(!searchOpen);

                  if (searchOpen) {
                    setSearchValue("");
                  }
                }}
                aria-label="Search"
              >
                ⌕
              </button>

              {searchOpen && (
                <input
                  type="text"
                  autoFocus
                  value={searchValue}
                  onChange={(event) =>
                    setSearchValue(
                      event.target.value
                    )
                  }
                  placeholder="Search pages..."
                />
              )}
            </div>

            {/* THEME */}

            <button
              className="topbar-icon-button theme-button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>


            {/* TOPBAR PROFILE */}

            <button
              className="topbar-profile"
              onClick={() =>
                handleNavigation("Profile")
              }
            >
              <div className="premium-avatar-wrap">


                <span className="avatar-online-dot" />
              </div>

              <div className="topbar-profile-info">
                <strong>
                  {user?.name || "Niranjan"}
                </strong>

                <span>
                  Home Owner
                </span>
              </div>

              <span className="topbar-profile-arrow">
                ▾
              </span>
            </button>
          </div>
        </header>

        {/* SEARCH RESULTS */}

        {searchOpen &&
          searchValue.trim() &&
          filteredPages.length > 0 && (
            <div className="search-results">
              {filteredPages.map((item) => (
                <button
                  key={item.name}
                  onClick={() =>
                    handleNavigation(item.name)
                  }
                >
                  <span className="search-result-icon">
                    {item.icon}
                  </span>

                  <span>
                    <strong>
                      {item.name}
                    </strong>

                    <small>
                      {item.description}
                    </small>
                  </span>
                </button>
              ))}
            </div>
          )}

        {/* PAGE HEADER */}

        <section className="page-header">

          <div>
            <div className="page-eyebrow">
              SMART HOME CONTROL
            </div>

            <h1>
              {currentPage.title}
            </h1>

            <p>
              {currentPage.subtitle}
            </p>
          </div>

          <div className="page-header-status">
            <span className="status-dot" />
            System Online
          </div>
        </section>

        {/* CONTENT */}

        <section className="page-content">
          {renderContent()}
        </section>

      </main>
    </div>
  );
}
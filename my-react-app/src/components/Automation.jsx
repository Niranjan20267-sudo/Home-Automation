
import React, { useMemo, useState } from "react";
import "./Automation.css";

export default function Automation({ theme = "light", toggleTheme }) {
  const [activeTab, setActiveTab] = useState("Routines");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // --------------------------------------------------
  // FORM STATE
  // --------------------------------------------------
  const [form, setForm] = useState({
    title: "",
    time: "",
    description: "",
    icon: "⚡",
    priority: "Medium",
    devices: 1,
  });

  // --------------------------------------------------
  // ROUTINES
  // --------------------------------------------------
  const [routines, setRoutines] = useState([
    {
      id: 1,
      title: "Good Morning",
      time: "6:00 AM",
      repeat: "Weekdays",
      description: "Lights on, Curtains open, AC on",
      icon: "☀️",
      iconBg: "#fff5d9",
      active: true,
      priority: "High",
      devices: 3,
      nextRun: "Tomorrow, 6:00 AM",
    },
    {
      id: 2,
      title: "Good Night",
      time: "10:30 PM",
      repeat: "Daily",
      description: "Lights off, AC off, Doors lock",
      icon: "🌙",
      iconBg: "#eeeefb",
      active: true,
      priority: "High",
      devices: 4,
      nextRun: "Today, 10:30 PM",
    },
    {
      id: 3,
      title: "Away Mode",
      time: "When you leave",
      repeat: "Location based",
      description: "All devices off, Security on",
      icon: "🏠",
      iconBg: "#e5f8f1",
      active: true,
      priority: "High",
      devices: 7,
      nextRun: "Waiting for trigger",
    },
    {
      id: 4,
      title: "Movie Time",
      time: "When activated",
      repeat: "Manual",
      description: "Dim lights, Curtains close, TV on",
      icon: "🎬",
      iconBg: "#f1eafa",
      active: false,
      priority: "Medium",
      devices: 3,
      nextRun: "Not scheduled",
    },
  ]);

  // --------------------------------------------------
  // SCHEDULES
  // --------------------------------------------------
  const [schedules, setSchedules] = useState([
    {
      id: 101,
      title: "Garden Sprinklers",
      time: "7:00 AM",
      repeat: "Every Mon & Thu",
      description: "Runs garden sprinklers for 15 minutes",
      icon: "💧",
      iconBg: "#e6f3ff",
      active: true,
      priority: "Medium",
      devices: 1,
      nextRun: "Thu, 7:00 AM",
    },
    {
      id: 102,
      title: "Geyser Auto-Off",
      time: "8:00 AM",
      repeat: "Daily",
      description: "Turns off Bathroom Water Heater",
      icon: "🚿",
      iconBg: "#fff0f0",
      active: true,
      priority: "High",
      devices: 1,
      nextRun: "Tomorrow, 8:00 AM",
    },
    {
      id: 103,
      title: "Evening Lights",
      time: "6:30 PM",
      repeat: "Daily",
      description: "Turns on living room and balcony lights",
      icon: "💡",
      iconBg: "#fff8df",
      active: true,
      priority: "Medium",
      devices: 4,
      nextRun: "Today, 6:30 PM",
    },
  ]);

  // --------------------------------------------------
  // CURRENT DATA
  // --------------------------------------------------
  const currentData =
    activeTab === "Routines" ? routines : schedules;

  // --------------------------------------------------
  // STATISTICS
  // --------------------------------------------------
  const statistics = useMemo(() => {
    const total = routines.length + schedules.length;

    const active =
      routines.filter((item) => item.active).length +
      schedules.filter((item) => item.active).length;

    const inactive = total - active;

    const devices =
      [...routines, ...schedules].reduce(
        (sum, item) => sum + item.devices,
        0
      );

    return {
      total,
      active,
      inactive,
      devices,
    };
  }, [routines, schedules]);

  // --------------------------------------------------
  // FILTER + SEARCH
  // --------------------------------------------------
  const filteredItems = useMemo(() => {
    return currentData.filter((item) => {
      const matchesSearch =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Active" && item.active) ||
        (filter === "Inactive" && !item.active) ||
        item.priority === filter;

      return matchesSearch && matchesFilter;
    });
  }, [currentData, search, filter]);

  // --------------------------------------------------
  // RESET FORM
  // --------------------------------------------------
  const resetForm = () => {
    setForm({
      title: "",
      time: "",
      description: "",
      icon: "⚡",
      priority: "Medium",
      devices: 1,
    });

    setEditingItem(null);
  };

  // --------------------------------------------------
  // OPEN CREATE MODAL
  // --------------------------------------------------
  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // --------------------------------------------------
  // OPEN EDIT MODAL
  // --------------------------------------------------
  const openEditModal = (item) => {
    setEditingItem(item);

    setForm({
      title: item.title,
      time: item.time,
      description: item.description,
      icon: item.icon,
      priority: item.priority,
      devices: item.devices,
    });

    setIsModalOpen(true);
  };

  // --------------------------------------------------
  // CLOSE MODAL
  // --------------------------------------------------
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // --------------------------------------------------
  // FORM CHANGE
  // --------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------------------------
  // TOGGLE AUTOMATION
  // --------------------------------------------------
  const handleToggle = (id) => {
    if (activeTab === "Routines") {
      setRoutines((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, active: !item.active }
            : item
        )
      );
    } else {
      setSchedules((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, active: !item.active }
            : item
        )
      );
    }
  };

  // --------------------------------------------------
  // DELETE AUTOMATION
  // --------------------------------------------------
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this automation?"
    );

    if (!confirmed) return;

    if (activeTab === "Routines") {
      setRoutines((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } else {
      setSchedules((prev) =>
        prev.filter((item) => item.id !== id)
      );
    }
  };

  // --------------------------------------------------
  // CREATE / UPDATE
  // --------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      return;
    }

    if (editingItem) {
      if (activeTab === "Routines") {
        setRoutines((prev) =>
          prev.map((item) =>
            item.id === editingItem.id
              ? {
                  ...item,
                  title: form.title,
                  time: form.time || "Scheduled",
                  description: form.description,
                  icon: form.icon,
                  priority: form.priority,
                  devices: Number(form.devices),
                }
              : item
          )
        );
      } else {
        setSchedules((prev) =>
          prev.map((item) =>
            item.id === editingItem.id
              ? {
                  ...item,
                  title: form.title,
                  time: form.time || "Scheduled",
                  description: form.description,
                  icon: form.icon,
                  priority: form.priority,
                  devices: Number(form.devices),
                }
              : item
          )
        );
      }
    } else {
      const newItem = {
        id: Date.now(),
        title: form.title,
        time: form.time || "Scheduled",
        repeat:
          activeTab === "Routines"
            ? "Custom routine"
            : "Daily",
        description: form.description,
        icon: form.icon,
        iconBg: "#f0edff",
        active: true,
        priority: form.priority,
        devices: Number(form.devices),
        nextRun: "Upcoming",
      };

      if (activeTab === "Routines") {
        setRoutines((prev) => [newItem, ...prev]);
      } else {
        setSchedules((prev) => [newItem, ...prev]);
      }
    }

    closeModal();
  };

  return (
    <div
      className={`automation-page ${
        theme === "dark" ? "dark-mode" : "light-mode"
      }`}
    >
      {/* ============================================
          HEADER
      ============================================ */}

      <header className="automation-header">
        <div>
          <span className="automation-eyebrow">
            SMART HOME CONTROL
          </span>

          <h1>Automation</h1>

          <p>
            Manage your routines, schedules and smart-home
            triggers from one place.
          </p>
        </div>

        <div className="header-actions">
          {toggleTheme && (
            <button
              className="theme-button"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          )}

          <button
            className="create-btn"
            onClick={openCreateModal}
          >
            <span>＋</span>
            Create {activeTab === "Routines" ? "Routine" : "Schedule"}
          </button>
        </div>
      </header>

      {/* ============================================
          STATISTICS
      ============================================ */}

      <section className="automation-stats">
        <div className="stat-card">
          <div className="stat-icon purple">⚡</div>

          <div>
            <span>Total Automations</span>
            <strong>{statistics.total}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>

          <div>
            <span>Active</span>
            <strong>{statistics.active}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">◷</div>

          <div>
            <span>Inactive</span>
            <strong>{statistics.inactive}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">⌘</div>

          <div>
            <span>Connected Devices</span>
            <strong>{statistics.devices}</strong>
          </div>
        </div>
      </section>

      {/* ============================================
          TABS + TOOLBAR
      ============================================ */}

      <section className="automation-toolbar">
        <div className="tab-navigation">
          {["Routines", "Schedules"].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab(tab);
                setFilter("All");
                setSearch("");
              }}
            >
              <span>
                {tab === "Routines" ? "⚡" : "◷"}
              </span>

              {tab}

              <b>
                {tab === "Routines"
                  ? routines.length
                  : schedules.length}
              </b>
            </button>
          ))}
        </div>

        <div className="automation-tools">
          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search automations..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
      </section>

      {/* ============================================
          SECTION HEADER
      ============================================ */}

      <div className="section-heading">
        <div>
          <h2>
            {activeTab === "Routines"
              ? "Your Routines"
              : "Scheduled Automations"}
          </h2>

          <p>
            {filteredItems.length} automation
            {filteredItems.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <span className="live-status">
          <i></i>
          Automation system online
        </span>
      </div>

      {/* ============================================
          AUTOMATION GRID
      ============================================ */}

      {filteredItems.length > 0 ? (
        <div className="automation-grid">
          {filteredItems.map((item) => (
            <article
              className={`automation-card ${
                item.active ? "is-active" : "is-inactive"
              }`}
              key={item.id}
            >
              {/* Card top */}
              <div className="card-top">
                <div
                  className="icon-container"
                  style={{
                    backgroundColor: item.iconBg,
                  }}
                >
                  <span>{item.icon}</span>
                </div>

                <div className="card-menu">
                  <button
                    onClick={() =>
                      openEditModal(item)
                    }
                    title="Edit"
                  >
                    ✎
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    title="Delete"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Title */}
              <div className="card-title-group">
                <div className="title-row">
                  <h3>{item.title}</h3>

                  <span
                    className={`priority priority-${item.priority.toLowerCase()}`}
                  >
                    {item.priority}
                  </span>
                </div>

                <div className="schedule-line">
                  <span>◷</span>
                  {item.time}
                  <em>•</em>
                  {item.repeat}
                </div>
              </div>

              {/* Description */}
              <p className="card-description">
                {item.description}
              </p>

              {/* Device information */}
              <div className="device-info">
                <div>
                  <span className="device-icon">
                    ◉
                  </span>

                  <span>
                    {item.devices} device
                    {item.devices !== 1 ? "s" : ""}
                  </span>
                </div>

                <span className="next-run">
                  {item.nextRun}
                </span>
              </div>

              {/* Footer */}
              <div className="card-footer">
                <div
                  className={`status-badge ${
                    item.active
                      ? "active-badge"
                      : "inactive-badge"
                  }`}
                >
                  <i></i>

                  {item.active
                    ? "Automation active"
                    : "Automation paused"}
                </div>

                <label className="switch">
                  <input
                    type="checkbox"
                    checked={item.active}
                    onChange={() =>
                      handleToggle(item.id)
                    }
                  />

                  <span className="slider"></span>
                </label>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* ============================================
           EMPTY STATE
        ============================================ */

        <div className="empty-state">
          <div className="empty-icon">⌕</div>

          <h3>No automations found</h3>

          <p>
            Try changing your search or filter, or create
            a new automation.
          </p>

          <button
            className="create-btn"
            onClick={openCreateModal}
          >
            ＋ Create Automation
          </button>
        </div>
      )}

      {/* ============================================
          CREATE / EDIT MODAL
      ============================================ */}

      {isModalOpen && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <span className="modal-eyebrow">
                  AUTOMATION BUILDER
                </span>

                <h2>
                  {editingItem
                    ? "Edit Automation"
                    : `Create ${
                        activeTab === "Routines"
                          ? "Routine"
                          : "Schedule"
                      }`}
                </h2>

                <p>
                  Configure how your smart home should
                  respond.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                {/* Name */}
                <div className="form-group full">
                  <label>Automation Name</label>

                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. Morning Lights"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Time */}
                <div className="form-group">
                  <label>
                    Time / Trigger
                  </label>

                  <input
                    type="text"
                    name="time"
                    placeholder="e.g. 7:00 AM"
                    value={form.time}
                    onChange={handleChange}
                  />
                </div>

                {/* Icon */}
                <div className="form-group">
                  <label>Icon</label>

                  <select
                    name="icon"
                    value={form.icon}
                    onChange={handleChange}
                  >
                    <option value="⚡">
                      ⚡ Automation
                    </option>

                    <option value="☀️">
                      ☀️ Morning
                    </option>

                    <option value="🌙">
                      🌙 Night
                    </option>

                    <option value="💡">
                      💡 Lights
                    </option>

                    <option value="🎬">
                      🎬 Movie
                    </option>

                    <option value="🏠">
                      🏠 Home
                    </option>

                    <option value="💧">
                      💧 Water
                    </option>

                    <option value="🚿">
                      🚿 Bathroom
                    </option>
                  </select>
                </div>

                {/* Priority */}
                <div className="form-group">
                  <label>Priority</label>

                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                  >
                    <option value="High">
                      High
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="Low">
                      Low
                    </option>
                  </select>
                </div>

                {/* Devices */}
                <div className="form-group">
                  <label>Devices</label>

                  <input
                    type="number"
                    name="devices"
                    min="1"
                    max="100"
                    value={form.devices}
                    onChange={handleChange}
                  />
                </div>

                {/* Actions */}
                <div className="form-group full">
                  <label>Actions</label>

                  <textarea
                    name="description"
                    placeholder="e.g. Turn on Living Room Lights, open curtains and start AC..."
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    required
                  />
                </div>
              </div>

              <div className="modal-preview">
                <div
                  className="preview-icon"
                  style={{
                    backgroundColor: "#f0edff",
                  }}
                >
                  {form.icon}
                </div>

                <div>
                  <strong>
                    {form.title ||
                      "Your automation"}
                  </strong>

                  <span>
                    {form.time ||
                      "No trigger configured"}
                  </span>
                </div>

                <span
                  className={`preview-priority priority-${form.priority.toLowerCase()}`}
                >
                  {form.priority}
                </span>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-btn"
                >
                  {editingItem
                    ? "Save Changes"
                    : "Create Automation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

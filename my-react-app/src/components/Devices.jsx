import React, { useState } from "react";
import "./Devices.css";

function Devices() {
  const [activeTab, setActiveTab] = useState("All Devices");
  const [activeFilter, setActiveFilter] = useState("All");

  // =========================
  // DEVICE LIST
  // =========================

  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Smart Light",
      room: "Living Room",
      type: "Lights",
      icon: "💡",
      status: true,
    },
    {
      id: 2,
      name: "Ceiling Fan",
      room: "Living Room",
      type: "Fans",
      icon: "🌀",
      status: true,
    },
    {
      id: 3,
      name: "AC",
      room: "Bedroom",
      type: "AC",
      icon: "❄️",
      status: true,
    },
    {
      id: 4,
      name: "Smart TV",
      room: "Living Room",
      type: "Appliances",
      icon: "📺",
      status: false,
    },
    {
      id: 5,
      name: "Security Camera",
      room: "Main Door",
      type: "Security",
      icon: "📹",
      status: true,
    },
    {
      id: 6,
      name: "Smart Plug",
      room: "Kitchen",
      type: "Appliances",
      icon: "🔌",
      status: true,
    },
    {
      id: 7,
      name: "Water Heater",
      room: "Bathroom",
      type: "Appliances",
      icon: "🚿",
      status: false,
    },
    {
      id: 8,
      name: "Door Lock",
      room: "Main Door",
      type: "Security",
      icon: "🔒",
      status: true,
    },
  ]);

  // =========================
  // SEARCH
  // =========================

  const [search, setSearch] = useState("");

  // =========================
  // ADD DEVICE
  // =========================

  const [showAddDevice, setShowAddDevice] = useState(false);

  const [newDevice, setNewDevice] = useState({
    name: "",
    room: "Living Room",
    type: "Lights",
    icon: "💡",
  });

  // =========================
  // TOGGLE DEVICE
  // =========================

  const toggleDevice = (id) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === id
          ? {
              ...device,
              status: !device.status,
            }
          : device
      )
    );
  };

  // =========================
  // FILTER
  // =========================

  const getFilteredDevices = () => {
    let result = devices;

    // Category filter
    if (activeFilter !== "All") {
      result = result.filter(
        (device) => device.type === activeFilter
      );
    }

    // Search filter
    if (search.trim() !== "") {
      result = result.filter(
        (device) =>
          device.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          device.room
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          device.type
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    return result;
  };

  const filteredDevices = getFilteredDevices();

  // =========================
  // TAB CHANGE
  // =========================

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveFilter("All");
  };

  // =========================
  // ADD DEVICE
  // =========================

  const handleAddDevice = (e) => {
    e.preventDefault();

    if (!newDevice.name.trim()) {
      alert("Please enter device name");
      return;
    }

    const deviceToAdd = {
      id: Date.now(),
      name: newDevice.name,
      room: newDevice.room,
      type: newDevice.type,
      icon: newDevice.icon,
      status: false,
    };

    setDevices((prevDevices) => [
      ...prevDevices,
      deviceToAdd,
    ]);

    // Close modal
    setShowAddDevice(false);

    // Clear form
    setNewDevice({
      name: "",
      room: "Living Room",
      type: "Lights",
      icon: "💡",
    });
  };

  return (
    <div className="devices-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="devices-header">
        {/*--------------------------------------------------------------------------------------------------------------------*/}
        <div>
          <h1>My Devices</h1>

          <p className="devices-subtitle">
            Manage all your smart home devices
          </p>
        </div>

        <div className="header-actions">

          {/* SEARCH */}

          <div className="search-bar">

            <span className="search-icon">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search devices..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* ADD DEVICE */}

          <button
            className="add-btn"
            onClick={() =>
              setShowAddDevice(true)
            }
          >
            + Add Device
          </button>

        </div>

      </div>


      {/* =========================
          TABS
      ========================= */}

      <div className="tab-navigation">

        <button
          className={`tab-btn ${
            activeTab === "All Devices"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleTabChange("All Devices")
          }
        >
          All Devices
        </button>

        <button
          className={`tab-btn ${
            activeTab === "By Room"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleTabChange("By Room")
          }
        >
          By Room
        </button>

        <button
          className={`tab-btn ${
            activeTab === "By Type"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleTabChange("By Type")
          }
        >
          By Type
        </button>

      </div>


      {/* =========================
          TYPE FILTER
      ========================= */}

      {(activeTab === "All Devices" ||
        activeTab === "By Type") && (

        <div className="category-chips">

          <button
            className={`chip-btn ${
              activeFilter === "All"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveFilter("All")
            }
          >
            All ({devices.length})
          </button>

          <button
            className={`chip-btn ${
              activeFilter === "Lights"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveFilter("Lights")
            }
          >
            💡 Lights
          </button>

          <button
            className={`chip-btn ${
              activeFilter === "Fans"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveFilter("Fans")
            }
          >
            🌀 Fans
          </button>

          <button
            className={`chip-btn ${
              activeFilter === "AC"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveFilter("AC")
            }
          >
            ❄️ AC
          </button>

          <button
            className={`chip-btn ${
              activeFilter === "Security"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveFilter("Security")
            }
          >
            🛡️ Security
          </button>

          <button
            className={`chip-btn ${
              activeFilter === "Appliances"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveFilter("Appliances")
            }
          >
            🔌 Appliances
          </button>

        </div>
      )}


      {/* =========================
          ROOM FILTER
      ========================= */}

      {activeTab === "By Room" && (

        <div className="category-chips">

          <button
            className={`chip-btn ${
              activeFilter === "All"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveFilter("All")
            }
          >
            🏠 All Rooms
          </button>

          <button
            className="chip-btn"
            onClick={() =>
              setSearch("Living Room")
            }
          >
            🛋️ Living Room
          </button>

          <button
            className="chip-btn"
            onClick={() =>
              setSearch("Bedroom")
            }
          >
            🛏️ Bedroom
          </button>

          <button
            className="chip-btn"
            onClick={() =>
              setSearch("Kitchen")
            }
          >
            🍳 Kitchen
          </button>

          <button
            className="chip-btn"
            onClick={() =>
              setSearch("Bathroom")
            }
          >
            🚿 Bathroom
          </button>

          <button
            className="chip-btn"
            onClick={() =>
              setSearch("Main Door")
            }
          >
            🚪 Main Door
          </button>

        </div>
      )}


      {/* =========================
          RESULT COUNT
      ========================= */}

      <div className="device-result">

        <div>
          <h2>
            {activeFilter === "All"
              ? activeTab === "By Room"
                ? "All Rooms"
                : "All Devices"
              : activeFilter}
          </h2>

          <span>
            {filteredDevices.length} devices
          </span>
        </div>

      </div>


      {/* =========================
          DEVICE CARDS
      ========================= */}

      <div className="devices-grid">

        {filteredDevices.length === 0 ? (

          <div className="no-devices">
            <h2>😔 No devices found</h2>
            <p>
              Try another search or add a new device.
            </p>
          </div>

        ) : (

          filteredDevices.map((device) => (

            <div
              className="device-card"
              key={device.id}
            >

              {/* CARD TOP */}

              <div className="card-top">

                <div className="card-info">

                  <span className="device-icon">
                    {device.icon}
                  </span>

                  <div>

                    <h3>
                      {device.name}
                    </h3>

                    <p>
                      {device.room}
                    </p>

                    <small>
                      {device.type}
                    </small>

                  </div>

                </div>


                {/* INDIVIDUAL TOGGLE */}

                <label className="switch">

                  <input
                    type="checkbox"
                    checked={device.status}
                    onChange={() =>
                      toggleDevice(device.id)
                    }
                  />

                  <span className="slider"></span>

                </label>

              </div>


              {/* STATUS */}

              <div className="status-footer">

                {device.status ? (

                  <span className="badge-green">
                    ● Online
                  </span>

                ) : (

                  <span className="badge-gray">
                    ● Offline
                  </span>

                )}

              </div>

            </div>

          ))

        )}

      </div>


      {/* =========================
          ADD DEVICE MODAL
      ========================= */}

      {showAddDevice && (

        <div className="modal-overlay">

          <div className="add-device-modal">

            <div className="modal-header">

              <div>
                <h2>Add New Device</h2>

                <p>
                  Add a smart device to your home
                </p>
              </div>

              <button
                className="close-btn"
                onClick={() =>
                  setShowAddDevice(false)
                }
              >
                ✕
              </button>

            </div>


            {/* FORM */}

            <form onSubmit={handleAddDevice}>

              {/* DEVICE NAME */}

              <div className="form-group">

                <label>
                  Device Name
                </label>

                <input
                  type="text"
                  placeholder="Example: Smart Bulb"
                  value={newDevice.name}
                  onChange={(e) =>
                    setNewDevice({
                      ...newDevice,
                      name: e.target.value,
                    })
                  }
                />

              </div>


              {/* ROOM */}

              <div className="form-group">

                <label>
                  Room
                </label>

                <select
                  value={newDevice.room}
                  onChange={(e) =>
                    setNewDevice({
                      ...newDevice,
                      room: e.target.value,
                    })
                  }
                >

                  <option>
                    Living Room
                  </option>

                  <option>
                    Bedroom
                  </option>

                  <option>
                    Kitchen
                  </option>

                  <option>
                    Bathroom
                  </option>

                  <option>
                    Main Door
                  </option>

                </select>

              </div>


              {/* TYPE */}

              <div className="form-group">

                <label>
                  Device Type
                </label>

                <select
                  value={newDevice.type}
                  onChange={(e) => {

                    const type =
                      e.target.value;

                    let icon = "💡";

                    if (type === "Fans")
                      icon = "🌀";

                    if (type === "AC")
                      icon = "❄️";

                    if (type === "Security")
                      icon = "🛡️";

                    if (type === "Appliances")
                      icon = "🔌";

                    setNewDevice({
                      ...newDevice,
                      type,
                      icon,
                    });

                  }}
                >

                  <option>
                    Lights
                  </option>

                  <option>
                    Fans
                  </option>

                  <option>
                    AC
                  </option>

                  <option>
                    Security
                  </option>

                  <option>
                    Appliances
                  </option>

                </select>

              </div>


              {/* BUTTONS */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowAddDevice(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  + Add Device
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Devices;
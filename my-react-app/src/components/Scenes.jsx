
import React, { useState } from "react";
import "./Scenes.css";

export default function Scenes({ theme }) {
  const [activeTab, setActiveTab] = useState("All Scenes");

  // Add Scene Modal
  const [isSceneModalOpen, setIsSceneModalOpen] = useState(false);

  // Add Device Modal
  const [addDeviceScene, setAddDeviceScene] = useState(null);

  // Three dots menu
  const [openMenu, setOpenMenu] = useState(null);

  // Expanded scene
  const [expandedScene, setExpandedScene] = useState(null);

  // New scene form
  const [sceneName, setSceneName] = useState("");
  const [sceneIcon, setSceneIcon] = useState("✨");

  /*
  ============================================================
  ALL AVAILABLE HOME DEVICES
  ============================================================
  */

  const allDevices = [
    {
      id: "living-light",
      name: "Living Room Light",
      icon: "💡",
    },
    {
      id: "bedroom-light",
      name: "Bedroom Light",
      icon: "💡",
    },
    {
      id: "kitchen-light",
      name: "Kitchen Light",
      icon: "💡",
    },
    {
      id: "study-light",
      name: "Study Room Light",
      icon: "💡",
    },
    {
      id: "air-conditioner",
      name: "Air Conditioner",
      icon: "❄️",
    },
    {
      id: "fan",
      name: "Fan",
      icon: "🌀",
    },
    {
      id: "tv",
      name: "TV",
      icon: "📺",
    },
    {
      id: "curtains",
      name: "Curtains",
      icon: "🪟",
    },
    {
      id: "led-strip",
      name: "LED Strip",
      icon: "✨",
    },
    {
      id: "sound-system",
      name: "Sound System",
      icon: "🔊",
    },
    {
      id: "music-system",
      name: "Music System",
      icon: "🎵",
    },
    {
      id: "bedroom-lamp",
      name: "Bedroom Lamp",
      icon: "🛋️",
    },
  ];

  /*
  ============================================================
  HELPER
  ============================================================
  */

  const createDevices = (deviceIds, enabledIds = []) => {
    return deviceIds
      .map((id) => {
        const device = allDevices.find(
          (item) => item.id === id
        );

        if (!device) return null;

        return {
          ...device,
          enabled: enabledIds.includes(id),
        };
      })
      .filter(Boolean);
  };

  /*
  ============================================================
  MY SCENES
  ============================================================
  */

  const [myScenes, setMyScenes] = useState([
    {
      id: 1,
      title: "Good Morning",
      icon: "☀️",
      favorite: true,
      isActive: true,
      type: "my",

      deviceList: createDevices(
        [
          "living-light",
          "bedroom-light",
          "kitchen-light",
          "curtains",
        ],
        [
          "living-light",
          "bedroom-light",
          "kitchen-light",
          "curtains",
        ]
      ),
    },

    {
      id: 2,
      title: "Good Night",
      icon: "🌙",
      favorite: false,
      isActive: false,
      type: "my",

      deviceList: createDevices(
        [
          "bedroom-light",
          "fan",
          "curtains",
        ],
        ["fan"]
      ),
    },

    {
      id: 3,
      title: "Movie Time",
      icon: "🎬",
      favorite: false,
      isActive: false,
      type: "my",

      deviceList: createDevices(
        [
          "tv",
          "living-light",
          "led-strip",
          "sound-system",
        ],
        [
          "tv",
          "led-strip",
          "sound-system",
        ]
      ),
    },

    {
      id: 4,
      title: "Party Time",
      icon: "🎉",
      favorite: true,
      isActive: false,
      type: "my",

      deviceList: createDevices(
        [
          "living-light",
          "kitchen-light",
          "led-strip",
          "sound-system",
          "tv",
        ],
        [
          "living-light",
          "kitchen-light",
          "led-strip",
          "sound-system",
        ]
      ),
    },

    {
      id: 5,
      title: "Relax Time",
      icon: "🌿",
      favorite: false,
      isActive: false,
      type: "my",

      deviceList: createDevices(
        [
          "bedroom-lamp",
          "fan",
          "music-system",
        ],
        [
          "bedroom-lamp",
          "fan",
        ]
      ),
    },
  ]);

  /*
  ============================================================
  ALL / BUILT-IN SCENES
  ============================================================
  */

  const [allScenes] = useState([
    {
      id: 101,
      title: "Whole Home",
      icon: "🏠",
      favorite: false,
      isActive: false,
      type: "system",

      deviceList: createDevices(
        allDevices.map((device) => device.id),
        [
          "living-light",
          "bedroom-light",
          "kitchen-light",
          "study-light",
          "fan",
          "curtains",
          "led-strip",
        ]
      ),
    },

    {
      id: 102,
      title: "Energy Saver",
      icon: "⚡",
      favorite: false,
      isActive: false,
      type: "system",

      deviceList: createDevices(
        [
          "living-light",
          "bedroom-light",
          "kitchen-light",
          "air-conditioner",
          "fan",
          "tv",
          "led-strip",
        ],
        ["fan"]
      ),
    },

    {
      id: 103,
      title: "Sleep Mode",
      icon: "😴",
      favorite: false,
      isActive: false,
      type: "system",

      deviceList: createDevices(
        [
          "bedroom-light",
          "bedroom-lamp",
          "fan",
          "air-conditioner",
          "curtains",
          "tv",
        ],
        [
          "fan",
          "air-conditioner",
        ]
      ),
    },

    {
      id: 104,
      title: "Focus Mode",
      icon: "🎯",
      favorite: false,
      isActive: false,
      type: "system",

      deviceList: createDevices(
        [
          "study-light",
          "fan",
          "air-conditioner",
          "curtains",
          "music-system",
        ],
        [
          "study-light",
          "fan",
        ]
      ),
    },
  ]);

  /*
  ============================================================
  ADD NEW SCENE
  ============================================================
  */

  const handleAddScene = (e) => {
    e.preventDefault();

    if (!sceneName.trim()) {
      return;
    }

    const newScene = {
      id: Date.now(),
      title: sceneName.trim(),
      icon: sceneIcon || "✨",
      favorite: false,
      isActive: false,
      type: "my",

      // New scenes start with no devices.
      deviceList: [],
    };

    setMyScenes((prev) => [
      newScene,
      ...prev,
    ]);

    setSceneName("");
    setSceneIcon("✨");
    setIsSceneModalOpen(false);

    // Automatically move to My Scenes
    setActiveTab("My Scenes");
  };

  /*
  ============================================================
  PLAY SCENE
  ============================================================
  */

  const handlePlayScene = (sceneId) => {
    setMyScenes((prev) =>
      prev.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              isActive: !scene.isActive,
            }
          : scene
      )
    );
  };

  /*
  ============================================================
  FAVORITE
  ============================================================
  */

  const handleFavorite = (sceneId) => {
    setMyScenes((prev) =>
      prev.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              favorite: !scene.favorite,
            }
          : scene
      )
    );
  };

  /*
  ============================================================
  THREE DOTS
  ============================================================
  */

  const handleMenu = (sceneId) => {
    setOpenMenu(
      openMenu === sceneId
        ? null
        : sceneId
    );
  };

  /*
  ============================================================
  MANAGE DEVICES
  ============================================================
  */

  const handleManageDevices = (sceneId) => {
    setExpandedScene(
      expandedScene === sceneId
        ? null
        : sceneId
    );

    setOpenMenu(null);
  };

  /*
  ============================================================
  TOGGLE DEVICE
  ============================================================
  */

  const handleToggleDevice = (
    sceneId,
    deviceId
  ) => {
    setMyScenes((prev) =>
      prev.map((scene) => {
        if (scene.id !== sceneId) {
          return scene;
        }

        return {
          ...scene,

          deviceList:
            scene.deviceList.map(
              (device) =>
                device.id === deviceId
                  ? {
                      ...device,
                      enabled:
                        !device.enabled,
                    }
                  : device
            ),
        };
      })
    );
  };

  /*
  ============================================================
  ADD DEVICE TO MY SCENE
  ============================================================
  */

  const handleAddDevice = (
    sceneId,
    device
  ) => {
    setMyScenes((prev) =>
      prev.map((scene) => {
        if (scene.id !== sceneId) {
          return scene;
        }

        // Prevent duplicate device
        const exists =
          scene.deviceList.some(
            (item) =>
              item.id === device.id
          );

        if (exists) {
          return scene;
        }

        return {
          ...scene,

          deviceList: [
            ...scene.deviceList,
            {
              ...device,
              enabled: false,
            },
          ],
        };
      })
    );

    setAddDeviceScene(null);
  };

  /*
  ============================================================
  REMOVE DEVICE
  ============================================================
  */

  const handleRemoveDevice = (
    sceneId,
    deviceId
  ) => {
    setMyScenes((prev) =>
      prev.map((scene) => {
        if (scene.id !== sceneId) {
          return scene;
        }

        return {
          ...scene,

          deviceList:
            scene.deviceList.filter(
              (device) =>
                device.id !== deviceId
            ),
        };
      })
    );
  };

  /*
  ============================================================
  GET DEVICE COUNT
  ============================================================
  */

  const getDeviceCount = (scene) => {
    return scene.deviceList.length;
  };

  /*
  ============================================================
  DISPLAY SCENES
  ============================================================
  */

  const getDisplayedScenes = () => {
    if (activeTab === "My Scenes") {
      return myScenes;
    }

    if (activeTab === "Favorite") {
      return myScenes.filter(
        (scene) => scene.favorite
      );
    }

    // ALL SCENES
    return [
      ...myScenes,
      ...allScenes,
    ];
  };

  const displayedScenes =
    getDisplayedScenes();

  /*
  ============================================================
  PAGE
  ============================================================
  */

  return (
    <div
      className={`scenes-page ${
        theme === "dark"
          ? "dark-mode"
          : "light-mode"
      }`}
    >

      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="scenes-header">

        <div className="header-text">

          <h1>
            Scenes
          </h1>

          <p>
            Control multiple devices
            with one tap.
          </p>

        </div>

        {/* ADD SCENE */}

        <button
          className="add-scene-btn"
          onClick={() =>
            setIsSceneModalOpen(true)
          }
        >
          <span className="plus-sign">
            +
          </span>

          Add Scene
        </button>

      </div>

      {/* ====================================================
          TABS
      ==================================================== */}

      <div className="scenes-tabs">

        <button
          className={`tab-btn ${
            activeTab === "All Scenes"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setActiveTab("All Scenes");
            setOpenMenu(null);
            setExpandedScene(null);
          }}
        >
          All Scenes
        </button>

        <button
          className={`tab-btn ${
            activeTab === "My Scenes"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setActiveTab("My Scenes");
            setOpenMenu(null);
            setExpandedScene(null);
          }}
        >
          My Scenes
        </button>

        <button
          className={`tab-btn ${
            activeTab === "Favorite"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setActiveTab("Favorite");
            setOpenMenu(null);
            setExpandedScene(null);
          }}
        >
          Favorite
        </button>

      </div>

      {/* ====================================================
          SECTION
      ==================================================== */}

      <section className="scenes-section">

        <div className="section-heading-row">

          <div>

            <h2 className="section-title">

              {activeTab ===
                "All Scenes" &&
                "All Scenes"}

              {activeTab ===
                "My Scenes" &&
                "My Scenes"}

              {activeTab ===
                "Favorite" &&
                "Favorite Scenes"}

            </h2>

            <p className="section-subtitle">

              {activeTab ===
                "All Scenes" &&
                "All available scenes and devices"}

              {activeTab ===
                "My Scenes" &&
                "Scenes created by you"}

              {activeTab ===
                "Favorite" &&
                "Your favorite scenes"}

            </p>

          </div>

          <div className="scene-count">

            {displayedScenes.length}

            <span>
              Scenes
            </span>

          </div>

        </div>

        {/* ==================================================
            NO SCENES
        ================================================== */}

        {displayedScenes.length === 0 ? (

          <div className="empty-scenes">

            <div className="empty-icon">
              ♡
            </div>

            <h3>
              No Favorite Scenes
            </h3>

            <p>
              Click the heart icon
              to add a scene to
              favorites.
            </p>

          </div>

        ) : (

          <div className="scenes-grid">

            {displayedScenes.map(
              (scene) => (

                <div
                  className={`scene-wrapper ${
                    expandedScene ===
                    scene.id
                      ? "expanded"
                      : ""
                  }`}
                  key={scene.id}
                >

                  {/* ========================================
                      SCENE CARD
                  ======================================== */}

                  <div className="scene-card">

                    {/* LEFT */}

                    <div className="card-left">

                      <div className="icon-box">
                        {scene.icon}
                      </div>

                      <div className="card-details">

                        <div className="scene-title-line">

                          <h3>
                            {scene.title}
                          </h3>

                          {scene.type ===
                          "system" ? (

                            <span className="scene-type-badge system">
                              Built-in
                            </span>

                          ) : (

                            <span className="scene-type-badge">
                              My Scene
                            </span>

                          )}

                        </div>

                        <p>
                          {getDeviceCount(
                            scene
                          )}{" "}
                          Devices
                        </p>

                      </div>

                    </div>

                    {/* RIGHT */}

                    <div className="card-right">

                      {/* FAVORITE */}

                      <button
                        className={`fav-btn ${
                          scene.favorite
                            ? "is-fav"
                            : ""
                        }`}
                        onClick={() =>
                          handleFavorite(
                            scene.id
                          )
                        }
                      >
                        {scene.favorite
                          ? "♥"
                          : "♡"}
                      </button>

                      {/* ACTIVE */}

                      {scene.isActive && (
                        <div className="active-pill"></div>
                      )}

                      {/* THREE DOT */}

                      <button
                        className={`more-options-btn ${
                          openMenu ===
                          scene.id
                            ? "menu-open"
                            : ""
                        }`}
                        onClick={() =>
                          handleMenu(
                            scene.id
                          )
                        }
                      >
                        ⋮
                      </button>

                      {/* PLAY */}

                      <button
                        className={`play-btn ${
                          scene.isActive
                            ? "running"
                            : ""
                        }`}
                        onClick={() =>
                          handlePlayScene(
                            scene.id
                          )
                        }
                      >
                        {scene.isActive
                          ? "■"
                          : "▶"}
                      </button>

                    </div>

                  </div>

                  {/* ========================================
                      THREE DOT MENU
                  ======================================== */}

                  {openMenu ===
                    scene.id && (

                    <div className="scene-options-menu">

                      <button
                        onClick={() =>
                          handleManageDevices(
                            scene.id
                          )
                        }
                      >
                        <span>
                          ⚙️
                        </span>

                        Manage Devices
                      </button>

                      <button
                        onClick={() => {
                          setExpandedScene(
                            scene.id
                          );

                          setAddDeviceScene(
                            scene.id
                          );

                          setOpenMenu(null);
                        }}
                      >
                        <span>
                          ＋
                        </span>

                        Add Device
                      </button>

                    </div>

                  )}

                  {/* ========================================
                      DEVICE PANEL
                  ======================================== */}

                  {expandedScene ===
                    scene.id && (

                    <div className="scene-device-panel">

                      {/* HEADER */}

                      <div className="device-panel-header">

                        <div>

                          <h4>
                            Scene Devices
                          </h4>

                          <span>
                            {getDeviceCount(
                              scene
                            )}{" "}
                            devices
                          </span>

                        </div>

                        <button
                          className="add-device-small-btn"
                          onClick={() =>
                            setAddDeviceScene(
                              scene.id
                            )
                          }
                        >
                          + Add Device
                        </button>

                      </div>

                      {/* DEVICE LIST */}

                      <div className="device-list">

                        {scene.deviceList
                          .length === 0 ? (

                          <div className="no-devices">

                            <span>
                              📱
                            </span>

                            <p>
                              No devices
                              added to
                              this scene.
                            </p>

                            <button
                              onClick={() =>
                                setAddDeviceScene(
                                  scene.id
                                )
                              }
                            >
                              + Add Device
                            </button>

                          </div>

                        ) : (

                          scene.deviceList.map(
                            (device) => (

                              <div
                                className="scene-device"
                                key={
                                  device.id
                                }
                              >

                                {/* DEVICE INFO */}

                                <div className="device-info">

                                  <div className="device-icon">
                                    {
                                      device.icon
                                    }
                                  </div>

                                  <div>

                                    <strong>
                                      {
                                        device.name
                                      }
                                    </strong>

                                    <span
                                      className={`device-status ${
                                        device.enabled
                                          ? "on"
                                          : ""
                                      }`}
                                    >
                                      {device.enabled
                                        ? "ON"
                                        : "OFF"}
                                    </span>

                                  </div>

                                </div>

                                {/* DEVICE ACTION */}

                                <div className="device-actions">

                                  <button
                                    className={`device-switch ${
                                      device.enabled
                                        ? "enabled"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      handleToggleDevice(
                                        scene.id,
                                        device.id
                                      )
                                    }
                                  >
                                    <span></span>
                                  </button>

                                  {/* REMOVE */}

                                  {scene.type ===
                                    "my" && (

                                    <button
                                      className="remove-device-btn"
                                      onClick={() =>
                                        handleRemoveDevice(
                                          scene.id,
                                          device.id
                                        )
                                      }
                                    >
                                      ×
                                    </button>

                                  )}

                                </div>

                              </div>

                            )
                          )

                        )}

                      </div>

                      {/* HIDE */}

                      <button
                        className="hide-devices-btn"
                        onClick={() =>
                          setExpandedScene(null)
                        }
                      >
                        ↑ Hide Devices
                      </button>

                    </div>

                  )}

                </div>

              )
            )}

          </div>

        )}

      </section>

      {/* ====================================================
          ADD SCENE MODAL
      ==================================================== */}

      {isSceneModalOpen && (

        <div
          className="modal-overlay"
          onClick={() =>
            setIsSceneModalOpen(false)
          }
        >

          <div
            className="modal-card"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <h2>
              Add New Scene
            </h2>

            <form
              onSubmit={handleAddScene}
            >

              {/* NAME */}

              <div className="form-group">

                <label>
                  Scene Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. Reading Time"
                  value={sceneName}
                  onChange={(e) =>
                    setSceneName(
                      e.target.value
                    )
                  }
                  required
                />

              </div>

              {/* ICON */}

              <div className="form-group">

                <label>
                  Scene Icon
                </label>

                <input
                  type="text"
                  placeholder="✨"
                  maxLength="2"
                  value={sceneIcon}
                  onChange={(e) =>
                    setSceneIcon(
                      e.target.value
                    )
                  }
                />

              </div>

              {/* ACTIONS */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setIsSceneModalOpen(
                      false
                    )
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="confirm-btn"
                >
                  Create Scene
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* ====================================================
          ADD DEVICE MODAL
      ==================================================== */}

      {addDeviceScene !== null && (

        <div
          className="device-modal-overlay"
          onClick={() =>
            setAddDeviceScene(null)
          }
        >

          <div
            className="device-modal-card"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="device-modal-header">

              <div>

                <h2>
                  Add Device
                </h2>

                <p>
                  Select a device to
                  add to this scene.
                </p>

              </div>

              <button
                className="close-modal-btn"
                onClick={() =>
                  setAddDeviceScene(null)
                }
              >
                ×
              </button>

            </div>

            {/* DEVICE OPTIONS */}

            <div className="available-devices">

              {allDevices.map(
                (device) => {

                  const scene =
                    myScenes.find(
                      (item) =>
                        item.id ===
                        addDeviceScene
                    );

                  const alreadyAdded =
                    scene?.deviceList.some(
                      (item) =>
                        item.id ===
                        device.id
                    );

                  return (

                    <button
                      key={device.id}
                      className={`available-device ${
                        alreadyAdded
                          ? "already-added"
                          : ""
                      }`}
                      disabled={
                        alreadyAdded
                      }
                      onClick={() =>
                        handleAddDevice(
                          addDeviceScene,
                          device
                        )
                      }
                    >

                      <span className="available-device-icon">
                        {
                          device.icon
                        }
                      </span>

                      <span>
                        {
                          device.name
                        }
                      </span>

                      {alreadyAdded && (
                        <small>
                          Added
                        </small>
                      )}

                    </button>

                  );
                }
              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

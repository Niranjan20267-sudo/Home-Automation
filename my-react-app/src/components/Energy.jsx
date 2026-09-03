import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Energy.css";

export default function Energy({ theme = "light" }) {
  const [timeRange, setTimeRange] = useState("This Month");
  const [unit, setUnit] = useState("₹");

  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(19);

  const timeRef = useRef(null);
  const unitRef = useRef(null);

  /* =========================================================
     ELECTRICITY RATE
  ========================================================= */

  const ELECTRICITY_RATE = 11.1;

  /* =========================================================
     ENERGY DATA
  ========================================================= */

  const dataMap = {
    "This Month": {
      totalUsageKwh: 128.7,
      saved: 32,
      usageTrend: 18,
      costTrend: 12,
      savedTrend: 15,
      previousUsage: 109.2,
      peakUsage: "20 May",
      peakValue: 18.6,
      averageDaily: 4.29,
      efficiency: 86,

      dates: [
        "1 May",
        "2 May",
        "3 May",
        "4 May",
        "5 May",
        "6 May",
        "7 May",
        "8 May",
        "9 May",
        "10 May",
        "11 May",
        "12 May",
        "13 May",
        "14 May",
        "15 May",
        "16 May",
        "17 May",
        "18 May",
        "19 May",
        "20 May",
        "21 May",
        "22 May",
        "23 May",
        "24 May",
        "25 May",
        "26 May",
        "27 May",
        "28 May",
        "29 May",
        "30 May",
        "31 May",
      ],

      values: [
        3.1,
        2.8,
        3.6,
        4.4,
        4.1,
        3.7,
        3.5,
        4.2,
        4.8,
        3.9,
        3.1,
        3.8,
        4.7,
        6.8,
        9.2,
        8.5,
        6.4,
        5.8,
        5.6,
        6.1,
        7.2,
        8.4,
        7.1,
        5.9,
        5.3,
        6.0,
        7.5,
        9.8,
        12.4,
        14.8,
        17.6,
      ],

      xLabels: ["1 May", "10 May", "20 May", "31 May"],

      consumerData: [
        {
          name: "Air Conditioner",
          icon: "❄️",
          usageKwh: 42.3,
          percentage: 33,
        },
        {
          name: "Water Heater",
          icon: "🚿",
          usageKwh: 28.7,
          percentage: 22,
        },
        {
          name: "Refrigerator",
          icon: "🧊",
          usageKwh: 18.9,
          percentage: 15,
        },
        {
          name: "Lighting",
          icon: "💡",
          usageKwh: 12.4,
          percentage: 10,
        },
      ],
    },

    "Last Month": {
      totalUsageKwh: 109.2,
      saved: 28,
      usageTrend: -5,
      costTrend: -3,
      savedTrend: 8,
      previousUsage: 115.1,
      peakUsage: "18 Apr",
      peakValue: 16.2,
      averageDaily: 3.64,
      efficiency: 81,

      dates: [
        "1 Apr",
        "2 Apr",
        "3 Apr",
        "4 Apr",
        "5 Apr",
        "6 Apr",
        "7 Apr",
        "8 Apr",
        "9 Apr",
        "10 Apr",
        "11 Apr",
        "12 Apr",
        "13 Apr",
        "14 Apr",
        "15 Apr",
        "16 Apr",
        "17 Apr",
        "18 Apr",
        "19 Apr",
        "20 Apr",
        "21 Apr",
        "22 Apr",
        "23 Apr",
        "24 Apr",
        "25 Apr",
        "26 Apr",
        "27 Apr",
        "28 Apr",
        "29 Apr",
        "30 Apr",
      ],

      values: [
        2.9,
        3.2,
        3.5,
        3.8,
        4.0,
        3.7,
        3.4,
        3.1,
        3.6,
        4.2,
        4.5,
        4.1,
        5.2,
        6.1,
        7.4,
        9.8,
        12.5,
        16.2,
        14.6,
        10.8,
        8.4,
        7.1,
        6.3,
        5.5,
        4.8,
        5.6,
        6.7,
        8.1,
        10.2,
        12.8,
      ],

      xLabels: ["1 Apr", "10 Apr", "20 Apr", "30 Apr"],

      consumerData: [
        {
          name: "Air Conditioner",
          icon: "❄️",
          usageKwh: 36.1,
          percentage: 31,
        },
        {
          name: "Water Heater",
          icon: "🚿",
          usageKwh: 24.5,
          percentage: 21,
        },
        {
          name: "Refrigerator",
          icon: "🧊",
          usageKwh: 17.2,
          percentage: 15,
        },
        {
          name: "Lighting",
          icon: "💡",
          usageKwh: 11,
          percentage: 9,
        },
      ],
    },

    "This Year": {
      totalUsageKwh: 1450,
      saved: 35,
      usageTrend: 22,
      costTrend: 19,
      savedTrend: 20,
      previousUsage: 1380,
      peakUsage: "Jun 2026",
      peakValue: 142,
      averageDaily: 3.97,
      efficiency: 91,

      dates: [
        "Jan 2026",
        "Feb 2026",
        "Mar 2026",
        "Apr 2026",
        "May 2026",
        "Jun 2026",
        "Jul 2026",
        "Aug 2026",
        "Sep 2026",
        "Oct 2026",
        "Nov 2026",
        "Dec 2026",
      ],

      values: [
        96,
        102,
        110,
        118,
        130,
        142,
        136,
        128,
        120,
        112,
        104,
        98,
      ],

      xLabels: ["Jan", "Apr", "Jul", "Dec"],

      consumerData: [
        {
          name: "Air Conditioner",
          icon: "❄️",
          usageKwh: 480,
          percentage: 33,
        },
        {
          name: "Water Heater",
          icon: "🚿",
          usageKwh: 320,
          percentage: 22,
        },
        {
          name: "Refrigerator",
          icon: "🧊",
          usageKwh: 215,
          percentage: 15,
        },
        {
          name: "Lighting",
          icon: "💡",
          usageKwh: 145,
          percentage: 10,
        },
      ],
    },
  };

  const activeData = dataMap[timeRange];

  /* =========================================================
     RESET SELECTED POINT WHEN PERIOD CHANGES
  ========================================================= */

  useEffect(() => {
    if (timeRange === "This Month") {
      setSelectedIndex(19);
    } else if (timeRange === "Last Month") {
      setSelectedIndex(17);
    } else {
      setSelectedIndex(5);
    }
  }, [timeRange]);

  /* =========================================================
     CLOSE DROPDOWNS
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        timeRef.current &&
        !timeRef.current.contains(event.target)
      ) {
        setIsTimeDropdownOpen(false);
      }

      if (
        unitRef.current &&
        !unitRef.current.contains(event.target)
      ) {
        setIsUnitDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =========================================================
     SELECTED DATE
  ========================================================= */

  const selectedDate =
    activeData.dates[selectedIndex] ||
    activeData.dates[0];

  const selectedUsage =
    activeData.values[selectedIndex] ||
    activeData.values[0];

  const selectedCost =
    selectedUsage * ELECTRICITY_RATE;

  /* =========================================================
     GRAPH CALCULATION
  ========================================================= */

  const graph = useMemo(() => {
    const width = 600;
    const height = 180;

    const paddingX = 25;
    const paddingTop = 25;
    const paddingBottom = 20;

    const values = activeData.values;

    const maxValue =
      Math.max(...values) * 1.15;

    const minValue = 0;

    const usableWidth =
      width - paddingX * 2;

    const usableHeight =
      height - paddingTop - paddingBottom;

    const points = values.map((value, index) => {
      const x =
        paddingX +
        (index / Math.max(values.length - 1, 1)) *
          usableWidth;

      const y =
        paddingTop +
        ((maxValue - value) /
          (maxValue - minValue)) *
          usableHeight;

      return {
        x,
        y,
        value,
      };
    });

    const linePoints = points
      .map((point) => `${point.x},${point.y}`)
      .join(" ");

    const areaPoints = [
      `${points[0].x},${height - paddingBottom}`,
      ...points.map(
        (point) => `${point.x},${point.y}`
      ),
      `${points[points.length - 1].x},${
        height - paddingBottom
      }`,
    ].join(" ");

    return {
      points,
      linePoints,
      areaPoints,
      maxValue,
    };
  }, [activeData]);

  const selectedPoint =
    graph.points[selectedIndex] ||
    graph.points[0];

  /* =========================================================
     STATS
  ========================================================= */

  const estimatedCost = Math.round(
    activeData.totalUsageKwh * ELECTRICITY_RATE
  );

  const previousCost = Math.round(
    activeData.previousUsage * ELECTRICITY_RATE
  );

  const usageDifference =
    activeData.totalUsageKwh -
    activeData.previousUsage;

  const usageDifferencePercent =
    Math.round(
      (usageDifference /
        activeData.previousUsage) *
        100
    );

  /* =========================================================
     TREND
  ========================================================= */

  const formatTrend = (value) => {
    if (value > 0) {
      return `▲ ${Math.abs(value)}%`;
    }

    if (value < 0) {
      return `▼ ${Math.abs(value)}%`;
    }

    return "— 0%";
  };

  /* =========================================================
     SELECT GRAPH DATE
  ========================================================= */

  const handleGraphPointClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div
      className={`energy-page ${
        theme === "dark"
          ? "dark-mode"
          : "light-mode"
      }`}
    >
      <main className="energy-main">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="energy-header">
          <div className="energy-heading">
            <div className="energy-title-row">
              <div className="energy-main-icon">
                ⚡
              </div>

              <div>
                <h1>Energy</h1>

                <p>
                  Track and optimize your home
                  energy usage.
                </p>
              </div>
            </div>
          </div>

          <div
            className="energy-dropdown"
            ref={timeRef}
          >
            <button
              className="energy-dropdown-button"
              onClick={() =>
                setIsTimeDropdownOpen(
                  !isTimeDropdownOpen
                )
              }
            >
              <span>📅</span>

              <span>{timeRange}</span>

              <span
                className={`dropdown-arrow ${
                  isTimeDropdownOpen
                    ? "rotate"
                    : ""
                }`}
              >
                ▼
              </span>
            </button>

            {isTimeDropdownOpen && (
              <div className="energy-dropdown-menu">
                {[
                  "This Month",
                  "Last Month",
                  "This Year",
                ].map((option) => (
                  <button
                    key={option}
                    className={`energy-dropdown-item ${
                      timeRange === option
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => {
                      setTimeRange(option);
                      setIsTimeDropdownOpen(false);
                    }}
                  >
                    <span>
                      {option === "This Year"
                        ? "📊"
                        : "📅"}
                    </span>

                    {option}

                    {timeRange === option && (
                      <span className="check">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* =================================================
            STATS
        ================================================= */}

        <section className="energy-stats-grid">

          <div className="energy-stat-card">
            <div className="stat-top">
              <div className="stat-icon purple">
                ⚡
              </div>

              <span className="stat-label">
                Total Usage
              </span>
            </div>

            <div className="stat-number">
              {activeData.totalUsageKwh.toLocaleString()}{" "}
              kWh
            </div>

            <div
              className={`stat-trend ${
                activeData.usageTrend < 0
                  ? "good"
                  : ""
              }`}
            >
              {formatTrend(
                activeData.usageTrend
              )}

              <span>vs previous</span>
            </div>
          </div>

          <div className="energy-stat-card">
            <div className="stat-top">
              <div className="stat-icon green">
                ₹
              </div>

              <span className="stat-label">
                Estimated Cost
              </span>
            </div>

            <div className="stat-number">
              ₹ {estimatedCost.toLocaleString()}
            </div>

            <div className="stat-trend">
              {formatTrend(
                activeData.costTrend
              )}

              <span>vs previous</span>
            </div>
          </div>

          <div className="energy-stat-card">
            <div className="stat-top">
              <div className="stat-icon blue">
                🌱
              </div>

              <span className="stat-label">
                Energy Saved
              </span>
            </div>

            <div className="stat-number">
              {activeData.saved}%
            </div>

            <div className="stat-trend saved">
              ▲ {activeData.savedTrend}%

              <span>improvement</span>
            </div>
          </div>

          <div className="energy-stat-card">
            <div className="stat-top">
              <div className="stat-icon orange">
                🎯
              </div>

              <span className="stat-label">
                Efficiency
              </span>
            </div>

            <div className="stat-number">
              {activeData.efficiency}%
            </div>

            <div className="efficiency-mini">
              <div className="mini-progress">
                <div
                  style={{
                    width: `${activeData.efficiency}%`,
                  }}
                />
              </div>

              <span>Excellent</span>
            </div>
          </div>

        </section>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <section className="energy-content-grid">

          {/* =================================================
              USAGE GRAPH
          ================================================= */}

          <div className="energy-panel usage-panel">

            <div className="panel-header">

              <div>
                <h2>Usage Overview</h2>

                <p>
                  Click any point to view
                  detailed usage
                </p>
              </div>

              <div
                className="energy-dropdown unit-dropdown"
                ref={unitRef}
              >
                <button
                  className="energy-dropdown-button"
                  onClick={() =>
                    setIsUnitDropdownOpen(
                      !isUnitDropdownOpen
                    )
                  }
                >
                  <span>
                    {unit === "kWh"
                      ? "⚡"
                      : "₹"}
                  </span>

                  <span>{unit}</span>

                  <span
                    className={`dropdown-arrow ${
                      isUnitDropdownOpen
                        ? "rotate"
                        : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isUnitDropdownOpen && (
                  <div className="energy-dropdown-menu">

                    <button
                      className={`energy-dropdown-item ${
                        unit === "kWh"
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => {
                        setUnit("kWh");
                        setIsUnitDropdownOpen(
                          false
                        );
                      }}
                    >
                      ⚡ kWh (Energy)
                    </button>

                    <button
                      className={`energy-dropdown-item ${
                        unit === "₹"
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => {
                        setUnit("₹");
                        setIsUnitDropdownOpen(
                          false
                        );
                      }}
                    >
                      ₹ Rupees (Cost)
                    </button>

                  </div>
                )}
              </div>

            </div>

            {/* =================================================
                GRAPH
            ================================================= */}

            <div className="energy-chart-area">

              <div className="chart-y-labels">
                <span>
                  {unit === "₹"
                    ? `₹${Math.round(
                        graph.maxValue *
                          ELECTRICITY_RATE
                      )}`
                    : `${Math.round(
                        graph.maxValue
                      )}`}
                </span>

                <span>
                  {unit === "₹"
                    ? `₹${Math.round(
                        (graph.maxValue *
                          ELECTRICITY_RATE) /
                          2
                      )}`
                    : `${Math.round(
                        graph.maxValue / 2
                      )}`}
                </span>

                <span>
                  ₹0
                </span>
              </div>

              <div className="chart-wrapper">

                <svg
                  viewBox="0 0 600 180"
                  className="energy-svg"
                  preserveAspectRatio="none"
                >

                  {/* GRID */}

                  <line
                    x1="0"
                    y1="25"
                    x2="600"
                    y2="25"
                    className="chart-grid-line"
                  />

                  <line
                    x1="0"
                    y1="90"
                    x2="600"
                    y2="90"
                    className="chart-grid-line"
                  />

                  <line
                    x1="0"
                    y1="160"
                    x2="600"
                    y2="160"
                    className="chart-grid-line"
                  />

                  {/* AREA */}

                  <polygon
                    points={
                      graph.areaPoints
                    }
                    className="chart-area-fill"
                  />

                  {/* LINE */}

                  <polyline
                    points={
                      graph.linePoints
                    }
                    className="energy-chart-line"
                  />

                  {/* SELECTED GUIDE */}

                  <line
                    x1={selectedPoint.x}
                    y1={selectedPoint.y}
                    x2={selectedPoint.x}
                    y2="160"
                    className="chart-guide"
                  />

                  {/* ALL CLICKABLE POINTS */}

                  {graph.points.map(
                    (point, index) => (
                      <g key={index}>

                        {/* Invisible larger hit area */}

                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="12"
                          className="chart-click-area"
                          onClick={() =>
                            handleGraphPointClick(
                              index
                            )
                          }
                        />

                        {/* Small visible point */}

                        <circle
                          cx={point.x}
                          cy={point.y}
                          r={
                            index ===
                            selectedIndex
                              ? 6
                              : 3
                          }
                          className={`chart-point ${
                            index ===
                            selectedIndex
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleGraphPointClick(
                              index
                            )
                          }
                        />

                      </g>
                    )
                  )}

                </svg>

                {/* =================================================
                    DYNAMIC TOOLTIP
                ================================================= */}

                <div
                  className="energy-tooltip interactive-tooltip"
                  style={{
                    left: `${
                      (selectedPoint.x /
                        600) *
                      100
                    }%`,
                    top: `${
                      (selectedPoint.y /
                        180) *
                      100
                    }%`,
                  }}
                >
                  <span>
                    {selectedDate}
                  </span>

                  <strong>
                    {unit === "₹"
                      ? `₹ ${Math.round(
                          selectedCost
                        ).toLocaleString()}`
                      : `${selectedUsage} kWh`}
                  </strong>

                  <small>
                    {unit === "₹"
                      ? `${selectedUsage} kWh`
                      : `₹ ${Math.round(
                          selectedCost
                        ).toLocaleString()}`}
                  </small>
                </div>

              </div>
            </div>

            {/* X AXIS */}

            <div className="chart-x-axis">
              {activeData.xLabels.map(
                (label) => (
                  <span key={label}>
                    {label}
                  </span>
                )
              )}
            </div>

            {/* =================================================
                SELECTED DATE DETAILS
            ================================================= */}

            <div className="selected-energy-details">

              <div className="selected-energy-title">
                <span className="selected-dot">
                  ●
                </span>

                <div>
                  <strong>
                    {selectedDate}
                  </strong>

                  <small>
                    Selected date
                  </small>
                </div>
              </div>

              <div className="selected-energy-values">

                <div>
                  <span>Energy</span>

                  <strong>
                    {selectedUsage} kWh
                  </strong>
                </div>

                <div>
                  <span>Electricity Rate</span>

                  <strong>
                    ₹ {ELECTRICITY_RATE}/kWh
                  </strong>
                </div>

                <div>
                  <span>Estimated Cost</span>

                  <strong>
                    ₹{" "}
                    {Math.round(
                      selectedCost
                    ).toLocaleString()}
                  </strong>
                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              INSIGHTS
          ================================================= */}

          <div className="energy-panel insights-panel">

            <div className="panel-header">

              <div>
                <h2>Energy Insights</h2>

                <p>
                  Smart recommendations
                </p>
              </div>

              <div className="insight-icon">
                💡
              </div>

            </div>

            <div className="insight-list">

              <div className="insight-item">

                <div className="insight-item-icon">
                  🔥
                </div>

                <div>
                  <strong>
                    Peak Usage
                  </strong>

                  <span>
                    {activeData.peakUsage}
                  </span>

                  <small>
                    {activeData.peakValue} kWh
                  </small>
                </div>

              </div>

              <div className="insight-item">

                <div className="insight-item-icon">
                  📈
                </div>

                <div>
                  <strong>
                    Average Daily
                  </strong>

                  <span>
                    {activeData.averageDaily} kWh
                  </span>

                  <small>
                    Daily consumption
                  </small>
                </div>

              </div>

              <div className="insight-item">

                <div className="insight-item-icon">
                  💰
                </div>

                <div>
                  <strong>
                    Selected Date Cost
                  </strong>

                  <span>
                    ₹{" "}
                    {Math.round(
                      selectedCost
                    ).toLocaleString()}
                  </span>

                  <small>
                    {selectedDate}
                  </small>
                </div>

              </div>

            </div>

            <div className="smart-tip">

              <span>✨</span>

              <div>
                <strong>
                  Smart Tip
                </strong>

                <p>
                  Reduce AC usage by 1 hour
                  daily to lower your monthly
                  energy consumption.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            BOTTOM SECTION
        ================================================= */}

        <section className="energy-bottom-grid">

          {/* =================================================
              TOP CONSUMERS
          ================================================= */}

          <div className="energy-panel consumers-panel">

            <div className="panel-header">

              <div>
                <h2>
                  Top Energy Consumers
                </h2>

                <p>
                  Devices using the most energy
                </p>
              </div>

              <span className="consumer-total">
                {activeData.totalUsageKwh} kWh
              </span>

            </div>

            <div className="consumers-list">

              {activeData.consumerData.map(
                (item) => (
                  <div
                    className="consumer-row"
                    key={item.name}
                  >

                    <div className="consumer-icon-box">
                      {item.icon}
                    </div>

                    <div className="consumer-main">

                      <div className="consumer-name-row">

                        <strong>
                          {item.name}
                        </strong>

                        <div>

                          <span>
                            {unit === "₹"
                              ? `₹ ${Math.round(
                                  item.usageKwh *
                                    ELECTRICITY_RATE
                                ).toLocaleString()}`
                              : `${item.usageKwh} kWh`}
                          </span>

                          <small>
                            {item.percentage}%
                          </small>

                        </div>

                      </div>

                      <div className="consumer-progress">

                        <div
                          className="consumer-progress-fill"
                          style={{
                            width: `${Math.min(
                              item.percentage *
                                2.5,
                              100
                            )}%`,
                          }}
                        />

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

          {/* =================================================
              COMPARISON
          ================================================= */}

          <div className="energy-panel comparison-panel">

            <div className="panel-header">

              <div>
                <h2>
                  Usage Comparison
                </h2>

                <p>
                  Compared with previous
                  period
                </p>
              </div>

              <div className="comparison-icon">
                📊
              </div>

            </div>

            <div className="comparison-main">

              <div className="comparison-circle">

                <div>

                  <strong>
                    {Math.abs(
                      usageDifferencePercent
                    )}%
                  </strong>

                  <span>
                    {usageDifference <= 0
                      ? "Lower"
                      : "Higher"}
                  </span>

                </div>

              </div>

              <div className="comparison-details">

                <div>
                  <span>Current</span>

                  <strong>
                    {activeData.totalUsageKwh} kWh
                  </strong>
                </div>

                <div>
                  <span>Previous</span>

                  <strong>
                    {activeData.previousUsage} kWh
                  </strong>
                </div>

                <div>
                  <span>Cost</span>

                  <strong>
                    ₹{" "}
                    {estimatedCost.toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>Previous Cost</span>

                  <strong>
                    ₹{" "}
                    {previousCost.toLocaleString()}
                  </strong>
                </div>

              </div>

            </div>

            <div className="comparison-message">

              {usageDifference <= 0 ? (
                <>
                  <span>✓</span>

                  <p>
                    Great job! Your energy
                    usage is lower than the
                    previous period.
                  </p>
                </>
              ) : (
                <>
                  <span>⚠</span>

                  <p>
                    Your energy usage is
                    higher than the previous
                    period.
                  </p>
                </>
              )}

            </div>

          </div>

        </section>

        {/* =================================================
            SAVING BANNER
        ================================================= */}

        <section className="energy-saving-banner">

          <div className="saving-banner-icon">
            🌱
          </div>

          <div className="saving-banner-content">

            <h3>
              You're saving energy!
            </h3>

            <p>
              Your smart home has saved{" "}
              <strong>
                {activeData.saved}%
              </strong>{" "}
              energy during this period.
              Keep optimizing your devices
              to save even more.
            </p>

          </div>

          <div className="saving-banner-stat">

            <strong>
              {activeData.saved}%
            </strong>

            <span>
              Saved
            </span>

          </div>

        </section>

      </main>
    </div>
  );
}
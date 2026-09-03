  import React, { useMemo, useState } from "react";
  import "./Analytics.css";

  export default function Analytics() {
    const [timeRange, setTimeRange] = useState("This Month");
    const [selectedAutomation, setSelectedAutomation] = useState(null);
    const [selectedBar, setSelectedBar] = useState(null);

    // =====================================================
    // ENERGY DATA
    // =====================================================

    const datasets = {
      "This Month": {
        labels: ["1 May", "5 May", "10 May", "15 May", "20 May", "25 May", "31 May"],
        values: [18, 25, 21, 30, 27, 34, 29],
        usage: "128.7",
        previous: "156.4",
        change: "17.7%",
        peak: "34 kWh",
        average: "26.4 kWh",
      },

      "Last Month": {
        labels: ["1 Apr", "5 Apr", "10 Apr", "15 Apr", "20 Apr", "25 Apr", "30 Apr"],
        values: [14, 22, 28, 20, 31, 26, 35],
        usage: "156.4",
        previous: "141.2",
        change: "10.8%",
        peak: "35 kWh",
        average: "25.9 kWh",
      },

      "This Year": {
        labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
        values: [18, 25, 31, 38, 34, 29],
        usage: "1,482.6",
        previous: "1,924.8",
        change: "23%",
        peak: "38 kWh",
        average: "29.2 kWh",
      },
    };

    const currentData = datasets[timeRange];

    // =====================================================
    // AUTOMATIONS
    // =====================================================

    const automations = [
      {
        id: 1,
        name: "Good Morning",
        description: "Starts your morning routine automatically.",
        runs: 12,
        percentage: 80,
        icon: "☀️",
        status: "Active",
        lastRun: "Today, 7:30 AM",
        devices: 6,
      },
      {
        id: 2,
        name: "Away Mode",
        description: "Secures your home when you leave.",
        runs: 8,
        percentage: 60,
        icon: "🛡️",
        status: "Active",
        lastRun: "Today, 9:15 AM",
        devices: 10,
      },
      {
        id: 3,
        name: "Good Night",
        description: "Turns off devices and secures your home.",
        runs: 7,
        percentage: 50,
        icon: "🌙",
        status: "Active",
        lastRun: "Yesterday, 11:20 PM",
        devices: 8,
      },
    ];

    // =====================================================
    // STATISTICS
    // =====================================================

    const statistics = [
      {
        title: "Total Devices",
        value: "24",
        change: "+4",
        label: "this month",
        icon: "▣",
        type: "purple",
      },
      {
        title: "Automations",
        value: "08",
        change: "+2",
        label: "this month",
        icon: "⚙",
        type: "blue",
      },
      {
        title: "Scenes",
        value: "12",
        change: "+3",
        label: "this month",
        icon: "✦",
        type: "orange",
      },
      {
        title: "Energy Saved",
        value: "32%",
        change: "+8%",
        label: "vs last month",
        icon: "↗",
        type: "green",
      },
    ];

    // =====================================================
    // CALCULATIONS
    // =====================================================

    const totalRuns = useMemo(() => {
      return automations.reduce((total, item) => total + item.runs, 0);
    }, []);

    // =====================================================
    // HANDLERS
    // =====================================================

    const handleAutomationClick = (automation) => {
      setSelectedAutomation(automation);
    };

    return (
      <div className="analytics-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="analytics-header">

          <div className="analytics-heading">

            <div className="analytics-eyebrow">
              <span className="live-dot"></span>
              SMART HOME INSIGHTS
            </div>

            <h1>Analytics</h1>

            <p>
              Understand your home's performance, energy usage,
              and automation activity.
            </p>

          </div>

          <div className="analytics-header-status">

            <div className="system-status">
              <span className="system-status-dot"></span>

              <div>
                <strong>System Healthy</strong>
                <small>All services operational</small>
              </div>
            </div>

          </div>

        </header>


        {/* =================================================
            OVERVIEW BANNER
        ================================================= */}

        <section className="analytics-overview">

          <div className="overview-glow"></div>

          <div className="overview-content">

            <div className="overview-icon">
              ✦
            </div>

            <div>

              <span className="overview-label">
                HOME PERFORMANCE
              </span>

              <h2>
                Your smart home is running efficiently.
              </h2>

              <p>
                Energy consumption is down compared with
                the previous period.
              </p>

            </div>

          </div>

          <div className="overview-score">

            <span>Efficiency</span>

            <strong>92%</strong>

            <div className="score-line">
              <span></span>
            </div>

          </div>

        </section>


        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="stats-grid">

          {statistics.map((stat) => (

            <button
              className="stat-card"
              key={stat.title}
              onClick={() => {
                setTimeRange("This Month");
              }}
            >

              <div className={`stat-icon ${stat.type}`}>
                {stat.icon}
              </div>

              <div className="stat-card-content">

                <div className="stat-top">

                  <span className="stat-title">
                    {stat.title}
                  </span>

                  <span className="stat-arrow">
                    ↗
                  </span>

                </div>

                <div className="stat-value">
                  {stat.value}
                </div>

                <div className="stat-footer">

                  <span className="stat-change">
                    {stat.change}
                  </span>

                  <span className="stat-label">
                    {stat.label}
                  </span>

                </div>

              </div>

            </button>

          ))}

        </section>


        {/* =================================================
            MAIN ANALYTICS GRID
        ================================================= */}

        <div className="analytics-main-grid">


          {/* =================================================
              ENERGY CHART
          ================================================= */}

          <section className="analytics-card energy-analytics-card">

            <div className="card-header">

              <div>

                <span className="card-eyebrow">
                  ENERGY PERFORMANCE
                </span>

                <h2>Usage Summary</h2>

                <p>
                  Monitor your home's energy consumption.
                </p>

              </div>

              <div className="chart-controls">

                <div className="chart-total">

                  <strong>
                    {currentData.usage}
                  </strong>

                  <span>kWh</span>

                </div>

                <select
                  value={timeRange}
                  onChange={(e) =>
                    setTimeRange(e.target.value)
                  }
                >
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>

              </div>

            </div>


            {/* ENERGY SUMMARY */}

            <div className="energy-mini-stats">

              <div>
                <span>Average</span>
                <strong>{currentData.average}</strong>
              </div>

              <div>
                <span>Peak usage</span>
                <strong>{currentData.peak}</strong>
              </div>

              <div>
                <span>Compared</span>
                <strong className="saving-value">
                  ↓ {currentData.change}
                </strong>
              </div>

            </div>


            {/* CHART */}

            <div className="premium-chart">

              <div className="chart-y-axis">

                <span>40</span>
                <span>30</span>
                <span>20</span>
                <span>10</span>
                <span>0</span>

              </div>

              <div className="chart-area">

                <div className="chart-grid-lines">

                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>

                </div>

                <div className="chart-bars">

                  {currentData.values.map((value, index) => (

                    <div
                      className="chart-column"
                      key={`${timeRange}-${index}`}
                      onMouseEnter={() =>
                        setSelectedBar({
                          value,
                          label: currentData.labels[index],
                        })
                      }
                      onMouseLeave={() =>
                        setSelectedBar(null)
                      }
                    >

                      {selectedBar &&
                        selectedBar.label ===
                          currentData.labels[index] && (

                          <div className="bar-tooltip">

                            <strong>
                              {selectedBar.value} kWh
                            </strong>

                            <span>
                              {selectedBar.label}
                            </span>

                          </div>

                        )}

                      <div className="bar-wrapper">

                        <div
                          className="chart-bar"
                          style={{
                            height: `${(value / 40) * 100}%`,
                          }}
                        >
                          <span></span>
                        </div>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="chart-x-axis">

                  {currentData.labels.map((label) => (

                    <span key={label}>
                      {label}
                    </span>

                  ))}

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              PERFORMANCE CARD
          ================================================= */}

          <section className="analytics-card performance-card">

            <div className="card-header">

              <div>

                <span className="card-eyebrow">
                  PERFORMANCE
                </span>

                <h2>Home Score</h2>

                <p>
                  Overall automation efficiency.
                </p>

              </div>

              <span className="performance-icon">
                ✦
              </span>

            </div>


            <div className="score-circle">

              <div className="score-circle-inner">

                <strong>92</strong>

                <span>/100</span>

              </div>

            </div>


            <div className="score-description">

              <strong>Excellent performance</strong>

              <p>
                Your smart home is optimized and
                operating efficiently.
              </p>

            </div>


            <div className="performance-items">

              <div>

                <span>
                  Automation efficiency
                </span>

                <strong>96%</strong>

              </div>

              <div>

                <span>
                  Energy efficiency
                </span>

                <strong>89%</strong>

              </div>

              <div>

                <span>
                  Device availability
                </span>

                <strong>98%</strong>

              </div>

            </div>

          </section>

        </div>


        {/* =================================================
            AUTOMATIONS
        ================================================= */}

        <section className="analytics-card automations-card">

          <div className="card-header">

            <div>

              <span className="card-eyebrow">
                AUTOMATION INSIGHTS
              </span>

              <h2>Most Used Automations</h2>

              <p>
                Your most frequently triggered smart home routines.
              </p>

            </div>

            <div className="automation-total">

              <strong>{totalRuns}</strong>

              <span>Total runs</span>

            </div>

          </div>


          <div className="automations-list">

            {automations.map((item, index) => (

              <button
                key={item.id}
                className="automation-item"
                onClick={() =>
                  handleAutomationClick(item)
                }
              >

                <div className="automation-rank">
                  0{index + 1}
                </div>

                <div className="auto-icon">
                  {item.icon}
                </div>

                <div className="auto-details">

                  <div className="auto-info">

                    <div>

                      <div className="auto-name">
                        {item.name}
                      </div>

                      <div className="auto-runs">
                        {item.runs} runs
                        <span>•</span>
                        {item.devices} devices
                      </div>

                    </div>

                    <div className="auto-percentage">
                      {item.percentage}%
                    </div>

                  </div>

                  <div className="progress-bg">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    ></div>

                  </div>

                </div>

                <div className="automation-arrow">
                  →
                </div>

              </button>

            ))}

          </div>

        </section>


        {/* =================================================
            AUTOMATION MODAL
        ================================================= */}

        {selectedAutomation && (

          <div
            className="analytics-modal-backdrop"
            onClick={() =>
              setSelectedAutomation(null)
            }
          >

            <div
              className="analytics-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedAutomation(null)
                }
              >
                ×
              </button>

              <div className="modal-icon">
                {selectedAutomation.icon}
              </div>

              <span className="card-eyebrow">
                AUTOMATION DETAILS
              </span>

              <h2>
                {selectedAutomation.name}
              </h2>

              <p className="modal-description">
                {selectedAutomation.description}
              </p>


              <div className="modal-status">
                <span className="status-dot"></span>

                <div>
                  <strong>
                    {selectedAutomation.status}
                  </strong>

                  <small>
                    Automation is currently active
                  </small>
                </div>

              </div>


              <div className="modal-stats">

                <div>
                  <span>Total Runs</span>
                  <strong>
                    {selectedAutomation.runs}
                  </strong>
                </div>

                <div>
                  <span>Devices</span>
                  <strong>
                    {selectedAutomation.devices}
                  </strong>
                </div>

                <div>
                  <span>Last Run</span>
                  <strong>
                    {selectedAutomation.lastRun}
                  </strong>
                </div>

              </div>


              <button
                className="modal-button"
                onClick={() =>
                  setSelectedAutomation(null)
                }
              >
                Done
              </button>

            </div>

          </div>

        )}

      </div>
    );
  }
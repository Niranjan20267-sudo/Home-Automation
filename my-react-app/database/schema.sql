CREATE DATABASE IF NOT EXISTS smarthome;

USE smart_home;

-- =========================================
-- USERS
-- =========================================

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    provider VARCHAR(50) DEFAULT 'local',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- ROOMS
-- =========================================

CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- DEVICES
-- =========================================

CREATE TABLE IF NOT EXISTS devices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    room_id INT,
    status BOOLEAN DEFAULT FALSE,
    power_usage DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (room_id)
        REFERENCES rooms(id)
        ON DELETE SET NULL
);

-- =========================================
-- SCENES
-- =========================================

CREATE TABLE IF NOT EXISTS scenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- SCENE DEVICES
-- =========================================

CREATE TABLE IF NOT EXISTS scene_devices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scene_id INT NOT NULL,
    device_id INT NOT NULL,
    target_status BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (scene_id)
        REFERENCES scenes(id)
        ON DELETE CASCADE,

    FOREIGN KEY (device_id)
        REFERENCES devices(id)
        ON DELETE CASCADE
);

-- =========================================
-- AUTOMATIONS
-- =========================================

CREATE TABLE IF NOT EXISTS automations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    trigger_type VARCHAR(50),
    trigger_value VARCHAR(100),
    action_type VARCHAR(50),
    action_value VARCHAR(100),
    enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- ENERGY USAGE
-- =========================================

CREATE TABLE IF NOT EXISTS energy_usage (
    id INT AUTO_INCREMENT PRIMARY KEY,
    device_id INT,
    usage_kwh DECIMAL(10,3) NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (device_id)
        REFERENCES devices(id)
        ON DELETE SET NULL
);

-- =========================================
-- SECURITY EVENTS
-- =========================================

CREATE TABLE IF NOT EXISTS security_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    severity VARCHAR(30) DEFAULT 'normal',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- USER SETTINGS
-- =========================================

CREATE TABLE IF NOT EXISTS user_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    theme VARCHAR(20) DEFAULT 'dark',
    notifications BOOLEAN DEFAULT TRUE,
    email_notifications BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- =========================================
-- DEFAULT ROOMS
-- =========================================

INSERT INTO rooms (name)
SELECT 'Living Room'
WHERE NOT EXISTS (
    SELECT 1 FROM rooms WHERE name = 'Living Room'
);

INSERT INTO rooms (name)
SELECT 'Bedroom'
WHERE NOT EXISTS (
    SELECT 1 FROM rooms WHERE name = 'Bedroom'
);

INSERT INTO rooms (name)
SELECT 'Kitchen'
WHERE NOT EXISTS (
    SELECT 1 FROM rooms WHERE name = 'Kitchen'
);

INSERT INTO rooms (name)
SELECT 'Study Room'
WHERE NOT EXISTS (
    SELECT 1 FROM rooms WHERE name = 'Study Room'
);
CREATE DATABASE IF NOT EXISTS bmw_travel;

USE bmw_travel;

CREATE TABLE IF NOT EXISTS journeys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    distance DECIMAL(10,4) NOT NULL,
    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO journeys
(distance, latitude, longitude)
VALUES
(0.0000, 27.7172, 85.3240);
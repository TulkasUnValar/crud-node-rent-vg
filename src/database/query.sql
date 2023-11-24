CREATE DATABASE Prueba01;

USE Prueba01;

CREATE TABLE personas(
    cc INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    age INT(3) NOT NULL,
    phone INT(20) NOT NULL,
    address VARCHAR(50) NOT NULL
);

CREATE TABLE videojuegos(
    cod INT AUTO_INCREMENT PRIMARY KEY,
    videogame_name VARCHAR(50) NOT NULL,
    year INT(4) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    producer VARCHAR(50) NOT NULL,
    director VARCHAR(50) NOT NULL
);

SELECT * FROM personas;
SELECT * FROM videojuegos;
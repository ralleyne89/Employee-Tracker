CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
name VARCHAR (30) UNIQUE NOT NULL
);

CREATE TABLE roles (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
title VARCHAR (30),
salary DECIMAL,
department_id INT
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT
);






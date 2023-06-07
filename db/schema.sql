DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id)
REFERENCES department(id)
ON DELETE SET NULL
);

CREATE TABLE employee (
employee_id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
FOREIGN KEY (role_id)
REFERENCES role(id)
ON DELETE SET NULL,
manager_id INT REFERENCES employee(id) ON DELETE SET NULL
);
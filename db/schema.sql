DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
VARCHAR(30) name,
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
VARCHAR(30) title
DECIMAL salary
department_id INT,
FOREIGN KEY (department_id)
REFERENCES department(id)
ON DELETE SET NULL,
);

CREATE TABLE employee (
INT id
VARCHAR(30) first_name
VARCHAR(30) last_name
role_id INT,
FOREIGN KEY (role_id)
REFERENCES role(id)
ON DELETE SET NULL,
INT manager_id
FOREIGN KEY (manager_id)
REFERENCES employee(id)
ON DELETE SET NULL,
);
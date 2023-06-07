INSERT INTO department (id, name)    
 VALUES (1, "Sales"),
        (2, "Research and Development"),
        (3, "IT");

INSERT INTO role (id, title, salary, department_id)     
VALUES (1, "Sales Lead", 75000, 1),
       (2, "Sales Representative", 45000, 1),
       (3, "Project Manager", 65000, 3),
       (4, "Engineer", 55000, 3),
       (5, "Lead Researcher", 60000, 2),
       (6, "Researcher", 50000, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Albert", "Smith", 2, 2),
       (2, "Amy", "Thompson", 1, NULL),
       (3, "Robert", "Larson", 2, 2),
       (4, "Susanne", "Jones", 4, 5),
       (5, "Joe", "Johnson", 3, NULL);
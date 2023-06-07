const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employees_db'
    },
  );

//baseMenu();

//function baseMenu()
//{
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: 
            [
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager", 
                "Add Employee", 
                "Remove Employee", 
                "Update Employee Role", 
                "Update Employee Manager",
                "View All Roles",
                "Add Role",
                "Remove Role",
                "View All Departments",
                "Add Department",
                "Remove Department",
                "View Total Utilized Budget by Department",
                "Quit"
            ],
        }
    ])
    .then((data) => {
        switch(data) {
            case "View All Employees":
             db.query('SELECT * FROM employees', function (err, results) {
                console.log(results);
             })
        }
    });
//}
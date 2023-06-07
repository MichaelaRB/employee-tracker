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

baseMenu();

function baseMenu()
{
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: 
            [
                "View All Employees",
                "Add Employee", 
                "Update Employee Role", 
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Quit"
            ],
        }
    ])
    .then((data) => {
        switch(data.menu) {
            case "View All Employees":
             db.query(`SELECT e.employee_id, e.first_name, e.last_name, r.title, r.salary, d.department_name, CONCAT(m.first_name, ' ', m.last_name) AS manager
             FROM employee e
             LEFT JOIN role r ON e.role_id = r.id
             LEFT JOIN department d ON r.department_id = d.id
             LEFT JOIN employee m ON m.employee_id = e.manager_id;`,
             function (err, results) {
                console.clear();
                console.log('\n');
                console.table(results);
                baseMenu();
             });
        }
    });
}
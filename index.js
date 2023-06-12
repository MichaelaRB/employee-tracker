const inquirer = require('inquirer');
const mysql = require('mysql2');

var employees = [];
var employeeIds = [];
var managers = [];
var roles = [];
var roleIds = [];
var roleId;
var managerId;


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
                console.log('\n');
                console.table(results);
                baseMenu();
             });
             break;
             case "Update Employee Role":
                
            //get the employee names and ids from the database, ask the user to pick an employee by name
             db.query(`SELECT first_name, last_name, employee_id FROM employee;`, function (err, results) {
                console.log('\n');
                for(var i = 0; i < results.length; i++) {
                    employees[i] = results[i].first_name + " " + results[i].last_name;
                    employeeIds[i] = results[i].employee_id;
                }
                inquirer
                .prompt([
                {
                    type: 'list',
                    name: 'updateEmployees',
                    message: "Which employee's role would you like to update?",
                    choices: employees,
                }
                ])
                .then((data) => {
                    var employeeId;
                    for(var i = 0; i < employees.length; i++) {
                        if(data.updateEmployees === employees[i])
                        {
                            employeeId = employeeIds[i];
                        }
                    }
                    //gets role information then prompts the user to select the employee's new role
                    db.query('SELECT id, title FROM role;', function (err, results) {

                        for(var i = 0; i < results.length; i++) {
                            roles[i] = results[i].title;
                            roleIds[i] = results[i].id;
                        }
                    console.log('\n');
                    inquirer
                    .prompt([
                    {
                        type: 'list',
                        name: 'updateRole',
                        message: "Which role would you like to assign to this employee?",
                        choices: roles,
                    }
                    ])
                    .then((data) => {
                        for(var i = 0; i < roles.length; i++)
                        {
                            if(data.updateRole === roles[i]) 
                            {
                                roleId = roleIds[i];
                            }
                        }
                        db.query(`UPDATE employee SET role_id = ${roleId}, manager_id = 0 WHERE employee_id = ${employeeId};`);
                        baseMenu();
                    })

                    })
                 });
                }
                );

                break;
            case "View All Departments":
            db.query('SELECT id, department_name FROM department', function (err, results) {
                console.log('\n');
                console.table(results);
                baseMenu();
            });
            break;
            case "View All Roles":
            db.query(`SELECT r.title, r.id, d.department_name AS department, r.salary FROM role r
                LEFT JOIN department d ON d.id = r.department_id;`,
                function (err, results) {
                console.log('\n');
                console.table(results);
                baseMenu();
            });
            break;
            case "Add Employee":
                db.query("select title, id from role", function(err, results){
                    for(var i = 0; i < results.length; i++)
                    {
                        roles[i] = results[i].title;
                        roleIds[i] = results[i].id;
                    }
                });
                db.query("select first_name, last_name, employee_id FROM employee", function(err, results) {
                    for(var i = 0; i < results.length; i ++) {
                        managers[i] = results[i].first_name + " " + results[i].last_name;
                        employeeIds[i] = results[i].employee_id;
                    }
                });
                managers.push("No Manager");
                inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the first name of the employee you would like to add?',
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the last name of the employee you would like to add?',
                    },
                    {
                        type: 'list',
                        name: 'title',
                        message: "What is this employee's job title?",
                        choices: roles,
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: "Who is this employee's manager?",
                        choices: managers,
                    }
                ])
                .then((data) => {
                    for(var i = 0; i < managers.length; i++)
                    {
                        if(data.manager === managers[i]) managerId = employeeIds[i];
                    }
                    for(var i = 0; i < roles.length; i++)
                    {
                        if(data.title === roles[i]) roleId = roleIds[i];
                    }
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.firstName}", "${data.lastName}", ${roleId}, ${managerId});`);
                    baseMenu();
                });
            break;
        }
    });
}
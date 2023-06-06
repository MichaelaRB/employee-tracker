const inquirer = require('inquirer');
inquirer
.prompt([
    {
        type: 'list',
        name: 'initOptions',
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
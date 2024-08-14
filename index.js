// index.js
const inquirer = require('inquirer');
const {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
} = require('./db/queries');

function mainMenu() {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do today? (Choose wisely, says Conor Lee)',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    }).then((answer) => {
        switch (answer.action) {
            case 'View all departments':
                viewDepartments(mainMenu);
                break;
            case 'View all roles':
                viewRoles(mainMenu);
                break;
            case 'View all employees':
                viewEmployees(mainMenu);
                break;
            case 'Add a department':
                addDepartment(mainMenu);
                break;
            case 'Add a role':
                addRole(mainMenu);
                break;
            case 'Add an employee':
                addEmployee(mainMenu);
                break;
            case 'Update an employee role':
                updateEmployeeRole(mainMenu);
                break;
            case 'Exit':
                console.log('Goodbye! Application created by Conor Lee.');
                process.exit();
                break;
            default:
                console.log('Invalid option selected.');
                mainMenu();
                break;
        }
    });
}

mainMenu();

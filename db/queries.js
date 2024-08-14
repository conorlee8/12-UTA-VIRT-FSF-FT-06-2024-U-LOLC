// db/queries.js
const client = require('./connection');
const inquirer = require('inquirer');

// Function to view all departments
function viewDepartments(mainMenu) {
    client.query('SELECT * FROM department', (err, res) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.table(res.rows);
        }
        mainMenu();
    });
}

// Function to view all roles
function viewRoles(mainMenu) {
    const query = `
        SELECT role.id, role.title, department.name AS department, role.salary
        FROM role
        LEFT JOIN department ON role.department_id = department.id;
    `;
    client.query(query, (err, res) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.table(res.rows);
        }
        mainMenu();
    });
}

// Function to view all employees
function viewEmployees(mainMenu) {
    const query = `
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id;
    `;
    client.query(query, (err, res) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.table(res.rows);
        }
        mainMenu();
    });
}

// Function to add a department
function addDepartment(mainMenu) {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: "Enter the name of the new department:",
    }).then(answer => {
        client.query('INSERT INTO department (name) VALUES ($1)', [answer.name], (err, res) => {
            if (err) {
                console.error('Error executing query', err.stack);
            } else {
                console.log(`Department "${answer.name}" added successfully.`);
            }
            mainMenu();
        });
    });
}

// Function to add a role
function addRole(mainMenu) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: "Enter the role title:"
        },
        {
            type: 'input',
            name: 'salary',
            message: "Enter the role salary:"
        },
        {
            type: 'input',
            name: 'department_id',
            message: "Enter the department ID for this role:"
        }
    ]).then(answers => {
        client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answers.title, answers.salary, answers.department_id], (err, res) => {
            if (err) {
                console.error('Error executing query', err.stack);
            } else {
                console.log(`Role "${answers.title}" added successfully.`);
            }
            mainMenu();
        });
    });
}

// Function to add an employee
function addEmployee(mainMenu) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "Enter the employee's first name:"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Enter the employee's last name:"
        },
        {
            type: 'input',
            name: 'role_id',
            message: "Enter the role ID for this employee:"
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "Enter the manager ID for this employee (leave blank if none):"
        }
    ]).then(answers => {
        const manager_id = answers.manager_id ? answers.manager_id : null;
        client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.first_name, answers.last_name, answers.role_id, manager_id], (err, res) => {
            if (err) {
                console.error('Error executing query', err.stack);
            } else {
                console.log(`Employee "${answers.first_name} ${answers.last_name}" added successfully.`);
            }
            mainMenu();
        });
    });
}

// Function to update an employee role
function updateEmployeeRole(mainMenu) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: "Enter the ID of the employee you want to update:"
        },
        {
            type: 'input',
            name: 'role_id',
            message: "Enter the new role ID for this employee:"
        }
    ]).then(answers => {
        client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answers.role_id, answers.employee_id], (err, res) => {
            if (err) {
                console.error('Error executing query', err.stack);
            } else {
                console.log(`Employee ID "${answers.employee_id}" updated successfully.`);
            }
            mainMenu();
        });
    });
}

// Export all functions
module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};

const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "sasdj2418",
    database: "employees_db",
});

function makeSelections() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "selections",
                choices: [
                    "View all employees",
                    "View all employees by department",
                    "View all employees by manager",
                    "Add an employee",
                    "Remove an employee",
                    "Update an employee role",
                    "Update an employee manager",
                ],
            },
        ])
        .then((response) => {
            switch (response.selections) {
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "View all employees by department":
                    viewAllEmployeesByDepartment();
                    break;
                case "View all employees by manager":
                    viewAllEmployeesByManager();
                    break;
                case "Add an employee":
                    addAnEmployee();
                    break;
                case "Remove an employee":
                    removeAnEmployee();
                    break;
                case "Update an employee role":
                    updateAnEmployeeRole();
                    break;
                case "Update an employee manager":
                    updateAnEmployeeManager();
                    break;
            }
        });
}
makeSelections();

function viewAllEmployees() {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId + "\n");
        connection.query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department 
                        FROM employee 
                        LEFT JOIN role ON employee.role_id = role.id 
                        LEFT JOIN department On role.department_id = department.id`,
            (err, res) => {
                if (err) throw err;
                console.table(res);
                connection.end();
            }
        );
    });
}

function viewAllEmployeesByDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter department name",
                name: "department",
            },
        ])
        .then(function (response) {
            connection.connect(function (err) {
                if (err) throw err;
                console.log("connected as id " + connection.threadId + "\n");
                connection.query(
                    `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager 
                                FROM employee 
                                LEFT JOIN employee AS e2 ON e2.id = employee.manager_id 
                                JOIN role ON employee.role_id = role.id 
                                JOIN department On role.department_id = department.id 
                                WHERE department.name = ?`,
                    response.department,
                    (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        connection.end();
                    }
                );
            });
        });
}

function viewAllEmployeesByManager() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter manager's name",
                name: "manager",
            },
        ])
        .then(function (response) {
            connection.connect(function (err) {
                if (err) throw err;
                console.log("connected as id " + connection.threadId + "\n");
                connection.query(
                    `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager 
            FROM employee 
            LEFT JOIN employee AS e2 ON e2.id = employee.manager_id 
            JOIN role ON employee.role_id = role.id 
            JOIN department On role.department_id = department.id 
            WHERE e2.first_name = ?`,
                    response.manager,
                    (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        connection.end();
                    }
                );
            });
        });
}

function addAnEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter employee's first name",
                name: "first",
            },
            {
                type: "input",
                message: "Please enter employee's last name",
                name: "last",
            },
            {
                type: "list",
                message: "Please choose employee's role",
                name: "role",
                choices: getRoles(),
            },
            {
                type: "list",
                message: "Please choose employee's manager",
                name: "manager",
                choices: getManagers(),
            },
        ])
        .then(function (response) {
            var roleID = getRoleID(response.role);
            var managerID = getManagerID(response.manager);
            console.log(response);
            connection.query(
                `INSERT INTO employee SET first_name = ?, last_name =?, role_id = ?, manager_id = ?`,
                [response.first, response.last, roleID, managerID],
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                }
            );
        });
}

function getRoles() {
    let data = [];
    connection.query(`SELECT role.title FROM role`, (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            data.push(res[i].title);
        }
    });
    return data;
}

function getManagers() {
    let data = [];
    connection.query(`SELECT employee.first_name FROM employee`, (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            data.push(res[i].first_name);
        }
    });
    return data;
}

function getRoleID(name) {
    var roleID;
    connection.query(
        `SELECT id FROM role WHERE role.title = ?`,
        name,
        (err, res) => {
            if (err) throw err;
            roleID = res[0].id;
            return roleID;
        }
    );
}

function getManagerID(name) {
    var managerID;
    connection.query(
        `SELECT id FROM employee WHERE employee.first_name = ?`,
        name,
        (err, res) => {
            if (err) throw err;
            managerID = res[0].id;
            return managerID;
        }
    );
}

const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_db",
});

connection.connect(function (err) {
    if (err) throw err;
    else makeSelections();
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
                    "View all roles",
                    "Add an role",
                    "View all departments",
                    "Add an department",
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
                case "View all roles":
                    viewAllRoles();
                    break;
                case "Add an role":
                    addAnRole();
                    break;
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "Add an department":
                    addAnDepartment();
                    break;
            }
        });
}
function viewAllEmployees() {
    console.log("connected as id " + connection.threadId + "\n");
    connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager 
                    FROM employee 
                    LEFT JOIN employee AS e2 ON e2.id = employee.manager_id 
                    LEFT JOIN role ON employee.role_id = role.id 
                    LEFT JOIN department On role.department_id = department.id`,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            makeSelections();
        }
    );
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
                    makeSelections();
                }
            );
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
                        makeSelections();
                    }
                );
        });
}

async function addAnEmployee() {
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
                choices: await getRoles(),
            },
            {
                type: "list",
                message: "Please choose employee's manager",
                name: "manager",
                choices: await getManagers(),
            },
        ])
        .then(async function (response) {
            var roleID = await getRoleID(response.role);
            var managerID = await getManagerID(response.manager);
            connection.query(
                `INSERT INTO employee SET first_name = ?, last_name =?, role_id = ?, manager_id = ?`,
                [response.first, response.last, roleID, managerID],
                (err, res) => {
                    if (err) throw err;
                    // console.table(res);
                    makeSelections();
                }
            );
        });
}

async function updateAnEmployeeRole() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee's role do you want to update?",
                name: "employee",
                choices: await getManagers(),
            },
            {
                type: "list",
                message: "Which role do you want to set for selected employee?",
                name: "role",
                choices: await getRoles(),
            },
        ])
        .then(async function (response) {
            var roleID = await getRoleID(response.role);
            var employeeID = await getManagerID(response.employee);
            connection.query(
                `UPDATE employee SET role_id = ? WHERE id = ?`,
                [roleID, employeeID],
                (err, res) => {
                    if (err) throw err;
                    // console.table(res);
                    makeSelections();
                }
            );
        });
}

async function updateAnEmployeeManager() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee's role do you want to update?",
                name: "employee",
                choices: await getManagers(),
            },
            {
                type: "list",
                message: "Which manager do you want to set for selected employee?",
                name: "manager",
                choices: await getManagers(),
            },
        ])
        .then(async function (response) {
            var managerID = await getManagerID(response.manager);
            var employeeID = await getManagerID(response.employee);
            connection.query(
                `UPDATE employee SET manager_id = ? WHERE id = ?`,
                [managerID, employeeID],
                (err, res) => {
                    if (err) throw err;
                    // console.table(res);
                    makeSelections();
                }
            );
        });
}

async function removeAnEmployee() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee do you want to remove?",
                name: "employee",
                choices: await getManagers(),
            },
        ])
        .then(async function (response) {
            var employeeID = await getManagerID(response.employee);
            connection.query(
                `DELETE FROM employee WHERE id = ?`,
                employeeID,
                (err, res) => {
                    if (err) throw err;
                    // console.table(res);
                    makeSelections();
                }
            );
        });
}

function viewAllRoles() {
    console.log("connected as id " + connection.threadId + "\n");
    connection.query(
        `SELECT role.id, role.title, role.salary, department.name AS department 
                    FROM role 
                    LEFT JOIN department On role.department_id = department.id`,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            makeSelections();
        }
    );
}

async function addAnRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter role's title",
                name: "title",
            },
            {
                type: "input",
                message: "Please enter role's salary",
                name: "salary",
            },
            {
                type: "list",
                message: "Please choose department",
                name: "department",
                choices: await getDepartments(),
            },
        ])
        .then(async function (response) {
            var departmentID = await getDepartmentID(response.department);
            connection.query(
                `INSERT INTO role SET title = ?, salary =?, department_id = ?`,
                [response.title, response.salary, departmentID],
                (err, res) => {
                    if (err) throw err;
                    // console.table(res);
                    makeSelections();
                }
            );
        });
}

function viewAllDepartments() {
    console.log("connected as id " + connection.threadId + "\n");
    connection.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
        console.table(res);
        makeSelections();
    });
}

async function addAnDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter department's name",
                name: "name",
            },
        ])
        .then(async function (response) {
            connection.query(
                `INSERT INTO department SET name = ?`,
                response.name,
                (err, res) => {
                    if (err) throw err;
                    // console.table(res);
                    makeSelections();
                }
            );
        });
}

function getRoles() {
    return new Promise((resolve) => {
        let data = [];
        connection.query(`SELECT role.title FROM role`, (err, res) => {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                data.push(res[i].title);
            }
            resolve(data);
        });
    });
}

function getManagers() {
    return new Promise((resolve) => {
        let data = [];
        connection.query(`SELECT employee.first_name FROM employee`, (err, res) => {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                data.push(res[i].first_name);
            }
            resolve(data);
        });
    });
}

function getDepartments() {
    return new Promise((resolve) => {
        let data = [];
        connection.query(`SELECT department.name FROM department`, (err, res) => {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                data.push(res[i].name);
            }
            resolve(data);
        });
    });
}

function getRoleID(name) {
    return new Promise((resolve) => {
        var roleID;
        connection.query(
            `SELECT id FROM role WHERE role.title = ?`,
            name,
            (err, res) => {
                if (err) throw err;
                roleID = res[0].id;
                resolve(roleID);
            }
        );
    });
}

function getManagerID(name) {
    return new Promise((resolve) => {
        var managerID;
        connection.query(
            `SELECT id FROM employee WHERE employee.first_name = ?`,
            name,
            (err, res) => {
                if (err) throw err;
                managerID = res[0].id;
                resolve(managerID);
            }
        );
    });
}

function getDepartmentID(name) {
    return new Promise((resolve) => {
        var managerID;
        connection.query(
            `SELECT id FROM department WHERE department.name = ?`,
            name,
            (err, res) => {
                if (err) throw err;
                managerID = res[0].id;
                resolve(managerID);
            }
        );
    });
}

process.on("SIGINT", function () {
    connection.end();
    process.exit();
});

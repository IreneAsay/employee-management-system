const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
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
        connection.query("SELECT * FROM employee", (err, res) => {
            if (err) throw err;
            console.table(res);
            connection.end();
        });
    });
};

function viewAllEmployeesByDepartment() {
    inquirer.prompt().then(function (response) {
        connection.connect(function (err) {
            if (err) throw err;
            console.log("connected as id " + connection.threadId + "\n");
            connection.query("SELECT * FROM employee WHERE department = ", {} (err, res) => {
                if(err) throw err;
                console.table(res);
                connection.end();
            });
        });
    })
};
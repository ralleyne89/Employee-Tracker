const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");
const table = require("console.table");

let employeeArr = [];
let rolesArr = [];
let deptArr = [];

// creating header with figlet
figlet("Employee Tracker", function(err, data) {
  if (err) {
    console.log("something went wrong");
    console.dir(err);
    return;
  }
  console.log(data);
});

// creating mysql connection
let connection = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "employee_db"
});

connection.connect(function(error) {
  menu();
});

// the main menu function
function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Select an option to begin",
        value: "home",
        choices: [
          {
            name: "Departments",
            value: "department-section"
          },
          {
            name: "Roles",
            value: "roles-section"
          },
          {
            name: "Employees",
            value: "employees-section"
          }
        ]
      }
    ])
    .then(answers => {
      console.log(answers);
      // console.log(answers.choice)
      switch (answers.choice) {
        case "department-section":
          // create a function in the file to call, like add department function
          deptOptions();
          break;

        case "roles-section":
          // create another function at the bottom of the file for adding roles
          rolesOptions();
          break;

        case "employees-section":
          //   create a function for the employee section
          employeeOptions();
          break;
      }
    });
}

// function for department
function deptOptions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "Select an option",
        choices: ["add", "update", "delete"]
      }
    ])
    .then(option => {
      console.log(option);
      switch (option.options) {
        case "add":
          addDept();
          break;

        case "update":
          updateDept();
          break;

        case "delete":
          deleteDept();
          break;
      }
    });
}

// function for adding a department
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "add",
        message: "Enter the name of the department"
      }
    ])
    .then(department => {
      console.log(department);
      deptArr.push(department.add);
      console.table(deptArr.concat());

      inquirer
        .prompt([
          {
            type: "list",
            name: "more",
            message: "Would you like to add more departments?",
            choices: ["yes", "no"]
          }
        ])
        .then(answer => {
          if (answer.more === "no") {
            switch (answer.more) {
              case "no":
                goHome();
                break;
            }
          } else {
            addDept();
          }
        });
    });
}

// function to update a department
function updateDept() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "update",
        message: "Update an existing department",
        choices: [`${employeeArr}`]
      }
    ])
    .then(update => {
      console.log(update);

      inquirer
        .prompt([
          {
            type: "list",
            name: "more",
            message: "Would you update another department?",
            choices: ["yes", "no"]
          }
        ])
        .then(answer => {
          console.log(answer);
          if (answer.more === "no") {
            switch (answer.more) {
              case "no":
                goHome();
                break;
            }
          } else {
            updateDept();
          }
        });
    });
}

// function to delete a department
function deleteDept() {
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "delete",
        message: "Delete an existing department",
        choices: [`${employeeArr}`]
      }
    ])
    .then(dept => {
      console.log(dept);
      console.log(dept.delete);
      // an if statement to delete a department
      inquirer
        .prompt([
          {
            type: "list",
            name: "more",
            message: "Would you delete another department?",
            choices: ["yes", "no"]
          }
        ])
        .then(answer => {
          console.log(answer);
          if (answer.more === "no") {
            switch (answer.more) {
              case "no":
                goHome();
                break;
            }
          } else {
            deleteDept();
          }
        });
    });
}

// function for role options
function rolesOptions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "roles",
        message: "Select an option",
        choices: ["add", "update", "delete"]
      }
    ])
    .then(choice => {
      console.log(choice);

      switch (choice.roles) {
        case "add":
          // this will be a function to add a new role
          addRoles();
          break;

        case "update":
          // this will be a function to update an existing role
          updateRoles();
          break;

        case "delete":
          // this will be a function to delete an existing role
          deleteRoles();
          break;
      }
    });
}

// function to add roles
function addRoles() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "add",
        message: "Enter new role"
      }
    ])
    .then(role => {
      console.log(role);
      rolesArr.push(role.add);
      console.table(rolesArr.concat());

      inquirer
        .prompt([
          {
            type: "list",
            name: "more",
            message: "Would you another role?",
            choices: ["yes", "no"]
          }
        ])
        .then(answer => {
          console.log(answer);
          if (answer.more === "no") {
            switch (answer.more) {
              case "no":
                goHome();
                break;
            }
          } else {
            addRoles();
          }
        });
    });
}

// function to update a role
function updateRoles() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "update",
        message: "Update an existing role",
        choices: [`${rolesArr}`]
      }
    ])
    .then(update => {
      console.log(update);

      inquirer
        .prompt([
          {
            type: "list",
            name: "more",
            message: "Want to update another role?",
            choices: ["yes", "no"]
          }
        ])
        .then(answer => {
          console.log(answer);
          if (answer.more === "no") {
            switch (answer.more) {
              case "no":
                goHome();
                break;
            }
          } else {
            updateRoles();
          }
        });
    });
}

// function for employee section
function employeeOptions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employees",
        message: "Select an option",
        choices: ["add", "update", "delete"]
      }
    ])
    .then(choice => {
      console.log(choice);

      switch (choice.employees) {
        case "add":
          // this will call a function to add a new role
          addEmployee();
          break;

        case "update":
          // this will call a function to update an existing role
          updateEmployee();
          break;

        case "delete":
          // this will call a function to delete an existing role
          deleteEmployee();
          break;
      }
    });
}

//function for adding an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "add",
        message: "Enter new employee"
      }
    ])
    .then(employee => {
      console.log(employee);
      employeeArr.push(employee.add);
      console.table(employeeArr.concat());

      inquirer
        .prompt([
          {
            type: "list",
            name: "more",
            message: "Would you another employee?",
            choices: ["yes", "no"]
          }
        ])
        .then(answer => {
          console.log(answer);
          if (answer.more === "no") {
            switch (answer.more) {
              case "no":
                goHome();
                break;
            }
          } else {
            addEmployee();
          }
        });
    });
}

// function to update an employee
function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "update",
        message: "Update an existing employee",
        choices: [`${employeeArr}`]
      }
    ])
    .then(update => {
      console.log(update);

      inquirer
        .prompt([
          {
            type: "list",
            name: "more",
            message: "Would you update another employee?",
            choices: ["yes", "no"]
          }
        ])
        .then(answer => {
          console.log(answer);
          if (answer.more === "no") {
            switch (answer.more) {
              case "no":
                goHome();
                break;
            }
          } else {
            updateEmployee();
          }
        });
    });
}

// function to go home
function goHome() {
  menu();
}

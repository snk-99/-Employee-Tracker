const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    multipleStatements: true, 
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "employees_db"
  });

  
  connection.connect(function(err) {
    if (err) throw err;
    runSearch();
  });

  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update employee role",
          "Exit"
        ]
      })
    .then(function(answer) {
        if (answer.action === 'View all departments') {
            viewDepartments();
        } else if (answer.action === 'View all roles') {
            viewRoles();
        } else if (answer.action === 'View all employees') {
            viewEmployees();
        } else if (answer.action === 'Add a department') {
            addDepartment();
        } else if (answer.action === 'Add a role') {
            addRole();
        } else if (answer.action === 'Add an employee') {
            addEmployee();
        } else if (answer.action === 'Update employee role') {
            updateRole();
        }
        else if (answer.action === 'Exit') {
            connection.end();
        }
    })
    }

function viewDepartments() {
    var query = "SELECT * FROM department";
      connection.query(query, function(err, res) {
        console.log(`DEPARTMENTS:`)
        console.log(`    Name: `)
        console.log("==============")
        res.forEach(department => {

          console.log(` ${department.name}`)
  
        })
        runSearch();
        });
        
    };

function viewRoles() {
    var query = "SELECT * FROM role";
        connection.query(query, function(err, res) {
          console.log(`ROLES:`)
          
        res.forEach(role => {
          console.log(`ID:  ${role.id} |     Title:  ${role.title} |     Salary:  ${role.salary} | `);

        })
        runSearch();
        });
    };

function viewEmployees() {
    var query = "SELECT * FROM employee";
        connection.query(query, function(err, res) {
          console.log(`EMPLOYEES:`)
         
        res.forEach(employee => {
          console.log(`ID: ${employee.id}   |    Name: ${employee.first_name} ${employee.last_name}   |   Role ID: ${employee.role_id}    |  Manager ID: ${employee.manager_id}`);

        })
        runSearch();
        });
    };

function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "Name of new department?",
          })
        .then(function(answer) {
        var query = "INSERT INTO department (name) VALUES ( ? )";
        connection.query(query, answer.department, function(err, res) {
            console.log(`You've added this department: ${(answer.department).toUpperCase()}.`)
        })
        viewDepartments();
        })
}

function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw (err);
    inquirer
        .prompt([{
            name: "title",
            type: "input",
            message: "Title of the new role?",
          }, 
          {
            name: "salary",
            type: "input",
            message: "Salary of the new role?",
          },
          {
            name: "departmentName",
            type: "list",
            message: "Department that the role goes to?",
            choices: function() {
                var choicesArray = [];
                res.forEach(res => {
                    choicesArray.push(
                        res.name
                    );
                })
                return choicesArray;
              }
          }
          ]) 

        .then(function(answer) {
        const department = answer.departmentName;
        connection.query('SELECT * FROM DEPARTMENT', function(err, res) {
        
            if (err) throw (err);
         let filteredDept = res.filter(function(res) {
            return res.name == department;
        }
        )
        let id = filteredDept[0].id;
       let query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
       let values = [answer.title, parseInt(answer.salary), id]
       console.log(values);
        connection.query(query, values,
            function(err, res, fields) {
            console.log(`You have added this role: ${(values[0]).toUpperCase()}.`)
        })
            viewRoles()
            })
        })
    })
}

async function addEmployee() {
    connection.query('SELECT * FROM role', function(err, result) {
        if (err) throw (err);
    inquirer
        .prompt([{
            name: "firstName",
            type: "input",
            message: "Employee's first name?",
          }, 
          {
            name: "lastName",
            type: "input",
            message: "Employee's last name?",
          },
          {
            name: "roleName",
            type: "list",

            message: "Role of the employee?",
            choices: function() {
             rolesArray = [];
                result.forEach(result => {
                    rolesArray.push(
                        result.title
                    );
                })
                return rolesArray
                
              } 
          }
        ]).then(function(answer) {
            const employee  = answer.employeeName;
            connection.query('SELECT * FROM EMPLOYEE', function(err, res) {
            
                if (err) throw (err);
             let filteredemployee  = res.filter(function(res) {
                return res.name == employee ;
            }
            )
           let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
           let values = [answer.firstName, answer.lastName, roleId, managerId]
           console.log(values);
            connection.query(query, values,
                function(err, res, fields) {
                console.log(`You have added this employee: ${(values[0]).toUpperCase()}.`)
            })
            viewEmployees()
                })
            })
        })
    }

function updateRole() {
    connection.query('SELECT * FROM employee', function(err, result) {
        if (err) throw (err);
    inquirer
        .prompt([
          {
            name: "employeeName",
            type: "list",

            message: "Which employee's role is changing?",
            choices: function() {
             employeeArray = [];
                result.forEach(result => {
                    employeeArray.push(
                        result.last_name
                    );
                })
                return employeeArray;
              }
          }
          ]) 

        .then(function(answer) {
        console.log(answer);
        const name = answer.employeeName;
        
        connection.query("SELECT * FROM role", function(err, res) {
                inquirer
                .prompt ([
                    {
                        name: "role",
                        type: "list",
                        message: "What is their new role?",
                        choices: function() {
                            rolesArray = [];
                            res.forEach(res => {
                                rolesArray.push(
                                    res.title)
                                
                            })
                            return rolesArray;
                        }
                    }
                ]).then(function(rolesAnswer) {
                    const role = rolesAnswer.role;
                    console.log(rolesAnswer.role);
                connection.query('SELECT * FROM role WHERE title = ?', [role], function(err, res) {
                if (err) throw (err);
                    let roleId = res.id;
                    let query = "UPDATE employee SET role_id ? WHERE last_name ?";
                    let values = [roleId, name]
                    console.log(values);
                     connection.query(query, values,
                         function(err, res, fields) {
                         console.log(`You have updated ${name}'s role to ${role}.`)
                        })
                        viewEmployees();
                        })
                     })
                })
       })
})

}
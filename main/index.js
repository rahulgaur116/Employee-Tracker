const { prompt } = require('inquirer');

const DB = require('./db');
const db =new DB()

init();

// Display logo text, load main prompts
function init() {

  loadMainPrompts();
}

function loadMainPrompts() {
  prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        {
          name: 'View All Departments',
          value: 'VIEW_DEPARTMENTS',
        },
        {
          name: 'View All Employees By Roles',
          value: 'VIEW_ALL_ROLES',
        },
        {
          name: 'View All Employees',
          value: 'VIEW_ALL_EMPLOYEES',
        },
        {
          name: 'Add Department',
          value: 'ADD_DEPARTMENT',
        },
        {
          name: 'Add Role',
          value: 'ADD_ROLE',
        },
        {
          name: 'Add Employee',
          value: 'ADD_EMPLOYEE',
        },
        {
          name: 'Update Employee Role',
          value: 'UPDATE_EMPLOYEE_ROLE',
        },
        {
          name: 'Update Employee Manager',
          value: 'UPDATE_EMPLOYEE_MANAGER',
        },
       
        {
          name: 'Find Employees By Department',
          value: 'FIND_ALL_EMPLOYEES_BY_DEPARTMENT',
        },
        
        {
          name: 'Quit',
          value: 'QUIT',
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    // Call the appropriate function depending on what the user chose
    switch (choice) {
      case 'VIEW_DEPARTMENTS':
        ViewAllDepartments();
        break;
      case 'VIEW_ALL_ROLES':
        ViewAllRoles();
        break;
      case 'VIEW_ALL_EMPLOYEES':
        ViewAllEmployees();
        break;
      case 'ADD_DEPARTMENT':
        AddDepartment();
        break;
      case 'ADD_ROLE':
        AddRole();
        break;
      case 'ADD_EMPLOYEE':
        AddEmployee();
        break;
      case 'UPDATE_EMPLOYEE_ROLE':
        UpdateEmployeeRole();
        break;
      case 'UPDATE_EMPLOYEE_MANAGER':
        UpdateEmployeeManager();
        break;
      case 'FIND_ALL_EMPLOYEES_BY_DEPARTMENT':
        FindAllEmployeesByDepartment();
        break;

      default:
        quit();
    }
  });
}

// View all deparments
function ViewAllDepartments() {
  db.viewAllDepartments()
    .then(({ rows }) => {
      let departments = rows;
      console.log('\n');
      console.table(departments);
    })
    .then(() => loadMainPrompts());
}

// View all Roles
function ViewAllRoles() {
  db.viewAllRoles()
    .then(({ rows }) => {
      let roles = rows;
      console.log('\n');
      console.table(roles);
    })
    .then(() => loadMainPrompts());
}

// View all employees
function ViewAllEmployees() {
  db.viewAllEmployees()
    .then(({ rows }) => {
      let employees = rows;
      console.log('\n');
      console.table(employees);
    })
    .then(() => loadMainPrompts());
}

// Add a department
function AddDepartment() {
  prompt([
    {
      name: 'name',
      message: 'What is the name of the department?',
    },
  ]).then((res) => {
    let name = res;
    db.addDepartment(name)
      .then(() => console.log(`Added ${name.name} to the database`))
      .then(() => loadMainPrompts());
  });
}

// Add a role
function AddRole() {
  db.addRole().then(({ rows }) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt([
      {
        name: 'title',
        message: 'What is the name of the role?',
      },
      {
        name: 'salary',
        message: 'What is the salary of the role?',
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Which department does the role belong to?',
        choices: departmentChoices,
      },
    ]).then((role) => {
      db.createRole(role)
        .then(() => console.log(`Added ${role.title} to the database`))
        .then(() => loadMainPrompts());
    });
  });
}



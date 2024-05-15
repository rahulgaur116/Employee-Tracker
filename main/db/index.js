const pool = require('./connection');

class DB {
  constructor() {}

  async query(sql, args = []) {
    const client = await pool.connect(); // Connect to the database pool
    try {
      const result = await client.query(sql, args);// Execute the SQL query
      return result; // Return the query result
    } finally {
      client.release(); // Release the database connection
    }
  }

  // View all departments function
  viewAllDepartments() {
    return this.query('SELECT id, department.name FROM department;');
  }

// View all roles 
viewAllRoles() {
    return this.query(
      'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;'
    );
  }

// View all employees 

viewAllEmployees() {
    return this.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

// Add a Department
addDepartment(department) {
  return this.query('INSERT INTO department (name) VALUES ($1)', [
    department.name,
  ]);
}

  //Add a Role
  addRole(role) {
    const { title, salary, department_id } = role;
    return this.query(
      'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
      [title, salary, department_id]
    );
  }

  //Add an Employee 
  addEmployee(employee) {
    const { first_name, last_name, role_id, manager_id } = employee;
    return this.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
      [first_name, last_name, role_id, manager_id]
    );
  }

  // Update an Employee Role & manager
  updateEmployeeRole(employeeId, roleId) {
    return this.query('UPDATE employee SET role_id = $1 WHERE id = $2', [
      roleId,
      employeeId,
    ]);
  }

  updateEmployeeManager(employeeId, managerId) {
    return this.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [
      managerId,
      employeeId,
    ]);
  }

   // Find all employees 
   findAllEmployeesByDepartment(departmentId) {
    return this.query(
      'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = $1;',
      [departmentId]
    );
  }
  }


module.exports = DB
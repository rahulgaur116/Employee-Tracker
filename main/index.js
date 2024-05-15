const pool = require('./db/connection');

class DB {
  constructor() {}

  async query(sql, args = []) {
    const client = await pool.connect();
    try {
      const result = await client.query(sql, args);
      return result;
    } finally {
      client.release();
    }
  }

  // View all departments 
  viewAllDepartments() {
    return this.query('SELECT department.id, department.name FROM department;');
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

  // Find all departments
  findAllDepartments() {
    return this.query('SELECT department.id, department.name FROM department;');
  }

   // Find all employees 
   findAllEmployeesByDepartment(departmentId) {
    return this.query(
      'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = $1;',
      [departmentId]
    );
  }

  // Update the given employee's role
  updateEmployeeRole(employeeId, roleId) {
    return this.query('UPDATE employee SET role_id = $1 WHERE id = $2', [
      roleId,
      employeeId,
    ]);
  }

}
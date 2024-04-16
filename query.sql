-- View All Departments:

SELECT department_id, department_name
FROM Departments;


-- View All Roles:

SELECT r.role_id, r.title, r.salary, d.department_name
FROM Roles r
JOIN Departments d ON r.department_id = d.department_id;


-- View All Employees:

SELECT e.employee_id, e.first_name, e.last_name, r.title AS job_title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM Employees e
JOIN Roles r ON e.role_id = r.role_id
JOIN Departments d ON r.department_id = d.department_id
LEFT JOIN Employees m ON e.manager_id = m.employee_id;


--  SQL query to add a department
INSERT INTO Departments (department_name)
VALUES ('New Department Name');

-- SQL query to add a role
INSERT INTO Roles (title, salary, department_id)
VALUES ('New Role Title', 50000.00, 1); -- Assuming department_id 1 refers to the desired department

-- SQL query to add an employee
INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 2); -- Assuming role_id 1 and manager_id 2 are valid references

-- SQL query to update an employee's role
UPDATE Employees
SET role_id = 3 -- New role_id
WHERE employee_id = 1; -- Employee to update
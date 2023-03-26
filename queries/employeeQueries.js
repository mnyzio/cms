const db = require('../config/connection');

// Header and query that displays all emplyees, their id, first name, last name, title, salary, department and manager if any
function db_viewAllEmployees() {    
    console.log('\x1b[32m%s\x1b[0m', `
+--------------------------------------------------------------------------------------------------+
|                                            EMPLOYEES                                             |
+--------------------------------------------------------------------------------------------------+
    `)
    return db.promise().query(`
    SELECT 
        e.id AS 'ID',
        e.first_name AS 'FIRST NAME',
        e.last_name AS 'LAST NAME',
        r.title AS 'TITLE',
        d.name AS 'DEPARTMENT',
        CONCAT('$', 
            FORMAT(r.salary,'C')) AS 'SALARY',
        CONCAT(m.first_name,' ',m.last_name) AS 'MANAGER'
    FROM employee e
    LEFT JOIN employee m
        ON e.manager_id = m.id
    LEFT JOIN role r
        ON r.id = e.role_id
    LEFT JOIN department d
        ON d.id = r.department_id;`);
}

// Query that add new employee to database
function db_addEmployee(firstName, lastName, roleTitleName, managerName) {
    // Separate first and last name
    const manager = managerName.split(' ');
    db.query(`
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, 
        (SELECT r.id FROM role r WHERE r.title = ?), 
        (SELECT e.id FROM employee e WHERE e.first_name = ? AND e.last_name = ?))`, 
        [firstName.toUpperCase(), lastName.toUpperCase(), roleTitleName, manager[0], manager[1]]);
}

// Query that returns first and last name as a single array element of each employee that has manager in job title or does not have manager assigned
function db_getManagers() {
    return db.promise().query(`
    SELECT CONCAT(e.first_name,' ',e.last_name) AS name 
    FROM employee e
    LEFT JOIN role r 
        ON e.role_id = r.id
    WHERE e.manager_id IS NULL 
    OR r.title LIKE '%MANAGER%';`).then((results) => results[0].map(e => e.name));
}


function db_getEmployees() {
    return db.promise().query(`
    SELECT CONCAT(first_name,' ',last_name) AS name from employee;
    `).then(results => results[0].map(e => e.name));
}


function db_updateEmployeeRole(employee, role) {
    employee = employee.split(' ');
    console.log("🚀 ~ file: employeeQueries.js:62 ~ db_updateEmployeeRole ~ employee:", employee)
    
    db.query(`
    UPDATE employee
    SET role_id = (SELECT id FROM role WHERE title = ?)
    WHERE first_name = ? AND last_name = ?`, [role, employee[0], employee[1]]);
}

module.exports = {
    db_viewAllEmployees,
    db_addEmployee,
    db_getManagers,
    db_getEmployees,
    db_updateEmployeeRole,
}
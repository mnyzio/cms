const db = require('./connection');

// Header and query that displays all departments and their ID's
function viewAllDepartments() {
    console.clear();
    console.log('\x1b[32m%s\x1b[0m', `
+--------------------------------------------------------------------------------------------------+
|                                             DEPARTMENTS                                          |
+--------------------------------------------------------------------------------------------------+
    `)
    return db.promise().query(`SELECT * FROM department ORDER BY name;`);
}

// Header and query that displays all roles, their id, title, salary and departments they belong to
function viewAllRoles() {
    console.clear();
    console.log('\x1b[32m%s\x1b[0m', `
+--------------------------------------------------------------------------------------------------+
|                                               ROLES                                              |
+--------------------------------------------------------------------------------------------------+
    `)
    return db.promise().query(`
    SELECT role.id AS ID, 
        role.title AS TITLE, 
        role.salary AS SALARY, 
        department.name AS DEPARTMENT 
    FROM role
    JOIN department ON role.department_id = department.id
    ORDER BY department.name, role.title;`);
}

// Header and query that displays all emplyees, their id, first name, last name, title, salary, department and manager if any
function viewAllEmployees() {
    console.clear();
    console.log('\x1b[32m%s\x1b[0m', `
+--------------------------------------------------------------------------------------------------+
|                                            EMPLOYEES                                             |
+--------------------------------------------------------------------------------------------------+
    `)
    return db.promise().query(`
    SELECT a.id AS ID, 
		a.first_name AS "FIRST NAME", 
        a.last_name AS "LAST NAME", 
        role.title AS TITLE, 
        department.name AS DEPARTMENT,
        concat(d.first_name,' ',d.last_name) AS MANAGER
    FROM employee a
    INNER JOIN role ON a.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee d ON d.manager_id = a.id;`);
}


module.exports = {viewAllDepartments, viewAllRoles, viewAllEmployees };
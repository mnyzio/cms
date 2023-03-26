const db = require('../config/connection');

// Header and query that displays all roles, their id, title, salary and departments they belong to
function db_viewAllRoles() {    
    console.log('\x1b[32m%s\x1b[0m', `
+--------------------------------------------------------------------------------------------------+
|                                               ROLES                                              |
+--------------------------------------------------------------------------------------------------+
    `)
    return db.promise().query(`
    SELECT role.id AS ID, 
        role.title AS TITLE, 
        department.name AS DEPARTMENT, 
        concat('$',role.salary) AS SALARY 
    FROM role
    JOIN department ON role.department_id = department.id
    ORDER BY department.name, role.title;`).then(result => result[0]);
}


function db_addRole(title, salary, deptName) {
    db.query(`INSERT INTO role (title, salary, department_id) 
    VALUES
        (?, ?, (SELECT id FROM department WHERE name = ?))`, [title.toUpperCase(), salary, deptName]);
}   


function db_getRoles() {
    return db.promise().query(`SELECT r.title FROM role r JOIN department d ON d.id = r.department_id ORDER BY r.title;`).then((results) => results[0].map(e => e.title));
}

function db_updateEmployeeRole() {

}

module.exports = {
    db_viewAllRoles, 
    db_addRole,
    db_getRoles,
    db_updateEmployeeRole,
}
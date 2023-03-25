const db = require('../connection');

// Header and query that displays all roles, their id, title, salary and departments they belong to
function viewAllRoles() {    
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
    ORDER BY department.name, role.title;`);
}


function addRole(title, salary, deptName) {
    db.query(`INSERT INTO role (title, salary, department_id) 
    VALUES
        (?, ?, (SELECT id FROM department WHERE name = ?))`, [title, salary, deptName]);
}   



module.exports = {
    viewAllRoles, 
    addRole,
}
const db = require('./connection');

// Header and query that displays all departments and their ID's
function viewAllDepartments() {
    console.log('\x1b[32m%s\x1b[0m', `
+--------------------------------------------------------------------------------------------------+
|                                             DEPARTMENTS                                          |
+--------------------------------------------------------------------------------------------------+
    `)
    // return db.promise().query(`SELECT id as ID, name as DEPARTMENT FROM department`);
    return db.promise().query(`SELECT * FROM department`);
}

// Header and query that displays all departments and their ID's
function viewAllRoles() {
    console.log('\x1b[32m%s\x1b[0m', `
+--------------------------------------------------------------------------------------------------+
|                                               ROLES                                              |
+--------------------------------------------------------------------------------------------------+
    `)
    return db.promise().query(`
    SELECT role.id, role.title, role.salary, department.name as department FROM role
    JOIN department ON role.department_id = department.id`);
}


module.exports = {viewAllDepartments, viewAllRoles };
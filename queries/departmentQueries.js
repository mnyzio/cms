const db = require('../connection');

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

// Function that returns anly department names
function getDepartmentNames() {
    return db.promise().query(`SELECT name FROM department;`);
}

// Header and query that displays all emplyees, their id, first name, last name, title, salary, department and manager if any
function addDepartmentMenu() {
    console.clear();
    console.log('\x1b[32m%s\x1b[0m', `
+--------------------------------------------------------------------------------------------------+
|                                     ADD NEW DEPARTMENT MENU                                      |
+--------------------------------------------------------------------------------------------------+
`)
}

// Function that adds new department to database
function addDepartment(department) {
    return db.promise().query(`
    INSERT INTO department (name)
    VALUES (?)`, department.toUpperCase());
}

module.exports = {
    viewAllDepartments, 
    getDepartmentNames,    
    addDepartmentMenu,
    addDepartment, 
};
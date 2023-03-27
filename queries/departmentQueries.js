const db = require('../config/connection');

// Header and query that displays all departments and their ID's
function db_viewAllDepartments() {    
//     console.log('\x1b[32m%s\x1b[0m', `
// +--------------------------------------------------------------------------------------------------+
// |                                             DEPARTMENTS                                          |
// +--------------------------------------------------------------------------------------------------+
//     `)
    return db.promise().query(`SELECT id AS 'ID', name AS 'NAME' FROM department ORDER BY name;`).then( ([results]) => results); 
}


// Function that returns anly department names
function db_getDepartmentNames() {
    return db.promise().query(`SELECT name FROM department ORDER BY name;`).then( results => results[0].map(e => e.name));
}


// Function that adds new department to database
function db_addDepartment(department) {
    db.query(`
    INSERT INTO department (name)
    VALUES (?)`, department.toUpperCase());
}


// Function that sums up all salaries for a single department
function db_utilizedBudgetSingleDepartment(department) {
//     console.log('\x1b[32m%s\x1b[0m', `
// +--------------------------------------------------------------------------------------------------+
// |                              UTILIZED BUDGET - SINGLE DEPARTMENT                                 |
// +--------------------------------------------------------------------------------------------------+
// `)
    return db.promise().query(`
    SELECT d.name AS DEPARTMENT, 
    CONCAT('$', 
        FORMAT( 
            SUM(CASE
                WHEN e.id IS NULL THEN 0
                ELSE r.salary END),'C')) AS 'UTILIZED BUDGET'        
    FROM department d
    LEFT JOIN role r 
        ON r.department_id = d.id
    LEFT JOIN employee e 
        ON e.role_id = r.id
    WHERE d.name = ?
    GROUP BY d.name`, department).then(result => result[0]);
}


// Function that sums up all salaries per department
function db_utilizedBudgetAllDepartments() {
//     console.log('\x1b[32m%s\x1b[0m', `
// +--------------------------------------------------------------------------------------------------+
// |                               UTILIZED BUDGET - ALL DEPARTMENTS                                  |
// +--------------------------------------------------------------------------------------------------+
// `)
    return db.promise().query(`
    SELECT d.name AS DEPARTMENT, 
    CONCAT('$',
        FORMAT(
            SUM(CASE
                WHEN e.id IS NULL THEN 0
                ELSE r.salary END),'C')) AS 'UTILIZED BUDGET'        
    FROM department d
    LEFT JOIN role r 
        ON r.department_id = d.id
    LEFT JOIN employee e 
        ON e.role_id = r.id
    GROUP BY d.name
    ORDER BY d.name;
    `).then(result => result[0])    
}


// Function that total utilized budget
function db_utilizedBudgetTotal() {
//     console.log('\x1b[32m%s\x1b[0m', `
// +--------------------------------------------------------------------------------------------------+
// |                                     UTILIZED BUDGET - TOTAL                                      |
// +--------------------------------------------------------------------------------------------------+
// `)
    return db.promise().query(`
    SELECT
        CONCAT('$', 
            FORMAT(
                SUM(CASE
                    WHEN e.id IS NULL THEN 0
                    ELSE r.salary END),'C')) AS 'UTILIZED BUDGET'
    FROM role r 
    LEFT JOIN employee e 
        ON r.id = e.role_id;
    `).then(result => result[0])
}

function db_deleteDepartment(department) {
    db.query(`
    DELETE FROM department WHERE name = ?`, department);
}


module.exports = {
    db_viewAllDepartments, 
    db_getDepartmentNames, 
    db_addDepartment, 
    db_utilizedBudgetSingleDepartment,
    db_utilizedBudgetAllDepartments,
    db_utilizedBudgetTotal,
    db_deleteDepartment,
};

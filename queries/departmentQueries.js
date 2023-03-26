const db = require('../config/connection');

// Header and query that displays all departments and their ID's
function db_viewAllDepartments() {    
    console.log('\x1b[32m%s\x1b[0m', `
+--------------------------------------------------------------------------------------------------+
|                                             DEPARTMENTS                                          |
+--------------------------------------------------------------------------------------------------+
    `)
    return db.promise().query(`SELECT * FROM department ORDER BY name;`);
}


// Function that returns anly department names
function db_getDepartmentNames() {
    return db.promise().query(`SELECT name FROM department ORDER BY name;`).then( results => results[0].map(e => e.name));
}


// Header and query that displays all emplyees, their id, first name, last name, title, salary, department and manager if any
function db_addDepartmentMenu() {    
    console.log('\x1b[32m%s\x1b[0m', `
+--------------------------------------------------------------------------------------------------+
|                                     ADD NEW DEPARTMENT MENU                                      |
+--------------------------------------------------------------------------------------------------+
`)
}


// Function that adds new department to database
function db_addDepartment(department) {
    db.query(`
    INSERT INTO department (name)
    VALUES (?)`, department.toUpperCase());
}


// Function that sums up all salaries for a single department
function db_utilizedBudgetSingleDepartment(department) {
    console.log('\x1b[32m%s\x1b[0m', `
+--------------------------------------------------------------------------------------------------+
|                              UTILIZED BUDGET - SINGLE DEPARTMENT                                 |
+--------------------------------------------------------------------------------------------------+
`)
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
    GROUP BY d.name`, department);
}


// Function that sums up all salaries per department
function db_utilizedBudgetAllDepartments() {
    console.log('\x1b[32m%s\x1b[0m', `
+--------------------------------------------------------------------------------------------------+
|                               UTILIZED BUDGET - ALL DEPARTMENTS                                  |
+--------------------------------------------------------------------------------------------------+
`)
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
    `)    
}


// Function that total utilized budget
function db_utilizedBudgetTotal() {
    console.log('\x1b[32m%s\x1b[0m', `
+--------------------------------------------------------------------------------------------------+
|                                     UTILIZED BUDGET - TOTAL                                      |
+--------------------------------------------------------------------------------------------------+
`)
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
    `)
}




module.exports = {
    db_viewAllDepartments, 
    db_getDepartmentNames, 
    db_addDepartmentMenu,
    db_addDepartment, 
    db_utilizedBudgetSingleDepartment,
    db_utilizedBudgetAllDepartments,
    db_utilizedBudgetTotal,
};










// Code for allocated budget 

// Function that sums up all salaries per department
// function utilizedBudgetAllDepartments() {
//     console.log('\x1b[32m%s\x1b[0m', `
// +--------------------------------------------------------------------------------------------------+
// |                              ALLOCATED BUDGET - ALL DEPARTMENTS                                  |
// +--------------------------------------------------------------------------------------------------+
// `)
//     return db.promise().query(`
//     SELECT 
// 	    department.name AS DEPARTMENT, 
// 	    CASE WHEN 
//             SUM(role.salary) IS NULL THEN '$0'
//         ELSE
//             concat('$',SUM(role.salary)) END AS 'UTILIZED BUDGET' 
//     FROM department 
//     LEFT JOIN role ON department.id = role.department_id
//     GROUP BY department.name
//     ORDER BY department.name;
//     `)    
// }



// Function that sums up all salaries for a single department
// function utilizedBudgetSingleDepartment(department) {
//     return db.promise().query(`
//     SELECT 
// 	    department.name AS DEPARTMENT, 
// 	    CASE WHEN SUM(role.salary) IS NULL THEN '$0'
//         ELSE concat('$',SUM(role.salary)) END AS 'UTILIZED BUDGET' 
//     FROM department 
//     LEFT JOIN role ON department.id = role.department_id
//     WHERE department.name = ?;`, department);
// }


// Function that total utilized budget
// function utilizedBudgetTotal() {
//     console.log('\x1b[32m%s\x1b[0m', `
// +--------------------------------------------------------------------------------------------------+
// |                                     UTILIZED BUDGET - TOTAL                                      |
// +--------------------------------------------------------------------------------------------------+
// `)
//     return db.promise().query(`
//     SELECT concat('$',SUM(role.salary)) AS 'TOTAL UTILIZED BUDGET'
//     FROM role;
//     `)
// }
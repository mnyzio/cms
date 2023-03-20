const db = require('../connection');

// Header and query that displays all departments and their ID's
function viewAllDepartments() {    
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

// Function that sums up all salaries per department
function utilizedBudgetAllDepartments() {
    console.log('\x1b[32m%s\x1b[0m', `
+--------------------------------------------------------------------------------------------------+
|                               UTILIZED BUDGET - ALL DEPARTMENTS                                  |
+--------------------------------------------------------------------------------------------------+
`)
    return db.promise().query(`
    SELECT 
	    department.name AS DEPARTMENT, 
	    CASE WHEN 
            SUM(role.salary) IS NULL THEN '$0'
        ELSE
            concat('$',SUM(role.salary)) END AS 'UTILIZED BUDGET' 
    FROM department 
    LEFT JOIN role ON department.id = role.department_id
    GROUP BY department.name
    ORDER BY department.name;
    `)    
}

// Function that total utilized budget
function utilizedBudgetTotal() {
    console.log('\x1b[32m%s\x1b[0m', `
+--------------------------------------------------------------------------------------------------+
|                                     UTILIZED BUDGET - TOTAL                                      |
+--------------------------------------------------------------------------------------------------+
`)
    return db.promise().query(`
    SELECT concat('$',SUM(role.salary)) AS 'TOTAL UTILIZED BUDGET'
    FROM role;
    `)
}



module.exports = {
    viewAllDepartments, 
    getDepartmentNames,    
    addDepartmentMenu,
    addDepartment, 
    utilizedBudgetAllDepartments,
    utilizedBudgetTotal,
};
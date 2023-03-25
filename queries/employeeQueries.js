const db = require('../config/connection');

// Header and query that displays all emplyees, their id, first name, last name, title, salary, department and manager if any
function viewAllEmployees() {    
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

module.exports = {
    viewAllEmployees,
}
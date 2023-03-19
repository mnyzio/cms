const db = require('./connection');

// Header and query that displays all departments and their ID's
function viewAllDepartments() {
    console.log('\x1b[32m%s\x1b[0m', `
    +--------------------------------------------------------------------------------------------------+
    |                                             DEPARTMENTS                                          |
    +--------------------------------------------------------------------------------------------------+
    `)
    return db.promise().query(`SELECT id as ID, name as DEPARTMENT FROM department`);
}

module.exports = {viewAllDepartments};
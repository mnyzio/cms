const cTable = require('console.table');
const mysql = require('mysql2');
const showWelcomeScreen = require('./logo');
const { displayAllDepartments } = require('./db/query')

// Connect database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Rutg3rs!',
    database: 'employee_management_db'
  },
  console.log(`Connected to employee_management_db database`)
);

showWelcomeScreen();                                          



db.query('SELECT * FROM department', function(err, results) {
  console.table(results);
});
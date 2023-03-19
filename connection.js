const mysql = require('mysql2');

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

  module.exports = db;
const cTable = require('console.table');
const inquirer = require('inquirer');
// const mysql = require('mysql2');
const showWelcomeScreen = require('./logo');
const db = require('./connection')


const myQuery = () => {  
  db.query(`SELECT name AS "Department Name" FROM department`, function(err, results) {
  console.table(results);
  
});
}


const viewAllDepartments = () => {
  console.log('\x1b[32m%s\x1b[0m', `
+--------------------------------------------------------------------------------------------------+
|                                             DEPARTMENTS                                          |
+--------------------------------------------------------------------------------------------------+
  `)
  db.promise().query(`SELECT id as ID, name as DEPARTMENT FROM department`).then(function(results) {
  console.table(results[0]);
  mainPrompt();
  }).catch(err => console.log(err));
}

// myQuery();
// myQueryPromise();
// Display logo on start
// showWelcomeScreen();                                          

function mainPrompt () {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role'
        ]
      }
    ])
    .then( ({ main }) => {
      switch (main) {
        case 'View all departments':
          viewAllDepartments();          
          break;          
      }   
      
    })
    .catch(err => console.log(err))
}

mainPrompt();
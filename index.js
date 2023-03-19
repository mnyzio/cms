const cTable = require('console.table');
const inquirer = require('inquirer');
const showWelcomeScreen = require('./logo');
const { viewAllDepartments } = require('./queries');

// Display logo on start
showWelcomeScreen(); 

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
          viewAllDepartments().then(function (results) {
            console.table(results[0]);
            mainPrompt();
        }).catch(err => console.log(err));          
          break;          
      }   
      
    })
    .catch(err => console.log(err))
}

mainPrompt();
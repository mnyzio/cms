const cTable = require('console.table');
const inquirer = require('inquirer');
const showWelcomeScreen = require('./logo');
const { 
        viewAllDepartments,
        viewAllRoles,
        viewAllEmployees 
      } = require('./queries');

// Display logo on start
showWelcomeScreen(); 

function mainPrompt () {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        loop: false,
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Update employee managers - bonus 2 points',
          'View employees by manager - bonus 2 points',
          'View employees by department - bonus 2 points',
          'Delete departments, roles, and employees - bonus 2 points each',
          'View the total utilized budget of a department - bonus 8 points',
          'Exit'
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
        case 'View all roles':
          viewAllRoles().then(function (results) {
            console.table(results[0]);
            mainPrompt();
            }).catch(err => console.log(err)); 
          break;
        case 'View all employees':
          viewAllEmployees().then(function (results) {
            console.table(results[0]);
            mainPrompt();
            }).catch(err => console.log(err)); 
          break;



        case 'Exit':
          process.exit();
      }   
      
    })
    .catch(err => console.log(err))
}

mainPrompt();
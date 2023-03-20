const cTable = require('console.table');
const inquirer = require('inquirer');
const showWelcomeScreen = require('./logo');
const { 
        viewAllDepartments,
        getDepartmentNames,                
        addDepartmentMenu,
        addDepartment,
        utilizedBudgetAllDepartments,
        utilizedBudgetTotal,
      } = require('./queries/departmentQueries');

const {
        viewAllRoles,
      } = require('./queries/roleQueries');

const {
        viewAllEmployees,
      } = require('./queries/employeeQueries')


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
          'View utilized budget - all departments',
          'View utilized budget - total',
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
        case 'Add a department':          
          addDepartmentPrompt();              
          break;






        case 'View utilized budget - all departments':
          utilizedBudgetAllDepartments().then(function(results) {
            console.table(results[0]);
            mainPrompt();
          }).catch(err => console.log(err));          
          break;
        case 'View utilized budget - total':
          utilizedBudgetTotal().then(function(result) {
            console.table(result[0]);
            mainPrompt();
          }).catch(err => console.log(err));          
          break
        case 'Exit':
          process.exit();
      }   
      
    })
    .catch(err => console.log(err))
}




// async function addDepartmentPrompt() {
function addDepartmentPrompt() {
  // await addDepartmentMenu();  
  addDepartmentMenu();  
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'newDepartment',
        message: 'Enter department name:',
      }
    ])
    .then(({ newDepartment }) => {
      getDepartmentNames().then(arrayOfDeptNames => {        
        // console.log("🚀 ~ file: index.js:95 ~ getDepartmentNames ~ arrayOfDeptNames:", arrayOfDeptNames)
        // arrayOfDeptNames[0].forEach(element => {
        //   if (element.name === newDepartment.toUpperCase()) {
        //     console.log("Department already exists. Department could not be added.");            
        //     mainPrompt();
        //   };          
        // });         
        addDepartment(newDepartment);          
        console.log(`Department ${newDepartment} added successfully.`);          
        mainPrompt();
        })
      })
}      


mainPrompt();
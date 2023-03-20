const cTable = require('console.table');
const inquirer = require('inquirer');
const showWelcomeScreen = require('./logo');
const { 
        viewAllDepartments,
        getDepartmentNames,                
        addDepartmentMenu,
        addDepartment,
        utilizedBudgetSingleDepartment,
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
  console.log('\x1b[33m%s\x1b[0m',`
+--------------------------------------------------------------------------------------------------+
|                                           MAIN MENU                                              |
+--------------------------------------------------------------------------------------------------+
`)
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
          'View utilized budget of a department - single department',
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
            console.log("\x1b[32m%s\x1b[0m", "\n Request completed without errors. \n")
            mainPrompt();
            }).catch(err => console.log(err));          
          break;   
        case 'View all roles':
          viewAllRoles().then(function (results) {
            console.table(results[0]);
            console.log("\x1b[32m%s\x1b[0m", "\n Request completed without errors. \n")
            mainPrompt();
            }).catch(err => console.log(err)); 
          break;
        case 'View all employees':
          viewAllEmployees().then(function (results) {
            console.table(results[0]);
            console.log("\x1b[32m%s\x1b[0m", "\n Request completed without errors. \n")
            mainPrompt();
            }).catch(err => console.log(err)); 
          break;
        case 'Add a department':          
          addDepartmentPrompt().then(({ newDepartment }) => {
            getDepartmentNames().then(arrayOfDeptNames => {        
              let found = false;
              arrayOfDeptNames[0].forEach(element => {
                if (element.name === newDepartment.toUpperCase()) {            
                  found = true;
                  return;
                };          
              });        
              if (found) {
                console.log("\x1b[31m%s\x1b[0m", `\n Department '${newDepartment.toUpperCase()}' already exists. Operation could not be completed. \n`);            
              } else {
                addDepartment(newDepartment);          
                console.log(`Department ${newDepartment} added successfully.`);    
                console.log("\x1b[32m%s\x1b[0m", "\n Request completed without errors. \n")              
              }
              mainPrompt();
            })
          });              
          break;


        case 'View utilized budget of a department - single department':
          selectDepartmentPrompt().then(({selectedDeptartment}) => {
            utilizedBudgetSingleDepartment(selectedDeptartment).then(results => {
            console.table(results[0]);
            console.log("\x1b[32m%s\x1b[0m", "\n Request completed without errors. \n")
            mainPrompt();
            }).catch(err => console.log(err));                    
          }).catch(err => console.log(err));                    
          break;        
        case 'View utilized budget - all departments':
          utilizedBudgetAllDepartments().then(function(results) {
            console.table(results[0]);
            console.log("\x1b[32m%s\x1b[0m", "\n Request completed without errors. \n")
            mainPrompt();
          }).catch(err => console.log(err));          
          break;
        case 'View utilized budget - total':
          utilizedBudgetTotal().then(function(result) {
            console.table(result[0]);
            console.log("\x1b[32m%s\x1b[0m", "\n Request completed without errors. \n")
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
}      

// Function that displays available departments for user to select from
async function selectDepartmentPrompt() {
  const validDepartments = [];
  await getDepartmentNames().then(arrayOfDeptNames => {
    arrayOfDeptNames[0].forEach(element => {
    validDepartments.push(element.name);
    });    
  });
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'selectedDeptartment',
        message: 'Select department:',
        loop: false,
        choices: validDepartments
      }
    ])
}


mainPrompt();
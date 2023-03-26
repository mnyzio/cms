const cTable = require('console.table');
const inquirer = require('inquirer');
const showWelcomeScreen = require('./logo');
const {
  db_viewAllDepartments,
  db_getDepartmentNames,
  db_addDepartmentMenu,
  db_addDepartment,
  db_utilizedBudgetSingleDepartment,
  db_utilizedBudgetAllDepartments,
  db_utilizedBudgetTotal,
} = require('./queries/departmentQueries');

const {
  db_viewAllRoles,
  db_addRole,
  db_getRoles,
} = require('./queries/roleQueries');

const {
  db_viewAllEmployees,
  db_addEmployee,
  db_getManagers,
  db_getEmployees,
  db_updateEmployeeRole,
} = require('./queries/employeeQueries');
const db = require('./config/connection');


// Display logo on start
showWelcomeScreen();

function mainPrompt() {
  console.log('\x1b[33m%s\x1b[0m', `
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
          'View utilized budget - single department',
          'View utilized budget - all departments',
          'View utilized budget - total',
          'Exit'
        ]
      }
    ])
    .then(({ main }) => {
      switch (main) {

        case 'View all departments':
          viewAllDepartments();
          break;

        case 'View all roles':
          viewAllRoles();
          break;

        case 'View all employees':
          viewAllEmployees();
          break;

        case 'Add a department':
          addDepartmentPrompt();
          break;

        case 'Add a role':
          addRolePrompt();
          break;

        case 'Add an employee':
          addEmployeePrompt();
          break;

        case 'Update an employee role':
          updateEmployeeRole();
          break;

        case 'View utilized budget - single department':
          viewUtilizedBudget_Single();
          break;

        case 'View utilized budget - all departments':
          viewUtilizedBudget_All();          
          break;

        case 'View utilized budget - total':
          viewUtilizedBudget_Total();                    
          break

        case 'Exit':
          process.exit();
      }
    })
    .catch(err => console.log(err))
}

async function viewAllDepartments() {
  const allDepartments = await db_viewAllDepartments();
  console.table(allDepartments);
  console.log("\x1b[32m%s\x1b[0m", "\n Request completed without errors. \n")
  mainPrompt();
};

async function viewAllRoles() {
  const allRoles = await db_viewAllRoles();
  console.table(allRoles);
  console.log("\x1b[32m%s\x1b[0m", "\n Request completed without errors. \n")
  mainPrompt();
}

async function viewAllEmployees() {
  const allEmployees = await db_viewAllEmployees();
  console.table(allEmployees);
  console.log("\x1b[32m%s\x1b[0m", "\n Request completed without errors. \n")
  mainPrompt();
};

// Function that displays prompts for steps required to add new department 
async function addDepartmentPrompt() {
  await db_addDepartmentMenu();
  const { newDepartment } = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'newDepartment',
        message: 'Enter department name:',
      }
    ])

  const validDepartments = await db_getDepartmentNames();
  const found = false;

  validDepartments.forEach(element => {
    if (element.name === newDepartment.toUpperCase()) {
      found = true;
      return;
    }
  });

  if (found) {
    console.log("\x1b[31m%s\x1b[0m", `\n Department '${newDepartment.toUpperCase()}' already exists. Operation could not be completed. \n`);
  } else {
    await db_addDepartment(newDepartment);
    console.log(`Department ${newDepartment} added successfully.`);
    console.log("\x1b[32m%s\x1b[0m", "\n Request completed without errors. \n")
  }
  mainPrompt();
}

// Function that displays available departments for user to select from
async function selectDepartmentPrompt() {
  const validDepartments = await db_getDepartmentNames();
  const { selectedDeptartment } = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'selectedDeptartment',
        message: 'Select department:',
        loop: false,
        choices: validDepartments
      }
    ])
  return selectedDeptartment;
}

// Function that displays prompts for steps required to add a role
async function addRolePrompt() {
  // anync function which runs query that returns array of department names
  const validDepartments = await db_getDepartmentNames();
  const { roleName, roleSalary } = await inquirer.prompt([
    {
      type: 'input',
      name: 'roleName',
      message: 'Enter title for new role:',
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'Enter salary for new role:'
    }
  ])

  const roleDepartment = await selectDepartmentPrompt();

  try {
    if (roleName && roleSalary && roleDepartment) {
      await db_addRole(roleName, parseInt(roleSalary), roleDepartment);
      console.log(`Role ${roleName} added successfully.`);
    } else {
      console.log("\x1b[31m%s\x1b[0m", "\n Provided information was not complete. Operation could not be completed. \n")
    };
    mainPrompt();
  }
  catch (err) { console.log(err) };
}

// Function block responsible for adding new employee to database
async function addEmployeePrompt() {
  const validRoles = await db_getRoles();
  const validManagers = await db_getManagers();
  const { firstName, lastName, employeeRoleTitle, employeeManagerName } = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "Enter new employee's first name:",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "Enter new employee's last name:",
      },
      {
        type: 'list',
        name: 'employeeRoleTitle',
        message: 'Select department new employee will belong to:',
        loop: false,
        choices: validRoles,
      },
      {
        type: 'list',
        name: 'employeeManagerName',
        message: `Select new employee's manager:`,
        loop: false,
        choices: validManagers,
      }
    ])
  await db_addEmployee(firstName, lastName, employeeRoleTitle, employeeManagerName);
  mainPrompt();
}

async function updateEmployeeRole() {
  const allEmployees = await db_getEmployees();
  const allRoles = await db_getRoles();
  const { selectedEmployee, selectedRole } = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'selectedEmployee',
        message: "Select employee:",
        loop: false,
        choices: allEmployees,
      },
      {
        type: 'list',
        name: 'selectedRole',
        message: "Select new role:",
        loop: false,
        choices: allRoles,
      },
    ])

  db_updateEmployeeRole(selectedEmployee, selectedRole);

  mainPrompt();
}

async function viewUtilizedBudget_Single() {
  const selectedDepartment = await selectDepartmentPrompt();
  const utilizedBudget = await db_utilizedBudgetSingleDepartment(selectedDepartment);
  console.table(utilizedBudget);
  console.log("\x1b[32m%s\x1b[0m", "\n Request completed without errors. \n")
  mainPrompt();
};

async function viewUtilizedBudget_All() {
  const utilizedBudget = await db_utilizedBudgetAllDepartments();
  console.table(utilizedBudget);
  console.log("\x1b[32m%s\x1b[0m", "\n Request completed without errors. \n")
  mainPrompt();
};

async function viewUtilizedBudget_Total() {
  const utilizedBudget = await db_utilizedBudgetTotal();
  console.table(utilizedBudget);
  console.log("\x1b[32m%s\x1b[0m", "\n Request completed without errors. \n")
  mainPrompt();
};          

mainPrompt();
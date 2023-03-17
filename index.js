const cTable = require('console.table');
const showWelcomeScreen = require('./logo');



showWelcomeScreen();                                          



const myObject = [
    {
      name: 'foo',
      age: 10
    }, {
      name: 'bar',
      age: 20
    }
  ]

console.table(myObject);



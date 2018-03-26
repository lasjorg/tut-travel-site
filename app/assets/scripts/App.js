const $ = require('jquery');
const Person = require('./modules/Person');

alert('test webpack 123!!!!!!!!!!!');

const john = new Person('John', 'Blue');
const jane = new Person('Jane', 'Red');

john.greet();
jane.greet();

$('h1').remove();
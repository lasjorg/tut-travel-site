function Person(name, favColor) {
  this.name = name;
  this.color = favColor;

  this.greet = function() {
    console.log('Hello my name is ' + this.name + ', my favorite color is ' + this.color);
  }
}

const john = new Person('John', 'Blue');
const jane = new Person('Jane', 'Red');

john.greet();
jane.greet();
function Person(name, favColor) {
  this.name = name;
  this.color = favColor;

  this.greet = function() {
    console.log('Hello my name is ' + this.name + ', my favorite color is ' + this.color);
  }
}

module.exports = Person;
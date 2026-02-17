let employee = {
  name: "abdullah",
  baseSalary: 32000,
  overtime: 10,
  rate: 20,
  getWage: function () {
    return this.baseSalary + this.overtime * this.rate;
  },
};

console.log(employee.getWage());

let calculator = {
  v1: 10,
  v2: 20,
  add: function () {
    return this.v1 + this.v2;
  },
  subtract: function () {
    return this.v1 - this.v2;
  },
  multiplication: this.v1 * this.v2,
  division: function () {
    return this.v1 / this.v2;
  },
};

console.log(calculator.add());

// Factory Function
function createCircle(radius) {
  return {
    radius,
    draw: function () {
      console.log("Draw");
    },
  };
}

const circle = createCircle(10);
console.log(circle.draw());

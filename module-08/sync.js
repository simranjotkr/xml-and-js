const timeout = (ms = 3000) => new Promise(resolve => resolve());

function inc(a) {
   return timeout().then(() => a + 1);
}

const sum = function (a, b) {
  return timeout().then(() => a + b);
};

const max = (a, b) => timeout().then(() => a > b ? a : b);

const avg = (a, b) => timeout().then(() => sum(a, b)).then((s) => s / 2);

const obj = {
  name: "Marcus Aurelius",
  split(sep = " ") {
    return timeout().then(() => this.name.split(sep));
  },
};

class Person {
  constructor(name) {
    this.name = name;
  }

  static of(name) {
    return new Person(name);
  }

  split(sep = " ") {
    return timeout().then(() => this.name.split(sep));
  }
}

const person = Person.of("Marcus Aurelius");


inc(5).then(data => console.log("inc(5) =", data));
sum(1, 3).then(data => console.log("sum(1, 3) =", data));
max(8, 6).then(data => console.log("max(8, 6) =", data));
avg(8, 6).then(data => console.log("avg(8, 6) =", data));
obj.split().then(data => console.log("obj.split() =", data));    
person.split().then(data => console.log("person.split() =", data));  



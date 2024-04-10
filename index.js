
class Phone {
  screen = true

  constructor(number, size, model, color) {
    this.number = number
    this.size = size
    this.model = model
    this.color = color
  }

  printModel() {
    console.log('Model:', 'Base')
  }
}

class iPhone extends Phone {
  facetime = true

  constructor(number, size, model, color, appleID) {
    super(number, size, model, color)

    this.appleID = appleID
  }

  printModel() {
    console.log('iPhone: ', this.model)
  }
}

class Samsung extends Phone {
  foldable = true

  constructor(number, size, model, color, repairId) {
    super(number, size, model, color)

    this.repairId = repairId
  }
}

const jdPhone = new iPhone('777-777-7777', 'standard', '15', 'slate grey', 'aosidufoasidjfoqwiejf')
const bobPhone = new iPhone('777-777-7777', 'standard', '12', 'green', 'qweoriuqwoeriuqweoriuq')

const sarahPhone = new Samsung('777-777-7777', 'mini', 's23', 'blue', '234098023981023948')


// console.log(jdPhone)
// console.log(sarahPhone)

jdPhone.printModel()

sarahPhone.printModel()











// function Person(name, age) {
//   this.name = name
//   this.age = age
// }

// Person.prototype.haveBirthday = function () {
//   this.age++
//   console.log('Happy Birthday', this.name)
// }

// class Person {
//   // static species = 'homosapien'
//   // species = 'homosapien'

//   constructor(name, age, hobbies) {
//     this.name = name
//     this.age = age
//     this.hobbies = hobbies
//   }

//   haveBirthday() {
//     this.age++
//     console.log('Happy Birthday', this.name)
//   }

//   printBirthday() {
//     console.log(`${this.name} is ${this.age} years old.`)
//   }

//   // Create a method that loops over the hobbies prop array and prints out each hobby one by one to the terminal
//   printHobbies() {
//     console.log('\nHobbies\n---------')

//     this.hobbies.forEach(hobby => {
//       console.log(hobby)
//     })
//   }
// }


// const jd = new Person('JD', 44, ['fishing', 'pickleball'])

// console.log(jd)
// console.log(jd.species)

// // jd.haveBirthday()
// jd.printHobbies()











// function Person(name, age, hobbies) {
//   this.name = name
//   this.age = age
//   this.hobbies = hobbies
// }
// Person.sayHi = function () {
//   console.log('Hi!')
// }

// Person.prototype.species = 'homosapien'

// Person.prototype.haveBirthday = function () {
//   this.age++
//   console.log('Happy Birthday!')
// }

// Person.prototype.printBirthday = function () {
//   console.log(`You are ${this.age} years old.`)
// }

// const jd = new Person('JD', 44, ['fishing', 'pickleball'])
// const bob = new Person('Bob', 99, ['Bingo', 'Sitting'])
// const sarah = new Person('Sarah', 40, ['movies', 'pickleball'])

// console.log(jd)
// console.log(bob.species)
// console.log(sarah)

// jd.haveBirthday()

// jd.printBirthday()

// bob.printBirthday()

// Person.sayHi()
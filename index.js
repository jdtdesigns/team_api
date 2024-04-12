

const data = {
  name: 'JD',
  age: 44
}

function handlesSomeTask(isCool) {
  return new Promise((resolve, reject) => {
    // if (isCool) {
    //   setTimeout(() => {
    //     resolve()
    //   }, 5000);
    // } else {
    //   reject()
    // }
  })
}

const pendingProm = handlesSomeTask(false)

// pendingProm
//   .then(() => {
//     console.log('this is the resolve function')
//   })
//   .catch(() => {
//     console.log('Error catch callback. This is reject.')
//   })

console.log(Date)

// const methods = {
//   one: function() {

//   },

//   two: function() {

//   }
// }

// methods.one()

// class Prom {
//   constructor(callback) {
//     function resolve() {

//     }

//     function reject() {

//     }

//     callback(resolve, reject)
//   }

//   then(cb) {
//     // Wait until some async code runs and completes before calling the callback
//     setTimeout(() => {
//       cb()
//     }, 3000)

//     return this
//   }

//   catch(cb) {

//   }
// }

// const prom = new Prom((resolve, reject) => {

// })

// prom.then(() => {
//   console.log('callback called')
// })

// const date = new Date()

// function someFunc(callback) {
//   callback
// }

// someFunc(() => {})

// class Animal {
//   constructor(name, friend) {

//   }
// }

// const bear = new Animal('yogi', 'booboo')
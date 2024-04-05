const fs = require('fs')
const studentName = process.argv[2]

if (studentName === 'print') {
  fs.readFile('./students.txt', 'utf8', (err, data) => {
    if (err) {
      return console.log(err)
    }

    const names = data.split('\n')

    console.log('\nStudent List:', '\n', '----------')

    for (let name of names) {
      console.log(name)
    }
  })
} else {
  fs.appendFile('./students.txt', '\n' + studentName, (err) => {
    if (err) {
      return console.log(err)
    }

    console.log('Student has been added!')
  })
}













// writeFile will overwrite a file's contents
// fs.writeFile('./students.txt', studentName, (err) => {
//   if (err) {
//     return console.log(err)
//   }

//   console.log('Student has been added!')
// })





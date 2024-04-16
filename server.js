const express = require('express')
const path = require('path')

const app = express()
const PORT = 3333

const data = [
  {
    id: 234,
    name: 'JD',
    age: 44
  },
  {
    id: 1002,
    name: 'Bob',
    age: 99
  },
  {
    id: 555,
    name: 'Sarah',
    age: 40
  }
]

// Create a GET route for every file inside of public
app.use(express.static('./public'))

// Create a GET route that listens for the user to visit the root address/domain
// app.get('/', (requestObj, responseObj) => {
//   responseObj.sendFile(path.join(__dirname, './public/index.html'))
// })

// GET api route to send back the array of users
app.get('/api/users', (requestObj, responseObj) => {
  const nameQuery = requestObj.query.name.toLowerCase()

  if (nameQuery) {
    const user = data.find(uObj => uObj.name.toLowerCase() === nameQuery)

    return responseObj.json(user)
  }

  responseObj.json(data)
})

/**
  GET api route that uses a url parameter to get the ID of a user and send back the matching user object from the data array

  BONUS - If the user sends a name query parameter, find the user by name instead and send back the matching object
*/
// http://localhost:3333/api/users/234?name=JD

app.get('/api/users/:id', (requestObject, responseObject) => {
  const paramId = requestObject.params.id

  const user = data.find(uObj => uObj.id == paramId)

  responseObject.json(user || { message: 'User not found by that ID' })
})


// Start the server - Tell the server to start listening for routes to be visited
// 
app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})
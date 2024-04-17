const router = require('express').Router()
const { v4: generateID } = require('uuid')
const fs = require('fs/promises')

async function getData() {
  const data = await fs.readFile('./db/users.json', 'utf8')

  return JSON.parse(data)
}

// GET all users
router.get('/users', async (requestObj, responseObj) => {
  const data = await getData()
  const nameQuery = requestObj.query.name?.toLowerCase()

  if (nameQuery) {
    const user = data.find(uObj => uObj.name.toLowerCase() === nameQuery)

    return responseObj.json(user)
  }

  responseObj.json(data)
})

// GET user by ID
router.get('/users/:id', async (requestObject, responseObject) => {
  const data = await getData()
  const paramId = requestObject.params.id

  const user = data.find(uObj => uObj.id == paramId)

  responseObject.json(user || { message: 'User not found by that ID' })
})

// POST - Add a user
router.post('/users', async (requestObject, responseObject) => {
  const id = generateID()
  const data = await getData()

  data.push({
    ...requestObject.body,
    id: id
  })

  await fs.writeFile('./db/users.json', JSON.stringify(data, null, 2))

  responseObject.json({
    message: 'User has been added!'
  })
})

// DELETE a user
router.delete('/users/:id', async (requestObj, responseObj) => {
  const users = await getData()
  const id = requestObj.params.id

  const filtered = users.filter(uObj => uObj.id !== id)

  if (users.length > filtered.length) {
    await fs.writeFile('./db/users.json', JSON.stringify(filtered, null, 2))

    return responseObj.json({
      message: `User with ID of ${id} deleted successfully!`
    })
  }

  responseObj.json({
    message: 'A user with that ID cannot be found.'
  })
})

module.exports = router
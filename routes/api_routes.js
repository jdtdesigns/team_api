const router = require('express').Router()
const { v4: generateID } = require('uuid');
const data = require('../db/data')

// GET all users
router.get('/users', (requestObj, responseObj) => {
  const nameQuery = requestObj.query.name?.toLowerCase()

  if (nameQuery) {
    const user = data.find(uObj => uObj.name.toLowerCase() === nameQuery)

    return responseObj.json(user)
  }

  responseObj.json(data)
})

// GET user by ID
router.get('/users/:id', (requestObject, responseObject) => {
  const paramId = requestObject.params.id

  const user = data.find(uObj => uObj.id == paramId)

  responseObject.json(user || { message: 'User not found by that ID' })
})

// POST add a user
router.post('/users/form', (requestObject, responseObject) => {
  console.log(requestObject.body)

  responseObject.redirect('/')
})

router.post('/users', (requestObject, responseObject) => {
  const id = generateID()

  data.push({
    ...requestObject.body,
    id: id
  })

  responseObject.json({
    message: 'User has been added!'
  })
})

module.exports = router

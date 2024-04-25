const router = require('express').Router()

// Import the Team and Player models
const { Team, Player } = require('../models')

// Create a GET route to get all teams and attach their associated players
router.get('/teams', async (req, res) => {
  const teams = await Team.findAll({
    include: Player
  })

  res.json(teams)
})

// Create a GET route to get all players and attach their associated teams


// Create a GET route to get a single team by ID and attach their associated players

// Create a GET route to get a single player by ID and attach their associated teams


// Create a POST route to create a team - receive req.body data with the required fields/columns

// Create a POST route to create a player - receive req.body data with the required fields/columns

module.exports = router
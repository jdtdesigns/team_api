const router = require('express').Router()

// Import the Team and Player models
const { Team, Player } = require('../models')

// Create a GET route to get all teams and attach their associated players
router.get('/teams', async (req, res) => {
  try {
    const teams = await Team.findAll({
      include: {
        model: Player,
        attributes: {
          exclude: ['password']
        }
      }
    })


    res.json(teams)
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server error. Please try again.'
    })
  }
})

// Create a GET route to get all players and attach their associated teams
router.get('/players', async (req, res) => {
  try {
    const players = await Player.findAll({
      include: Team
    })

    res.json(players)
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server error. Please try again.'
    })
  }
})

// Create a GET route to get a single team by ID and attach their associated players
router.get('/team/:id', async (req, res) => {
  try {
    const id = req.params.id
    const team = await Team.findByPk(id, {
      // Remove the password column from all associated players that are attached
      include: {
        model: Player,
        attributes: {
          exclude: ['password']
        }
      }
    })

    if (!team) {
      return res.json({
        message: 'No team found with that ID.'
      })
    }

    res.json(team)
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server error. Please try again.'
    })
  }
})

// Create a GET route to get a single player by ID and attach their associated teams
router.get('/player/:id', async (req, res) => {
  try {
    const id = req.params.id
    const player = await Player.findByPk(id, {
      include: Team
    })

    if (!player) {
      return res.json({
        message: 'No player found with that ID.'
      })
    }

    res.json(player)
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server error. Please try again.'
    })
  }
})


// Create a POST route to create a team - receive req.body data with the required fields/columns
router.post('/teams', async (req, res) => {
  try {
    const newTeam = await Team.create(req.body)

    res.json(newTeam)
  } catch (err) {
    const errors = err.errors.map(eObj => {
      return {
        message: eObj.message
      }
    })

    res.json({
      message: 'Your request failed.',
      errors: errors
    })
  }
})

// Create a POST route to create a player - receive req.body data with the required fields/columns

module.exports = router
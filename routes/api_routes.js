const router = require('express').Router()

// Import the Team and Player models
const { Team, Player } = require('../models')

function handleValidationError(err, res) {
  console.log(err)

  const errors = err.errors.map(eObj => {
    return {
      message: eObj.message
    }
  })

  res.status(403).json({
    message: 'Validation Error',
    errors: errors
  })
}

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
    handleValidationError(err, res)
  }
})

/**
* 
Create a POST route to create a player - receive req.body data with the required fields/columns
- Add try/catch to catch any sequelize errors that occur and send back a clean JSON error object as we did in the team creation route
*/
router.post('/players', async (req, res) => {
  try {
    let playerInfo = req.body

    const player = await Player.create(playerInfo)

    return res.json(player)
  } catch (err) {
    handleValidationError(err, res)
  }
})


// Create a PUT route to update a player's information - (ie. they send an object(req.body) that looks like {first_name: 'Billy'} and you need to update that player's row in the table to now have a first_name of 'Billy')
router.put('/players/:id', async (req, res) => {
  const { id } = req.params
  //get the object given by user 
  const newData = req.body
  try {
    //target the :id Player
    const player = await Player.findByPk(id)

    if (!player) {
      return res.json({ message: 'Player Not Found' })
    }

    // .update()  a sequelize method
    await player.update(newData)
    //show updated player
    res.json(player)
  } catch (err) {
    handleValidationError(err)
  }
})

// Create a PUT route to update a team's information
router.put('/teams/:id', async (req, res) => {
  const { id } = req.params
  // get the object given by user
  const newData = req.body

  try {
    const team = await Team.findByPk(id)

    if (!team) {
      return res.json({ message: 'Team Not found' })
    }

    await team.update(newData)

    res.json(team)
  } catch (err) {
    handleValidationError(err)
  }
})

// Create a DELETE route to remove a player from the table
router.delete('/players/:id', async (req, res) => {
  try {
    const id = req.params.id

    await Player.destroy({
      where: {
        player_id: id
      }
    })

    res.json({
      message: 'Player deleted successfully!'
    })
  } catch (err) {
    handleValidationError(err, res)
  }
})

// Create a DELETE route to remove a team from the table
router.delete('/teams/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const team = await Team.findByPk(id)

    if (team) {
      await team.destroy()

      return res.json({
        message: 'Team deleted successfully!'
      })
    }

    res.status(404).json({
      message: 'Team with that ID not found'
    })
  } catch (err) {
    handleValidationError(err, res);
  }
});

// Create a POST route to connect a player with a team
router.post('/connect', async (req, res) => {
  // user will return the input as json
  const { team_id, player_id } = req.body

  try {
    //find the team
    const team = await Team.findByPk(team_id)

    if (!team) {
      return res.json({ message: 'Team not found' })
    }
    //find the player
    const player = await Player.findByPk(player_id)

    if (!player) {
      return res.json({ message: 'Player not found' })
    }
    //connect
    await team.addPlayer(player)

    res.json({ message: "player connected to the given team successfully" })

  } catch (err) {
    console.error(err)
    res.json({ message: "Error" })
  }
})


module.exports = router
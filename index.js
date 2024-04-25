const { Sequelize, DataTypes, Model } = require('sequelize');
const { hash, compare } = require('bcrypt')

const client = new Sequelize(
  'sequelize_practice_db',
  'postgres',
  'pass',
  {
    host: 'localhost',
    dialect: 'postgres',
    // logging: false
  });

class Note extends Model { }

Note.init(
  {
    text: {
      type: DataTypes.STRING, // VARCHAR(255)
      allowNull: false
    }
  },
  {
    sequelize: client
  }
)


class User extends Model {
  async validatePass(formPassword) {
    const is_valid = await compare(formPassword, '')

    return is_valid
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: 6
      },
      allowNull: false
    }
  },
  {
    sequelize: client,
    hooks: {
      async beforeCreate(user) {
        user.password = await hash(user.password, 10)
      }
    }
    // timestamps: false
  }
)

// One To Many Relationship - Setting up the foreign key association
User.hasMany(Note) // UserId on each note
Note.belongsTo(User) // UserId on each note

client.sync({ force: false })
  .then(async () => {
    // Create a user
    try {
      const user = await User.findByPk(4)
      const formPassword = 'password123'

      const valid = await user.validatePass(formPassword)

      if (valid) {
        console.log('Password is correct. Logging you in...')
      } else {
        console.log('Your password is incorrect. Please try again.')
      }

      // const user = await User.create({
      //   email: 'jd@test.com',
      //   password: 'password123'
      // })


      // console.log(user)

      // await User.destroy({
      //   where: {}
      // })

      // await Note.destroy({
      //   where: {}
      // })

      // console.log('users and notes gone')
      // const note = await Note.findByPk(3, {
      //   include: User
      // })

      // console.log(note.User.email)



      // const users = await User.findAll({
      //   include: Note
      // })

      // console.log(users[0])

      // const user = await User.findOne({
      //   where: {
      //     email: 'bob@test.com'
      //   },
      //   include: {
      //     model: Note,
      //     attributes: ['text']
      //   }
      // })


      // const note = await Note.create({
      //   text: 'Random Note',
      //   UserId: user.id
      // })

      // console.log(note)
      // const jd = await User.findByPk(1)
      // // const jd = await User.findByPk(1)

      // const note = await jd.createNote({
      //   text: 'Note two for jd'
      // })
      // const note = await jd.createNote({
      //   text: 'Note one for jd'
      // })
      // const bob = await User.create({
      //   email: 'bob@test.com',
      //   password: 'password123'
      // })

    } catch (err) {
      console.log(err)
    }


    // Create a new row in the table
    // const note = await Note.create({
    //   text: 'Text for note five'
    // })

    // Find all notes
    // const notes = await Note.findAll({
    //   attributes: ['text'],
    //   where: {
    //     id: 1
    //   }
    // })

    // Find One
    // const note = await Note.findOne({
    //   where: {
    //     id: 10
    //   }
    // })

    // Find by Primary Key(id)
    // const note = await Note.findByPk(3)

    // console.log(note)
    // Note.findAll()
    //   .then(notes => {
    //     console.log(notes[1].text)
    //   })


    // `
    // DELETE FROM Notes WHERE id = 1
    // `
    // Delete a row from Notes
    // await Note.destroy({
    //   where: {
    //     id: 5
    //   }
    // })

    // console.log('Note deleted successfully!')

    // const results = await Note.update(
    //   {
    //     text: 'Some even newer text for note 1'
    //   },
    //   {
    //     where: {
    //       id: 1
    //     },
    //     returning: true
    //   }
    // )

    // console.log(results[1][0])
  })
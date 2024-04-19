const express = require('express')
const app = express()
const PORT = 3333

const { Client } = require('pg')
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'pass',
  database: 'student_course_db'
})

// Open the middleware channel to allow JSON to be passed to our routes
app.use(express.json())

// Get all courses
app.get('/api/courses', async (request, response) => {
  const detailed = request.query.detailed

  // Check if a query parameter of detailed=true was sent through the request
  // locahost:3333/api/courses?detailed=true
  // If it was sent, make a detailed JOIN query to grab all course and student data then sent it back
  if (detailed === 'true') {
    const { rows } = await client.query(`
    SELECT 
      students.id AS student_id,
      CONCAT(first_name, ' ', last_name) AS full_name,
      course_id,
      name,
      type
    FROM students
    RIGHT JOIN courses
    ON students.course_id = courses.id
    `)

    return response.json(rows)
  }

  // If they don't want detailed, send the basic course data back
  const { rows } = await client.query('SELECT * FROM courses')

  response.json(rows)
})

// Add a course
app.post('/api/courses', async (request, response) => {
  const courseData = request.body
  await client.query('INSERT INTO courses (name, type) VALUES ($1, $2)', [courseData.name, courseData.type])

  response.json({
    message: 'Course added successfully!'
  })
})

// Connect to the database
client.connect()
  .then(() => {
    // Start express server
    app.listen(PORT, () => console.log('Server started on port', PORT))
  })





// backend/server.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()
app.use(cors())
app.use(express.json())

// Connect to PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "postgres",
  port: 5432
})

// Get all tasks
app.get('/tasks', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks')
  res.json(result.rows)
})

// Add new task
app.post('/tasks', async (req, res) => {
  const { task } = req.body
  const result = await pool.query(
    'INSERT INTO tasks(task) VALUES($1) RETURNING *',
    [task]
  )
  res.json(result.rows[0])
})

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  await pool.query('DELETE FROM tasks WHERE id=$1', [req.params.id])
  res.json({ message: "Task deleted" })
})

app.listen(process.env.PORT, () => {
  console.log(`Backend running on port ${process.env.PORT}`)
})
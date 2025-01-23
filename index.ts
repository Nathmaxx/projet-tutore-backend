require('dotenv').config();

import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import api from './api'
import { getPool } from './api/config/dbsql'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API PTUT is responding', code: 200 })
});

app.use('/ptut/api/v1', api)

const server = createServer(app)

const PORT = process.env.PORT || 8000

server.listen(PORT, () => {
  //updatePrices();
  console.log(`Server running at http://localhost:${PORT}`)
})


process.on('SIGINT', () => {
  console.info('SIGINT signal received.')
  console.log('Closing http server.')
  server.close(() => {
    console.log('Http server closed.')
    getPool().end();
    process.exit(0)
  })
});
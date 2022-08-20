import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import logger from 'morgan'
import bodyParser from 'body-parser'

dotenv.config()

// ======================== project imports ========================
import errorHandler from 'middlewares/errorHandler'

// ======================== CONTANTS ============================
const PORT = process.env.PORT || 8000
const HOSTNAME = process.env.HOSTNAME || 'locahost'

// ======================== config ============================
const app = express()

// ======================== middlewares =============================
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

// ======================== routes =========================
app.use(errorHandler)

// ======================== error handling ===========================

// ======================== server listening ==========================
app.listen(PORT, HOSTNAME, () => {
    console.log(`[server]: Server is running at http://${HOSTNAME}:${PORT}`)
})

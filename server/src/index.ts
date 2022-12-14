import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import logger from 'morgan'
import bodyParser from 'body-parser'
import nodeCleanup from 'node-cleanup'

dotenv.config()

// ======================== project imports ========================
import errorHandler from 'middlewares/errorHandler'
import { vndb } from 'utils/vndb-api'
import { visualNovelRouter } from 'routes'

// ======================== CONTANTS ============================
const PORT = process.env.PORT || 8000
const HOSTNAME = process.env.HOSTNAME as string

// ======================== config ============================
const app = express()

// ======================== middlewares =============================
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

// ======================== routes =========================
app.use('/api/visual-novel', visualNovelRouter)

// ======================== error handling ===========================
app.use(errorHandler)

// ======================== cleanup ==============================
nodeCleanup(function (exitCode, signal) {
    console.log('Exit code: ', exitCode)
    console.log('Signal: ', signal)
    console.log('Cleaning up...')

    vndb.destroy()
        .then(() => {
            console.log('vndb connection closed')
        })
        .catch((err) => {
            console.log('error occured when close vndb connection')
        })
})

// ======================== server listening ==========================
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://${HOSTNAME}:${PORT}`)
})

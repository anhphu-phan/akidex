import { searchVisualNovel } from 'controllers/visualNovel'
import express from 'express'

const router = express.Router()

router.get('/search', searchVisualNovel)

export default router

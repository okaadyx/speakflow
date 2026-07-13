import { Router } from 'express'
import { createSupportMessage } from '../controllers/supportController.js'

const router = Router()

router.post('/', createSupportMessage)

export default router

import { Router } from 'express'
import scriptRoutes from './scriptRoutes.js'

const router = Router()

// Mount sub-routers
router.use('/scripts', scriptRoutes)

// API root info
router.get('/', (req, res) => {
  res.json({
    name: 'SpeakFlow API',
    version: '1.0.0',
    status: 'healthy'
  })
})

export default router

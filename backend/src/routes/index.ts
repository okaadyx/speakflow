import { Router } from 'express'
import scriptRoutes from './scriptRoutes.js'
import supportRoutes from './supportRoutes.js'

const router = Router()

// Mount sub-routers
router.use('/scripts', scriptRoutes)
router.use('/support', supportRoutes)

// API root info
router.get('/', (req, res) => {
  res.json({
    name: 'SpeakFlow API',
    version: '1.0.0',
    status: 'healthy'
  })
})

export default router

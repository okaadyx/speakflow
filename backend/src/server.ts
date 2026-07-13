import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import apiRoutes from './routes/index.js'

// Load environment configurations
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Mount middlewares
app.use(cors())
app.use(express.json())

// Mount routes
app.use('/api', apiRoutes)

// General fallback handler
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.url}` })
})

// Start server
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[server]: SpeakFlow API listening at http://localhost:${PORT}`)
  })
}

export default app

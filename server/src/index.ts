import express from 'express'
import cors from 'cors'
import { exerciseRouter } from './routes/exercise.js'
import { goalRouter } from './routes/goal.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
const allowedOrigins: string[] = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'https://frontend-production-3593.up.railway.app'
].filter((origin): origin is string => Boolean(origin))

console.log('Allowed CORS origins:', allowedOrigins)

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/exercise', exerciseRouter)
app.use('/api/goal', goalRouter)

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message)
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  })
})

app.listen(PORT, () => {
  console.log(`TypeScript Champ API running on port ${PORT}`)
})

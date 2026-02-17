import express from 'express'
import 'dotenv/config'
import { sessionRoutes } from './routes/session.routes'

export const app = express()

app.use('/sessions', sessionRoutes)
// app.use(express.json)
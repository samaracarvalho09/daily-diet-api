import express from 'express'
import 'dotenv/config'
import { sessionRoutes } from './routes/session.routes'
import { mealRoutes } from './routes/meal.routes'

export const app = express()


app.use(express.json())

app.get('/', (req, res) => {
  return res.send('API rodando')
})

app.use('/sessions', sessionRoutes)
app.use("/meals", mealRoutes);


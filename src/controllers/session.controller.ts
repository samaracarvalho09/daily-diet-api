import { Request, Response } from 'express'
import { createSessionService } from '../services/session.service'

export async function createSessionController(req: Request, res: Response) {
  const { email, password } = req.body

  const result = await createSessionService({
    email,
    password,
  })

  return res.json(result)
}

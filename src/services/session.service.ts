import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface SessionProps {
  email: string
  password: string
}

export async function createSessionService({
  email,
  password,
}: SessionProps) {

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new Error('Invalid credentials')
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign(
    { userId: user.id },
    'supersecret', // depois colocar no .env
    { expiresIn: '1d' }
  )

  return {
    token
  }
}

import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const route = express.Router()

route.get('/', async (req, res) => {
  const player = await prisma.player.findUnique({
    where: {
      username: req.user.username
    }
  })
  res.json(player)
})

export default route

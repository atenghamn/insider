import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const route = express.Router()

// Get all
route.get('/', async (req, res) => {
  const players = await prisma.player.findMany({
    select: {
      id: true,
      username: true,
      password: false,
      totalScore: true,
      gameId: true,
      game: true
    }
  })
  res.json(players)
})

// Get by id
route.get('/:id', async (req, res) => {
  const player = await prisma.player.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.json(player)
})

// Create new player
route.post('/', async (req, res) => {
  const player = await prisma.player.create({
    data: {
      username: req.body.username,
      password: req.body.password,
      totalScore: 0
    }
  })
  res.json(player)
})

// Delete
route.delete('/:id', async (req, res) => {
  await prisma.player.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.sendStatus(200)
})

export default route

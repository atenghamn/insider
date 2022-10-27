import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const route = express.Router()

// Display all games that you can join
route.get('/', async (req, res) => {
  const openGames = await prisma.game.findMany({
    where: {
      isActive: false
    }
  })
  return res.json(openGames)
})

// Display single game
route.get('/:id', async (req, res) => {
  const game = await prisma.game.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  return res.json(game)
})

// Create game
route.post('/', async (req, res) => {
  const hostPlayer = await prisma.player.findUnique({
    where: {
      username: req.user.username
    }
  })
  const game = await prisma.game.create({
    data: {
      isActive: false,
      host: hostPlayer.id
    }
  })
  await prisma.player.update({
    where: {
      id: parseInt(hostPlayer.id)
    },
    data: {
      gameId: game.id
    }
  })
  return res.json(game)
})

// Join game
route.put('/:id', async (req, res) => {
  let joinedPlayer

  if (req.user !== undefined) {
    joinedPlayer = await prisma.player.findUnique({
      where: {
        id: parseInt(req.user.id)
      }
    })
  }

  const game = await prisma.game.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  if (game.numberOfPlayer > 8) {
    return res.json('Game is closed')
  }
  if (joinedPlayer.gameId === game.id) {
    return res.json('Already joined this game')
  }

  game.numberOfPlayer += 1

  await prisma.game.update({
    where: {
      id: game.id
    },
    data: {
      numberOfPlayer: game.numberOfPlayer
    }
  })

  await prisma.player.update({
    where: {
      id: joinedPlayer.id
    },
    data: {
      gameId: game.id
    }

  })

  return res.json(game)
})

// Start Game
route.get('/start/:id', async (req, res) => {
  const game = await prisma.game.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  if (req.user.id != game.host) {
    return res.sendStatus(401)
  }
  if (game.numberOfPlayer < 4) {
    return res.sendStatus(100)
  }

  const unFiltererdPlayers = await prisma.player.findMany({
    where: {
      gameId: game.id
    }
  })
  const players = unFiltererdPlayers.filter(player => player.id !== game.host)

  const getRand = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  let number = getRand(0, players.length)
  game.master = players[number].id
  players.splice(number, 1)
  number = getRand(0, players.length)
  game.insider = players[number].id
  players.splice(number, 1)
  number = getRand(0, players.length)
  game.cOne = players[number].id
  players.splice(number, 1)

  if (players.length > 4) {
    number = getRand(0, players.length)
    game.cTwo = players[number].id
  }
  if (players.length > 5) {
    players.splice(number, 1)
    number = getRand(0, players.length)
  }
  if (players.length > 6) {
    players.splice(number, 1)
    number = getRand(0, players.length)
  }
  if (players.length > 7) {
    players.splice(number, 1)
    number = getRand(0, players.length)
  }

  await prisma.game.update({
    where: {
      id: game.id
    },
    data: {
      master: game.master,
      insider: game.insider,
      cOne: game.cOne,
      cTwo: game.cTwo,
      cThree: game.cThree,
      cFour: game.cFour,
      cFive: game.cFive
    }
  })

  return res.json(game)
})

// Report winner
route.post('/winner/:id', async (req, res) => {
  const game = await prisma.game.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  if (game.host !== req.user.id) {
    return res.sendStatus(401)
  }
  const winner = await prisma.player.findUnique({
    where: {
      username: req.body.username
    }
  })

  if (winner === undefined) {
    return res.sendStatus(500)
  }
  winner.totalScore += 10

  await prisma.game.delete({
    where: {
      id: game.id
    }
  })
  await prisma.player.update({
    where: {
      id: winner.id
    },
    data: {
      totalScore: winner.totalScore
    }
  })
  return res.json(winner)
})

// End game
route.delete('/:id', async (req, res) => {
  const game = await prisma.game.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  if (game.host !== req.user.id) {
    return res.sendStatus(401)
  } else {
    await prisma.game.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })
  }
  return res.sendStatus(200)
})

export default route

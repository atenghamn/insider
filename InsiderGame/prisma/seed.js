import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seed = async () => {
  // Ta bort innan släpp
  await prisma.game.deleteMany()
  await prisma.player.deleteMany()

  await prisma.player.create({
    data: {
      username: 'Ozzy',
      password: 'biteABat',
      totalScore: 0
    }
  })

  await prisma.player.create({
    data: {
      username: 'Bill',
      password: 'biteABat',
      totalScore: 0
    }
  })

  await prisma.player.create({
    data: {
      username: 'Tommy',
      password: 'biteABat',
      totalScore: 0
    }
  })

  await prisma.player.create({
    data: {
      username: 'Geezer',
      password: 'biteABat',
      totalScore: 0
    }
  })
}

seed()

export default seed

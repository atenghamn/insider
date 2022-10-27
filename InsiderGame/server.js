import express from 'express'
import 'dotenv/config'
import playerRoutes from './routes/playerRoutes.js'
import gameRoutes from './routes/gameRoutes.js'
import passport from 'passport'
import passconf from './passport/passconf.js'
import userInfoRoutes from './routes/userInfoRoutes.js'
import session from 'express-session'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const PORT = 5000
const expServer = express()
expServer.use(cors({ origin: 'http://localhost:3000', credentials: true }))
expServer.use(express.json())

expServer.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

passconf(passport, name => prisma.player.findUnique({ where: { username: name } }))

expServer.use(passport.initialize())
expServer.use(passport.session())
expServer.use(passport.authenticate('session'))

expServer.post('/login', passport.authenticate('local', {}), (req, res) => res.sendStatus(200))

expServer.post('/logout', function (req, res, next) {
  console.log('---------------------------------------------------------------------------------------------------------')
  req.logout(function (err) {
    if (err) { return next(err) }
    res.sendStatus(200)
  })
})

const authenticateUser = (req, res, next) => { req.isAuthenticated() ? next() : res.sendStatus(401) }

expServer.use('/game/players', playerRoutes)
expServer.use('/game/userinfo', authenticateUser, userInfoRoutes)
expServer.use('/game', authenticateUser, gameRoutes)

expServer.listen(PORT, () => console.log(`Running on port ${PORT}`))

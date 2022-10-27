import { Strategy } from 'passport-local'

const passconf = (passport, loadUserBy) => {
  const verify = async (username, password, done) => {
    const player = await loadUserBy(username)

    if (!player) { return done(null, false) }

    if (password === player.password) { return done(null, player) } else { done(null, false) }
  }

  passport.use(new Strategy({ usernameField: 'username' }, verify))

  passport.serializeUser((player, done) => {
    done(null, player.username)
  })

  passport.deserializeUser(async (username, done) => {
    done(null, await loadUserBy(username))
  })

  return passport
}
export default passconf

import { log } from './utils'
import { changeState, Lobby } from './states'

let state

const loop = () => setInterval(() => {
  if (state) state.loop()
}, (1 / 60) * 1000)

const run = () => {
  log.debug('Start server')
  state = changeState(state, Lobby.NAME)
  loop()
  log.debug('Server started')
}

run()

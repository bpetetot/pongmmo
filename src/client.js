import { log } from './utils'
import { changeState, Lobby } from './states'

let state

const loop = () => {
  requestAnimationFrame(loop)
  if (state) state.loop()
}

const run = () => {
  log.debug('Start client')
  state = changeState(state, Lobby.NAME)
  loop()
  log.debug('Client started')
}

run()

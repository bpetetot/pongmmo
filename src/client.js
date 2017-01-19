import io from 'socket.io-client'
import { log } from 'utils'

import LobbyClient from './states/lobby/LobbyClient'

const socket = io()

let state

const loop = () => {
  requestAnimationFrame(loop)
  if (state) state.loop()
}

const run = () => {
  log.debug('Start client')

  state = new LobbyClient(socket)
  state.create()

  loop()

  log.debug('Client started')
}

run()

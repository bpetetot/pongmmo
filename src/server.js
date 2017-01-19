import socketIO from 'socket.io'
import _ from 'lodash'

import { SERVER_PORT } from 'global'
import { log } from 'utils'

import LobbyServer from './states/lobby/LobbyServer'

export const io = socketIO(SERVER_PORT)
const sockets = []

let state

const loop = () => setInterval(() => {
  if (state) state.loop()
}, (1 / 60) * 1000)

const run = () => {
  log.debug('Start server...')

  state = new LobbyServer(sockets)
  state.create()

  // when a client is connected
  io.on('connection', (socket) => {
    log.debug(`Client connected : ${socket.id}`)
    sockets.push(socket)
    if (state) state.connect(socket)

    // when a client is disconnected
    socket.on('disconnect', () => {
      log.debug(`Client disconnected : ${socket.id}`)
      if (state) state.disconnect(socket)
      _.remove(sockets, s => s.id === socket.id)
    })
  })

  loop()

  log.debug('Server started')
}

run()

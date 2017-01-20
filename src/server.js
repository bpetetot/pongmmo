import { SERVER_PORT } from 'global'
import _ from 'lodash'
import socketIO from 'socket.io'
import factory from './states/factory'
import LobbyServer from './states/lobby/LobbyServer'

const io = socketIO(SERVER_PORT)

const loop = step => () => setInterval(step, (1 / 60) * 1000)

const statesFactories = {
  lobby: LobbyServer,
}

const init = (f) => {
  // when a client is connected
  io.on('connection', (socket) => {
    f.sockets.push(socket)
    f.state.connect(socket)
    console.log(`connected ${socket.id}`)

    // when a client is disconnected
    socket.on('disconnect', () => {
      _.remove(f.sockets, s => s.id === socket.id)
      f.state.disconnect(socket)
      console.log(`disconnect ${socket.id}`)
    })
  })
}

factory.loopImplem = loop
factory.statesFactories = statesFactories
factory.broadcast = (name, data) => io.emit(name, data)
factory.run(init)

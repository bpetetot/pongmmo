import { io } from 'server'
import { log } from 'utils'
import State from 'states/state'

import { SERVER_PING, CLIENT_PONG } from './events'

class LobbyServer extends State {

  static NAME = 'LOBBY_SERVER'
  static PING_TIME = 1000

  constructor(sockets) {
    super(LobbyServer.NAME)
    this.sockets = sockets
  }

  create() {
    this.sockets.forEach(socket => this.connect(socket))
    setInterval(() => io.emit(SERVER_PING, new Date().getTime()), LobbyServer.PING_TIME)
  }

  connect(socket) {
    socket.on(CLIENT_PONG, this.onPong)
  }

  disconnect(socket) {
    socket.removeListener(CLIENT_PONG, this.onPong)
  }

  destroy() {
    this.sockets.forEach(socket => this.disconnect(socket))
  }

  onPong({ id, time }) {
    const latency = Math.floor((new Date().getTime() - time) / 2)
    log.info(`Pong from client '${id}' : ${latency}`)
  }

}

export default LobbyServer

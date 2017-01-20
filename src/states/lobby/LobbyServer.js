import { log } from 'utils'
import State from 'states/state'

import { SERVER_PING, CLIENT_PONG } from './events'

const PING_TIME = 1000

class LobbyServer extends State {
  resume() {
    this.itv = setInterval(
      () => { this.broadcast(SERVER_PING, new Date().getTime()) },
      PING_TIME
    )
  }

  pause() {
    if (this.itv) clearInterval(this.itv)
  }

  connect(socket) {
    socket.on(CLIENT_PONG, this.onPong)
  }

  disconnect(socket) {
    socket.removeListener(CLIENT_PONG, this.onPong)
  }

  // eslint-disable-next-line class-methods-use-this
  onPong({ id, time }) {
    const latency = Math.floor((new Date().getTime() - time) / 2)
    log.info(`Pong from client '${id}' : ${latency}`)
  }
}

export default LobbyServer

import State from 'states/state'
import { SERVER_PING, CLIENT_PONG } from './events'

class LobbyClient extends State {

  static NAME = 'LOBBY_CLIENT'

  constructor(socket) {
    super(LobbyClient.NAME)
    this.socket = socket
    this.ping = this.ping.bind(this)
  }

  create() {
    this.socket.on(SERVER_PING, this.ping)
  }

  destroy() {
    this.socket.removeListener(SERVER_PING, this.ping)
  }

  ping(time) {
    this.socket.emit(CLIENT_PONG, { id: this.socket.id, time })
  }

}

export default LobbyClient

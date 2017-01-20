import State from 'states/state'
import { SERVER_PING, CLIENT_PONG } from './events'

class LobbyClient extends State {
  connect(socket) {
    socket.on(SERVER_PING, time => this.ping(socket, time))
  }

  disconnect(socket) {
    socket.removeListener(SERVER_PING, this.ping)
  }

  ping = (socket, time) => {
    socket.emit(CLIENT_PONG, { id: socket.id, time })
  }
}

export default LobbyClient

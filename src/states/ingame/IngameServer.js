import { log } from 'utils'
import State from 'states/state'
import * as events from './events'

class IngameServer extends State {

  connect(socket) {
    socket.on(events.CLIENT_END_GAME, this.onEndGame)
  }

  // eslint-disable-next-line class-methods-use-this
  disconnect(socket) {
    socket.removeAllListeners()
  }

  onEndGame = () => {
    log.info('Game over')
    this.broadcast(events.SERVER_END_GAME)
    this.factory.changeTo('lobby')
  }

}

export default IngameServer

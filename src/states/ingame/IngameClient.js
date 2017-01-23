import State from 'states/state'
import eventBus from 'states/events'
import Graphics from './graphics'
import * as events from './events'

class IngameClient extends State {

  create() {
    this.graphics = new Graphics()
    this.graphics.create()
  }

  connect(socket) {
    eventBus.on(events.USER_END_GAME, this.endGame(socket))
    socket.on(events.SERVER_END_GAME, this.onEndGame)
  }

  // eslint-disable-next-line class-methods-use-this
  disconnect(socket) {
    socket.removeAllListeners()
    eventBus.removeAllListeners(events.USER_END_GAME)
  }

  endGame = socket => () => {
    socket.emit(events.CLIENT_END_GAME)
  }

  onEndGame = () => {
    this.graphics.destroy()
    this.factory.changeTo('lobby')
  }

}

export default IngameClient

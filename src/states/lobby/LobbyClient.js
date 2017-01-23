import State from 'states/state'
import eventBus from 'states/events'
import Graphics from './graphics'
import * as events from './events'

class LobbyClient extends State {

  create() {
    this.graphics = new Graphics()
    this.graphics.create()
  }

  connect(socket) {
    socket.on(events.SERVER_PING, this.onPing(socket))
    socket.on(events.SERVER_START_GAME, this.onStartGame)
    eventBus.on(events.USER_JOIN_GAME, this.joinGame(socket))
    eventBus.on(events.USER_START_GAME, this.startGame(socket))
  }

  // eslint-disable-next-line class-methods-use-this
  disconnect(socket) {
    socket.removeAllListeners()
    eventBus.removeAllListeners(events.USER_JOIN_GAME)
    eventBus.removeAllListeners(events.USER_START_GAME)
  }

  onPing = socket => (time) => {
    socket.emit(events.CLIENT_PONG, { id: socket.id, time })
  }

  joinGame = socket => () => {
    this.graphics.join()
    socket.emit(events.CLIENT_JOIN_GAME, socket.id)
  }

  startGame = socket => () => {
    socket.emit(events.CLIENT_START_GAME)
  }

  onStartGame = () => {
    this.graphics.destroy()
    this.factory.changeTo('ingame')
  }
}

export default LobbyClient

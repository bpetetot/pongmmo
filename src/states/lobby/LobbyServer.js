import { log } from 'utils'
import State from 'states/state'
import * as events from './events'

const PING_TIME = 1000

class LobbyServer extends State {
  resume() {
    this.itv = setInterval(
      () => { this.broadcast(events.SERVER_PING, new Date().getTime()) },
      PING_TIME
    )
  }

  pause() {
    if (this.itv) clearInterval(this.itv)
  }

  connect(socket) {
    socket.on(events.CLIENT_PONG, this.onPong)
    socket.on(events.CLIENT_JOIN_GAME, this.onJoinGame)
    socket.on(events.CLIENT_START_GAME, this.onStartGame)
  }

  // eslint-disable-next-line class-methods-use-this
  disconnect(socket) {
    socket.removeAllListeners()
  }

  onPong = ({ id, time }) => {
    const latency = Math.floor((new Date().getTime() - time) / 2)
    log.info(`Pong from client '${id}' : ${latency}`)
  }

  onJoinGame = (id) => {
    log.info(`Client '${id}' joins the game`)
  }

  onStartGame = () => {
    log.info('Game starts')
    this.broadcast(events.SERVER_START_GAME)
    this.factory.changeTo('ingame')
  }
}

export default LobbyServer

import io from 'socket.io-client'
import factory from './states/factory'
import LobbyClient from './states/lobby/LobbyClient'
import IngameClient from './states/ingame/IngameClient'

const statesFactories = {
  lobby: LobbyClient,
  ingame: IngameClient,
}

const loop = step => () => {
  requestAnimationFrame(loop)
  step()
}

const init = (f) => {
  const socket = io()
  f.sockets.push(socket)
}

factory.loopImplem = loop
factory.statesFactories = statesFactories
factory.run(init)

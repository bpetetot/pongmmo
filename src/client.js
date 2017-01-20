import io from 'socket.io-client'
import factory from './states/factory'
import LobbyClient from './states/lobby/LobbyClient'

const statesFactories = {
  lobby: LobbyClient,
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

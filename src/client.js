import io from 'socket.io-client'

import { WIDTH, HEIGHT, MODE_DEV } from './config'
import { GAME_WAITING, GAME_STARTED } from './constants'
import * as Renderer from './gui/renderer'
import * as events from './events'
import * as Lobby from './gui/lobby'
import { init, updateBodies } from './gui'

const socket = io()

let gameState = GAME_WAITING
let playerId
let players

// when server pings client
socket.on(events.SERVER_PING, time => socket.emit(events.CLIENT_PONG, time))

// when client joins server
socket.on(events.SERVER_SET_PLAYER, (id) => {
  playerId = id
})

// when players updated
socket.on(events.SERVER_ADD_PLAYERS, (connectedPlayers) => {
  players = connectedPlayers
})

// when game state change
socket.on(events.SERVER_SET_STATE, (state) => {
  gameState = state
  if (gameState === GAME_STARTED) {
    Lobby.destroy(socket)
    init(socket, playerId, players)
  } else if (gameState === GAME_WAITING) {
    Renderer.add(Lobby.create(socket))
  }
})

// Animation loop
const loop = () => {
  requestAnimationFrame(loop)

  if (MODE_DEV) Renderer.stats.begin()

  if (gameState === GAME_STARTED) updateBodies()

  Renderer.render()

  if (MODE_DEV) Renderer.stats.end()
}

const run = () => {
  // initialize renderer
  Renderer.init({
    view: document.getElementById('main'),
    width: WIDTH,
    height: HEIGHT,
  })

  // launch animation loop
  loop()
}

run()

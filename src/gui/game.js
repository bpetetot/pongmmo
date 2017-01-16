import p2 from 'p2'
import find from 'lodash/find'

import { SERVER_MOVE, CLIENT_MOVE } from '../events'
import { convert } from '../utils'
import * as physic from '../physic'
import * as Renderer from './renderer'

let socket
let physicWorld
const players = []
let currentPlayerId
let step

// Update physic and render it
export const updateBodies = () => {
  physic.tick()
  // Convert physic bodies to rendered items
  players.forEach((box) => {
    const { graphics, body } = box
    const { x, y } = convert(body)
    graphics.position.x = x
    graphics.position.y = y
    graphics.rotation = body.interpolatedAngle
  })
}

// Create map
const createMap = () => {
  const walls = Renderer.renderWalls(
    physicWorld.bodies.filter(b => b.gameType === physic.GAME_TYPE_WALL)
  ).map(w => w.graphics)
  Renderer.add(...walls)
}

// Create players
const createPlayers = (newPlayers) => {
  newPlayers.forEach((player) => {
    const body = physic.createBox(player.x, player.y)
    const graphics = Renderer.renderBox(body, player.color)
    players.push({ ...player, body, graphics })
  })
  const graphics = players.map(p => p.graphics)
  Renderer.add(...graphics)
}

// Initialize a game
export const init = (socketio, playerId, newPlayers) => {
  step = 0
  socket = socketio
  currentPlayerId = playerId
  physicWorld = physic.init()

  createMap()
  createPlayers(newPlayers)

  socket.on(SERVER_MOVE, (event) => {
    const serverPlayers = event.players

    players
      .map(p => Object.assign(
        p.body,
        physic.pickBodyProps(
          serverPlayers.find(s => s.id === p.id).body
        )
      ))
  })

  // Key moves
  document.addEventListener('keydown', (event) => {
    event.preventDefault() // avoid window scrolling

    const { key } = event
    let velocity
    if (key === 'ArrowLeft') {
      velocity = [-2, 0]
    } else if (key === 'ArrowRight') {
      velocity = [2, 0]
    } else if (key === 'ArrowDown') {
      velocity = [0, 2]
    } else if (key === 'ArrowUp') {
      velocity = [0, -2]
    }

    if (velocity) {
      const { body } = find(players, { id: currentPlayerId })
      p2.vec2.add(body.velocity, body.velocity, velocity)
      step += 1
      socket.emit(CLIENT_MOVE, { id: currentPlayerId, velocity, step })
    }
  }, false)
}

import 'babel-polyfill'
import socketIO from 'socket.io'
import p2 from 'p2'
import find from 'lodash/find'

import logger from './logger'
import db, { players, game } from './db'
import { SERVER_PORT } from './config'
import { GAME_WAITING, GAME_STARTED } from './constants'
import * as physic from './physic'
import * as utils from './utils'
import * as events from './events'

const io = socketIO(SERVER_PORT)

let allPlayers = []
let physicInterval
let synchroInterval

// Initialize Server
const initialize = async () => {
  logger.info(`Server listen on port ${SERVER_PORT}...`)
  await db()
  await game.insert({ state: GAME_WAITING })
}

// Update game state into DB
const setGameState = async (state) => {
  const [s] = await game.getAll()
  await game.update({ ...s, state })
}

// Run the server
const run = () => {
  // Send game state to all clients when it changes
  game.onChange(s => io.emit(events.SERVER_SET_STATE, s.state))
  // Set game state to 'WAITING'
  setGameState(GAME_WAITING)

  // When a client is connected
  io.on(events.CONNECTION, async (socket) => {
    logger.info(`Client connected : ${socket.id}`)

    // Send game state when just connected
    const [s] = await game.getAll()
    socket.emit(events.SERVER_SET_STATE, s.state)
    socket.emit(events.SERVER_ADD_PLAYERS, await players.getAll())

    // When new player is connected
    socket.on(events.CLIENT_PLAYER_CONNECT, async ({ name }) => {
      logger.info(`Player connected ''${name}'': ${socket.id}`)

      // Store new player and with its socket ID
      const newPlayer = {
        id: socket.id,
        name,
        color: utils.randomColor(),
        x: utils.random(1, 7),
        y: utils.random(1, 6),
        latency: 0,
      }
      await players.insert(newPlayer)
      socket.emit(events.SERVER_SET_PLAYER, socket.id)

      // Send players to all clients
      io.emit(events.SERVER_ADD_PLAYERS, await players.getAll())
    })

    // When the game is started
    socket.on(events.CLIENT_START_GAME, async () => {
      // Re-init values if restarted
      allPlayers = []
      if (physicInterval) clearInterval(physicInterval)
      if (synchroInterval) clearInterval(synchroInterval)

      // Initialize physic server
      physic.init()
      physicInterval = setInterval(physic.tick, (1 / 60) * 1000)

      // Add players to physic engine
      const playersConnected = await players.getAll()
      playersConnected.forEach(p => allPlayers.push({ ...p, body: physic.createBox(p.x, p.y) }))

      // Set server state to 'STARTED'
      setGameState(GAME_STARTED)

      // Synchronize clients with server physics
      synchroInterval = setInterval(() => {
        io.emit(events.SERVER_SYNCHRONIZE, allPlayers.map(p => ({
          id: p.id,
          ...physic.pickBodyProps(p.body),
        })))
      }, 200)
    })

    // When client moves a player
    socket.on(events.CLIENT_MOVE, async ({ id, velocity }) => {
      const { body } = find(allPlayers, { id })
      p2.vec2.add(body.velocity, body.velocity, velocity)
      // store velocity
      const p = await players.get(socket.id)
      players.update({ ...p, velocity: body.velocity })
    })

    // When a client is disconnected
    socket.on(events.DISCONNECT, async () => {
      logger.info(`Client disconnected : ${socket.id}`)
      // delete player from DB
      await players.delete(socket.id)
      // check if enought players to play
      const connectedPlayers = await players.getAll()
      if (connectedPlayers.length <= 1) setGameState(GAME_WAITING)
      // Send players to all clients
      io.emit(events.SERVER_ADD_PLAYERS, connectedPlayers)
    })

    // When a client responds to a ping
    socket.on(events.CLIENT_PONG, async (startTime) => {
      const latency = Math.floor((new Date().getTime() - startTime) / 2)
      const p = await players.get(socket.id)
      players.update({ ...p, latency })
    })
  })

  // Send ping to all clients
  setInterval(() => io.emit(events.SERVER_PING, new Date().getTime()), 1000)

  // Send players infos to all clients
  setInterval(async () => io.emit(events.SERVER_ADD_PLAYERS, await players.getAll()), 1000)
}

initialize()
run()

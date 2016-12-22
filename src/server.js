import 'babel-polyfill'
import socketIO from 'socket.io'
import { SERVER_PORT } from './config'
import db, { player } from './db'
import { SET_PLAYERS, UPDATE_PLAYER, CONNECTION } from './events'
import { init, addBodies, tick, createBox } from './physic'
import logger from './logger'
import { STATE_START_SERVER } from './constants'

const io = socketIO(SERVER_PORT)
const NAMES = ['Pierre', 'Charles', 'Yvonne', 'Jules', 'Maxime', 'Florent', 'Angéline', 'Julie']
const rand = (min, max) => Math.floor((Math.random() * max) + min)
const randPos = (min, max) => (Math.random() * (max - min)) + min

let start = false

const physicLoop = async () => {
  if (!start) return
  tick()
}

const run = async () => {
  logger.info(`Server listen on port ${SERVER_PORT}...`)
  logger.info(`Entering in ${STATE_START_SERVER} state...`)
  await db()

  init()
  setInterval(physicLoop, (1 / 60) * 1000)

  io.on(CONNECTION, async (socket) => {
    const newPlayer = {
      name: NAMES[rand(0, NAMES.length - 1)],
      x: randPos(1, 7),
      y: randPos(1, 6),
    }

    player.insert(newPlayer)
    addBodies(createBox(newPlayer.x, newPlayer.y))
    start = true

    // Connect events
    socket.emit(SET_PLAYERS, await player.getAll())
    player.onChange(p => io.emit(UPDATE_PLAYER, p))
    socket.on(UPDATE_PLAYER, player.update) // Should be checked (for cheating player)
  })
}

run()

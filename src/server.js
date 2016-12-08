import 'babel-polyfill'
import Matter from 'matter-js'
import socketIO from 'socket.io'
import { player } from './db'
import { SET_PLAYERS, UPDATE_PLAYER, CONNECTION } from './events'
import { WIDTH, HEIGHT } from './config'
import logger from './logger'

const io = socketIO(9000)
const NAMES = ['Pierre', 'Charles', 'Yvonne', 'Jules', 'Maxime', 'Florent', 'Angéline', 'Julie']
const rand = (min, max) => Math.floor((Math.random() * max) + min)

const run = () => {
  io.on(CONNECTION, async (socket) => {
    player.insert({
      name: NAMES[rand(0, NAMES.length - 1)],
      x: rand(0, WIDTH),
      y: rand(0, HEIGHT),
    })

    // Connect events
    socket.emit(SET_PLAYERS, await player.getAll())
    player.onChange(p => io.emit(UPDATE_PLAYER, p))
    socket.on(UPDATE_PLAYER, player.update) // Should be checked (for cheating player)
  })
}

run()

// Test physic engine on server-side
const engine = Matter.Engine.create()
const boxA = Matter.Bodies.rectangle(400, 200, 80, 80)
const boxB = Matter.Bodies.rectangle(450, 50, 80, 80)
const ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true })

Matter.World.add(engine.world, [boxA, boxB, ground])

logger.debug('boxA', boxA.position)
logger.debug('boxB', boxB.position)

// loop
for (let i = 0; i < 100; i += 1) {
  Matter.Engine.update(engine, engine.timing.delta)
}

logger.debug('boxA', boxA.position)
logger.debug('boxB', boxB.position)

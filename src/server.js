import 'babel-polyfill'
import socketIO from 'socket.io'
import { player } from './db'
import { SET_PLAYERS, UPDATE_PLAYER, CONNECTION } from './events'
import { init, addBodies, tick, createBox } from './physic'

const io = socketIO(9000)
const NAMES = ['Pierre', 'Charles', 'Yvonne', 'Jules', 'Maxime', 'Florent', 'Angéline', 'Julie']
const rand = (min, max) => Math.floor((Math.random() * max) + min)
const randPos = (min, max) => (Math.random() * (max - min)) + min

let start = false

const physicLoop = async () => {
  if (!start) return
  tick()
}

const run = () => {
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

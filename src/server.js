import 'babel-polyfill'
import socketIO from 'socket.io'
import { player } from './db'
import { SET_PLAYERS, UPDATE_PLAYER, CONNECTION } from './events'
import { WIDTH, HEIGHT } from './config'

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

import socketIO from 'socket.io'
import PlayerModel from './player'

const io = socketIO(9000)

const WIDTH = 800
const HEIGHT = 600
const NAMES = ['Pierre', 'Charles', 'Yvonne', 'Jules', 'Maxime', 'Florent', 'Angéline', 'Julie']

const rand = (min, max) => Math.floor((Math.random() * max) + min)

const players = []

io.on('connection', (socket) => {
  // Give players
  socket.emit(PlayerModel.actions.SET_PLAYERS, players)

  // Generate a new player
  const newPlayer = {
    name: NAMES[rand(0, NAMES.length - 1)],
    x: rand(0, WIDTH),
    y: rand(0, HEIGHT),
  }
  players.push(newPlayer)
  console.log(`New player: ${newPlayer.name}`)

  // Send it to socket and to everybody
  socket.emit(PlayerModel.actions.SET_PLAYER, newPlayer)
  io.emit(PlayerModel.actions.ADD_PLAYER, newPlayer)

  // Connect events
  socket.on(PlayerModel.actions.UPDATE_PLAYER, player => PlayerModel.cb.update(io, socket, player))
})

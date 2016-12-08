import io from 'socket.io-client'
import { SET_PLAYERS, UPDATE_PLAYER } from './events'
import { PhysicEngine } from './physic'

const socket = io()

const players = {}
let currentPlayerId

const physics = new PhysicEngine({
  render: 'main',
})

physics.init()

socket.on(SET_PLAYERS, (data) => {
  data.forEach((p) => {
    currentPlayerId = p.id
    if (!players[p.id]) {
      const player = {
        id: p.id,
        body: physics.createPlayer(p.id, p.x, p.y),
      }
      players[p.id] = player
    }
  })
})

socket.on(UPDATE_PLAYER, (data) => {
  console.log(data)
  // scene.onSetPlayer(data.id, data.x, data.y)
})

document.addEventListener('keydown', (event) => {
  if (currentPlayerId) {
    const keyName = event.key
    const player = players[currentPlayerId]
    if (keyName === 'ArrowLeft') {
      physics.move('left', player.id)
      // socket.emit(UPDATE_PLAYER, { ...player, x: player.x, y: player.y })
    } else if (keyName === 'ArrowRight') {
      physics.move('right', player.id)
      // socket.emit(UPDATE_PLAYER, { ...player, x: player.x, y: player.y })
    }
  }
}, false)

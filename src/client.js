import io from 'socket.io-client'
import { SET_PLAYERS, UPDATE_PLAYER } from './events'
import { WIDTH, HEIGHT } from './config'
import * as Renderer from './renderer'
import * as Physics from './physic'
import { convert } from './renderer/convertor'

const socket = io()

let boxes = []

// Initialize
const physicWold = Physics.init()
Renderer.init({
  view: 'main',
  width: WIDTH,
  height: HEIGHT,
})

// Prepare map
Renderer.add(
  ...Renderer.renderWalls(
    physicWold.bodies.filter(b => b.gameType === Physics.GAME_TYPE_WALL)
  )
)

socket.on(SET_PLAYERS, (data) => {
  boxes = data.map((player) => {
    const box = Physics.createBox(player.x, player.y)

    Physics.addBodies(box)
    return Renderer.renderBox(box)
  })

  Renderer.add(...boxes)
})

socket.on(UPDATE_PLAYER, () => {
  // console.log(data)
  // scene.onSetPlayer(data.id, data.x, data.y)
})

document.addEventListener('keydown', (event) => {
  const keyName = event.key
  // const player = players[currentPlayerId]
  if (keyName === 'ArrowLeft') {
    // socket.emit(UPDATE_PLAYER, { ...player, x: player.x, y: player.y })
  } else if (keyName === 'ArrowRight') {
    // socket.emit(UPDATE_PLAYER, { ...player, x: player.x, y: player.y })
  }
}, false)


// Animation loop
function loop() {
  requestAnimationFrame(loop)

  Physics.tick()

  boxes.forEach((box) => {
    const { graphics, body } = box
    const { x, y } = convert(body)

    graphics.position.x = x
    graphics.position.y = y
    graphics.rotation = body.interpolatedAngle
  })

  // Render scene
  Renderer.render()
}

loop()

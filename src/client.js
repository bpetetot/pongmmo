/* eslint-disable import/no-extraneous-dependencies  */
/* eslint-disable import/extensions */
import 'file-loader?name=[name].[ext]!./index.html'
import avatarFile from 'file-loader!../assets/avatar.png'
import io from 'socket.io-client'
/* eslint-enable import/extensions */
/* eslint-enable import/no-extraneous-dependencies */
import { SET_PLAYERS, UPDATE_PLAYER } from './events'

const PIXI = require('pixi.js')

const socket = io()

// You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`,
// or `PIXI.autoDetectRenderer` which will try to choose the best renderer
// for the environment you are in.
const renderer = new PIXI.WebGLRenderer(800, 600)

// The renderer will create a canvas element for you that you can then insert into the DOM.
const fps = document.getElementById('fps')
const mainStage = document.getElementById('main')
mainStage.appendChild(renderer.view)

// You need to create a root container that will hold the scene you want to draw.
const stage = new PIXI.Container()

// Declare a global constiable for our sprite so that the animate function can access it.
let player = null
const players = []

const ticker = new PIXI.ticker.Ticker()

function updateFPS() {
  fps.innerHTML = `FPS : ${ticker.FPS}`
}

function animate() {
  // start the timer for the next animation loop
  window.requestAnimationFrame(animate)

  // each frame we spin the avatar around a bit
  // avatar.rotation += 0.01

  //
  updateFPS()
  // this is the main render call that makes pixi draw your container and its children.
  renderer.render(stage)
}

socket.on(SET_PLAYERS, (data) => {
  data.forEach((p, i) => {
    // load the texture we need
    PIXI.loader.add(`player ${i}`, avatarFile).load((loader, resources) => {
      // This creates a texture from a 'avatar.png' image.
      player = new PIXI.Sprite(resources[`player ${i}`].texture)
      // Setup the position and scale of the avatar
      player.position.x = p.x
      player.position.y = p.y
      player.raw = p
      // Add the avatar to the scene we are building.
      stage.addChild(player)
      players.push(player)
    })
  })
  // kick off the animation loop (defined below)
  animate()
})

socket.on(UPDATE_PLAYER, (data) => {
  const p = players[0]

  if (p && p.position && data) {
    // Setup the position and scale of the avatar
    p.position.x = data.x
    p.position.y = data.y
  }
})

document.addEventListener('keydown', (event) => {
  const keyName = event.key
  if (keyName === 'ArrowLeft') {
    player.x -= 10
    socket.emit(UPDATE_PLAYER, { ...player.raw, x: player.x, y: player.y })
  } else if (keyName === 'ArrowRight') {
    player.x += 10
    socket.emit(UPDATE_PLAYER, { ...player.raw, x: player.x, y: player.y })
  }
}, false)

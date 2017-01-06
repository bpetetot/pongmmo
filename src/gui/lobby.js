import { Text, Graphics } from 'pixi.js'
import { add } from './renderer'
import * as events from '../events'
import { CLIENT_CONNECTED, CLIENT_IDLE, GAME_WAITING } from '../constants'

const textStyle = { fontSize: 15 }
const lobbyStateText = new Text('', textStyle)
const clientStateText = new Text('', textStyle)
const actionButton = new Graphics()
let playersText = []

let lobbyState = GAME_WAITING
let clientState = CLIENT_IDLE

const createButton = (onClick) => {
  actionButton.beginFill(0xFF3300)
  actionButton.lineStyle(4, 0xffd900, 1)
  actionButton.drawRect(30, 540, 100, 30)
  actionButton.endFill()
  actionButton.interactive = true
  actionButton.buttonMode = true
  actionButton.click = onClick
  add(actionButton)
}

export const lobby = (socket) => {
  // when game state change
  socket.on(events.SERVER_SET_STATE, (state) => {
    lobbyState = state
    lobbyStateText.text = `Server : ${state}`
  })

  // when client joins server
  socket.on(events.SERVER_SET_PLAYER, (id) => {
    clientState = CLIENT_CONNECTED
    clientStateText.text = `Client : ${id}`
  })

  // when players updated
  socket.on(events.SERVER_ADD_PLAYERS, (players) => {
    playersText.forEach(t => t.destroy())
    playersText = []
    let yPosition = 100
    players.forEach((p) => {
      const playerText = new Text(`${p.name} (${p.latency}ms)`, textStyle)
      playerText.x = 30
      playerText.y = yPosition
      yPosition += 30
      playersText.push(playerText)
    })
    add(...playersText)
  })

  // lobby state
  lobbyStateText.x = 30
  lobbyStateText.y = 30
  add(lobbyStateText)

  // client state
  clientStateText.x = 30
  clientStateText.y = 60
  add(clientStateText)

  // add button
  createButton(() => {
    if (lobbyState === GAME_WAITING && clientState === CLIENT_IDLE) {
      // join server
      socket.emit(events.CLIENT_PLAYER_CONNECT, { name: 'Ian Solo' })
    } else if (lobbyState === GAME_WAITING && clientState === CLIENT_CONNECTED) {
      // start game
      socket.emit(events.CLIENT_START_GAME)
    }
  })
}

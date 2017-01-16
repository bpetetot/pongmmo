import { Container } from 'pixi.js'

import Text from './components/Text'
import Button from './components/Button'
import VerticalLayout from './components/VerticalLayout'
import { scrollable } from './components/Scrollable'
import TextInput from './components/TextInput'

import { WIDTH } from '../config'
import { CLIENT_CONNECTED, CLIENT_IDLE } from '../constants'
import * as events from '../events'
import { convert } from '../utils'

// UI elements
const [width] = convert([WIDTH])
const layout = new VerticalLayout({ width })
const container = new Container()
const titleText = new Text('Pong MMO', { fontSize: 50, fill: 0xffffff })
const userInput = new TextInput('Ian Solo')
const button = new Button('JOIN GAME')
const playersLayout = scrollable(new VerticalLayout({ width: 400, align: 'LEFT' }), 400)

// UI State
const uiState = {
  client: CLIENT_IDLE,
}

// Listeners
const onPlayerJoin = () => {
  uiState.client = CLIENT_CONNECTED
  userInput.visible = false
  button.text('START GAME')
  layout.update()
}

const onUpdatePlayers = (players) => {
  playersLayout.clear()
  playersLayout.add(players.map(p => new Text(`${p.name} (${p.latency}ms)`)))
  layout.update()
}

// Lobby constructor
export const create = (socket) => {
  // register socket listeners
  socket.on(events.SERVER_SET_PLAYER, onPlayerJoin)
  socket.on(events.SERVER_ADD_PLAYERS, onUpdatePlayers)

  // initialize UI
  layout.add(titleText)
  layout.add(userInput)
  layout.add(button)
  layout.add(playersLayout)

  layout.attach(container)

  button.onClick(() => {
    const username = userInput.text
    if (uiState.client === CLIENT_IDLE && username && username.trim() !== '') {
      socket.emit(events.CLIENT_PLAYER_CONNECT, { name: username })
    } else if (uiState.client === CLIENT_CONNECTED) {
      socket.emit(events.CLIENT_START_GAME)
    }
  })

  return container
}

// Lobby destructor
export const destroy = (socket) => {
  // unregister socket listeners
  socket.off(events.SERVER_SET_PLAYER, onPlayerJoin)
  socket.off(events.SERVER_ADD_PLAYERS, onUpdatePlayers)

  // destroy container
  container.destroy()
}

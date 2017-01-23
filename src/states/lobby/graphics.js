import eventBus from 'states/events'
import * as events from './events'

export default class {

  constructor() {
    this.view = document.getElementById('main')
  }

  create() {
    const titleEl = document.createElement('h1')
    titleEl.appendChild(document.createTextNode('Lobby'))
    this.view.appendChild(titleEl)

    this.myButton = document.createElement('input')
    this.myButton.type = 'button'
    this.myButton.value = 'join'
    this.myButton.onclick = () => eventBus.emit(events.USER_JOIN_GAME)
    this.view.appendChild(this.myButton)
  }

  join() {
    this.myButton.value = 'start'
    this.myButton.onclick = () => eventBus.emit(events.USER_START_GAME)
  }

  destroy() {
    while (this.view.hasChildNodes()) {
      this.view.removeChild(this.view.lastChild)
    }
  }

}

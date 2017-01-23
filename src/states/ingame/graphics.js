import eventBus from 'states/events'
import * as events from './events'

export default class {

  constructor() {
    this.view = document.getElementById('main')
  }

  create() {
    const titleEl = document.createElement('h1')
    const title = document.createTextNode('In game')
    titleEl.appendChild(title)
    this.view.appendChild(titleEl)

    this.myButton = document.createElement('input')
    this.myButton.type = 'button'
    this.myButton.value = 'End game'
    this.myButton.onclick = () => eventBus.emit(events.USER_END_GAME)
    this.view.appendChild(this.myButton)
  }

  destroy() {
    while (this.view.hasChildNodes()) {
      this.view.removeChild(this.view.lastChild)
    }
  }

}

import { log } from 'utils'

class State {
  constructor(name) {
    this.name = name
  }

  connect() {
    log.debug(`State '${this.name}' - connect`)
  }

  disconnect() {
    log.debug(`State '${this.name}' - disconnect`)
  }

  create() {
    log.debug(`State '${this.name}' - create`)
  }

  loop() {
    // log.debug(`State '${this.name}' - loop`)
  }

  pause() {
    log.debug(`State '${this.name}' - pause`)
  }

  resume() {
    log.debug(`State '${this.name}' - resume`)
  }

  destroy() {
    log.debug(`State '${this.name}' - destroy`)
  }

}

export default State

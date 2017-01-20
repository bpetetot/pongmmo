class Factory {
  constructor() {
    this.states = {}
    this.sockets = []
  }

  loop() {
    this.loopImplem(this.loop)
    if (this.state) {
      const newState = this.state.loop()
      if (newState) this.changeTo(newState)
    }
  }

  connect() {
    this.sockets.forEach((s) => { this.state.connect(s) })
  }

  disconnect() {
    this.sockets.forEach((s) => { this.state.disconnect(s) })
  }

  changeTo(name) {
    if (this.state) {
      this.disconnect()
      if (this.state.name === 'lobby' && name === 'game') {
        this.state.destroy()
      } else {
        this.state.pause()
      }
    }

    const curName = (this.state && this.state.name) || ''
    let newState = this.states[curName]
    if (newState) {
      this.state = newState
      this.state.resume()
    } else {
      newState = new this.statesFactories[name]()
      this.state = newState
      this.state.name = name
      this.state.broadcast = this.broadcast
      this.state.create()
      this.state.resume()
    }

    this.connect()
  }

  run(init) {
    init(this)
    this.loop()
    this.changeTo('lobby')
  }
}

export default new Factory()

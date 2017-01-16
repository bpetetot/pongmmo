import { Container } from 'pixi.js'

class Component {

  static DEFAULT_OPTIONS = {
    x: 0,
    y: 0,
  }

  constructor(options) {
    this.options = { ...Component.DEFAULT_OPTIONS, ...options }
    this.container = new Container()
    this.container.x = this.options.x
    this.container.y = this.options.y
  }

  add(element) {
    this.container.addChild(element)
  }

  destroy() {
    this.container.destroy()
  }

  attach(container) {
    if (container instanceof Container) {
      container.addChild(this.container)
    }
  }

  update() {
    if (this.p_onUpdate) this.p_onUpdate(this.width, this.height)
  }

  get container() {
    return this.componentContainer
  }

  set container(container) {
    this.componentContainer = container
  }

  get options() {
    return this.componentOptions
  }

  set options(options) {
    this.componentOptions = options
  }

  get x() {
    return this.container.x
  }

  set x(x) {
    this.container.x = x
  }

  get y() {
    return this.container.y
  }

  set y(y) {
    this.container.y = y
  }

  get width() {
    return this.container.width
  }

  get height() {
    return this.container.height
  }

  set onUpdate(callback) {
    this.p_onUpdate = callback
  }

}

export default Component

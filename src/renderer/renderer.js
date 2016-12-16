import { autoDetectRenderer, Container } from 'pixi.js'
import Stats from 'stats.js'
import { convert } from './convertor'
import { MODE_DEV } from '../config'

let renderer
let container
export const stats = new Stats()

// Init pixi.js
export const init = ({ view, width, height }) => {
  const [w, h] = convert([width, height])

  // Create the renderer
  renderer = autoDetectRenderer(w, h, { backgroundColor: 0x65C25D, antialias: true })

  // Add the canvas to the DOM
  document.getElementById(view).appendChild(renderer.view)

  // Add transform to the container
  container = new Container()
  container.position.x = 0
  container.position.y = 0
  container.scale.x = 1
  container.scale.y = 1

  // Configure stats view to the body
  if (MODE_DEV) {
    stats.showPanel(0)
    document.body.appendChild(stats.dom)
  }
}

export const add = (...elements) => {
  elements.forEach(e => container.addChild(e.graphics))
  return elements
}

export const render = () => {
  renderer.render(container)
}

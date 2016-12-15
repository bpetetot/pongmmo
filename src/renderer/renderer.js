import { autoDetectRenderer, Container } from 'pixi.js'
import { convert } from './convertor'

let renderer
let container

// Init pixi.js
export const init = ({ view, width, height }) => {
  const [w, h] = convert([width, height])

  // Create the renderer
  renderer = autoDetectRenderer(w, h, { backgroundColor: 0x65C25D, antialias: true })

  // Add the canvas to the DOM
  const domElement = document.getElementById(view)
  domElement.appendChild(renderer.view)

  // Add transform to the container
  container = new Container()
  container.position.x = 0
  container.position.y = 0
  container.scale.x = 1
  container.scale.y = 1
}

export const add = (...elements) => {
  elements.forEach(e => container.addChild(e.graphics))
  return elements
}

export const render = () => {
  renderer.render(container)
}

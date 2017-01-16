import { autoDetectRenderer, Container } from 'pixi.js'
import Stats from 'stats.js'
import { convert } from '../../utils'
import { MODE_DEV, RATIO } from '../../config'

let renderer
let container
export const screen2worldRatio = [1, 1]
export const stats = new Stats()

// Init pixi.js
export const init = ({ view, width, height }) => {
  const [w, h] = convert([width, height])

  // Create the renderer
  renderer = autoDetectRenderer(w, h, {
    backgroundColor: 0x000000,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoResize: true,
  })

  // Add the canvas to the DOM
  view.appendChild(renderer.view)

  // Add transform to the container
  container = new Container()
  container.position.x = 0
  container.position.y = 0
  container.scale.x = 1
  container.scale.y = 1

  // Configure stats view to the body
  if (MODE_DEV) {
    stats.showPanel(0)
    // document.body.appendChild(stats.dom)
  }

  // Update renderer with on resize window
  window.onresize = () => {
    let widthRenderer
    let heightRenderer
    if (window.innerWidth / window.innerHeight >= RATIO) {
      widthRenderer = window.innerHeight * RATIO
      heightRenderer = window.innerHeight
    } else {
      widthRenderer = window.innerWidth
      heightRenderer = window.innerWidth / RATIO
    }
    renderer.view.style.width = `${widthRenderer}px`
    renderer.view.style.height = `${heightRenderer}px`

    // update the screen to world ratio
    screen2worldRatio[0] = w / widthRenderer
    screen2worldRatio[1] = h / heightRenderer
  }

  window.onresize()
}

export const add = (...elements) => {
  elements.forEach(e => container.addChild(e))
  return elements
}

export const render = () => {
  renderer.render(container)
}

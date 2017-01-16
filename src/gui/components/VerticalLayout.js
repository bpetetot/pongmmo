import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

import Component from './Component'

export const CENTER = 'CENTER'
export const LEFT = 'LEFT'
export const RIGHT = 'RIGHT'

class VerticalLayout extends Component {

  static DEFAUT_OPTIONS = {
    width: 0,
    space: 10,
    align: CENTER,
  }

  constructor(options = VerticalLayout.DEFAUT_OPTIONS) {
    super({ ...VerticalLayout.DEFAUT_OPTIONS, ...options })
    this.components = []
  }

  get width() {
    return this.options.width
  }

  update() {
    const { space, align, width } = this.options
    let nextY = 0
    this.components.forEach((c) => {
      c.y = nextY
      if (align === CENTER) {
        c.x = (width / 2) - (c.width / 2)
      } else if (align === RIGHT) {
        c.x = width - c.width
      } else {
        c.x = 0
      }
      nextY += c.height + space
      c.update()
    })
    super.update()
  }

  add(components) {
    if (isArray(components)) {
      components.forEach((c) => {
        this.components.push(c)
        c.attach(super.container)
      })
    } else if (isObject(components)) {
      this.components.push(components)
      components.attach(super.container)
    }
  }

  clear() {
    this.components.forEach(c => c.destroy())
    this.components = []
  }

}

export default VerticalLayout

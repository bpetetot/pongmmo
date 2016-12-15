import { Graphics } from 'pixi.js'
import { convert } from '../convertor'
import { randomColor } from '../utils'

export const renderBox = (body) => {
  const { x, y, w, h } = convert(body)

  const graphics = new Graphics()
  graphics.beginFill(randomColor())
  graphics.drawRect(x, y, w, h)
  graphics.pivot.set(w / 2, h / 2)
  graphics.endFill()
  return { graphics, body }
}

import { Graphics } from 'pixi.js'
import { convert } from '../convertor'

export const renderBox = (body, color) => {
  const { x, y, w, h } = convert(body)

  const graphics = new Graphics()
  graphics.beginFill(color)
  graphics.drawRect(x, y, w, h)
  graphics.pivot.set(w / 2, h / 2)
  graphics.endFill()
  return graphics
}

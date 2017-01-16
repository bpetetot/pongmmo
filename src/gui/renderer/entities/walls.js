import { Graphics } from 'pixi.js'
import { convert } from '../../../utils'

export const renderWall = (body) => {
  const { x, y, w, h } = convert(body)

  const graphics = new Graphics()
  graphics.beginFill(0xff0000)
  graphics.drawRect(x, y, w, h)
  graphics.pivot.set(w / 2, h / 2)
  graphics.endFill()
  return { graphics, body }
}

export const renderWalls = walls => walls.map(w => renderWall(w))

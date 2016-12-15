import p2 from 'p2'
import { GAME_TYPE_BOX } from './constants'

const SIZE = 0.3

export const createBox = (x, y) => {
  const shape = new p2.Box({ width: SIZE, height: SIZE })
  const body = new p2.Body({ mass: 1, position: [x, y] })

  body.addShape(shape)
  body.gameType = GAME_TYPE_BOX

  return body
}

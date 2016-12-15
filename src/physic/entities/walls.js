import p2 from 'p2'
import { GAME_TYPE_WALL } from './constants'

const WALL_SIZE = 0.1

const createWall = (x, y, width, height) => {
  const shape = new p2.Box({ width, height })
  const body = new p2.Body({ mass: 0, position: [x, y] })

  body.addShape(shape)
  body.gameType = GAME_TYPE_WALL

  return body
}


export const createWalls = (width, height) => [
  // In p2.js : x,y of a body represents the body center (not top,left)
  createWall(width / 2, 0, width, WALL_SIZE), // top
  createWall(0, height / 2, WALL_SIZE, height), // left
  createWall(width / 2, height, width, WALL_SIZE), // bottom
  createWall(width, height / 2, WALL_SIZE, height), // right
]

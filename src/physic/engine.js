import p2 from 'p2'
import pick from 'lodash/pick'

import { createWalls } from './entities/walls'
import { WIDTH, HEIGHT } from '../config'

let world
// let ticks = 0

export const addBodies = (...bodies) => {
  bodies.forEach(b => world.addBody(b))

  if (bodies.length === 1) return bodies[0]
  return bodies
}

export const init = () => {
  world = new p2.World({
    gravity: [0, 0],
  })

  world.islandSplit = true
  world.sleepMode = p2.World.ISLAND_SLEEPING
  world.solver.iterations = 20
  world.solver.tolerance = 0.001
  world.setGlobalStiffness(1e4)

  addBodies(...createWalls(WIDTH, HEIGHT))

  return world
}

let lastTime
const maxSubSteps = 2 // Max physics ticks per render frame
const fixedDeltaTime = 1 / 120 // Physics "tick" delta time
export const tick = () => {
  const time = new Date().getTime()
  let delta = lastTime ? (time - lastTime) / 1000 : 0
  lastTime = time
  // Make sure the time delta is not too big (can happen if user switches browser tab)
  delta = Math.min(1 / 10, delta)

  // Move physics bodies forward in time
  world.step(fixedDeltaTime, delta, maxSubSteps)

  // Debug purpose
  /* ticks += 1
  console.log('Bodies', ticks, {
    walls: world.bodies.filter(b => b.gameType === GAME_TYPE_WALL).map(b => b.position),
    boxes: world.bodies.filter(b => b.gameType === GAME_TYPE_BOX).map(b => b.position),
  }) */
}

export const pickBodyProps = (body) => {
  return pick(body, ['position', 'velocity', 'angle', 'angularForce', 'angularVelocity'])
}

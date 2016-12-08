import { Engine, World, Bodies, Render, Body, Composite } from 'matter-js'
import { WIDTH, HEIGHT } from '../config'

export class PhysicEngine {

  constructor(options) {
    this.options = options
    this.engine = Engine.create()
    this.engine.world.gravity.y = 0
    this.engine.world.gravity.scale = 0
  }

  init() {
    // render by default for debugging
    if (this.options.render) {
      const render = Render.create({
        element: document.getElementById(this.options.render),
        engine: this.engine,
        options: {
          showVelocity: true,
        },
      })
      Render.run(render)
    }
    // Add ground
    this.createGround()

    // Execute engine
    Engine.run(this.engine)

    const ball = this.createBall()
    Body.setVelocity(ball, { x: -4, y: 10 })
  }

  createGround() {
    const options = {
      isStatic: true,
      restitution: 1,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
    }
    const bottom = Bodies.rectangle(WIDTH / 2, HEIGHT - 10, WIDTH, 5, options)
    const top = Bodies.rectangle(WIDTH / 2, 10, WIDTH, 5, options)
    const left = Bodies.rectangle(10, HEIGHT / 2, 5, HEIGHT, options)
    const right = Bodies.rectangle(WIDTH - 10, HEIGHT / 2, 5, HEIGHT, options)
    World.add(this.engine.world, [bottom, top, left, right])
  }

  createBall() {
    const options = {
      inertia: Infinity, // avoid rotation
      restitution: 1,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
    }
    const ball = Bodies.circle(WIDTH / 2, HEIGHT / 2, 10, options)
    World.add(this.engine.world, ball)
    return ball
  }

  createPlayer(id, x, y) {
    const options = {
      id,
      restitution: 1,
      frictionAir: 0,
      friction: 0,
      frictionStatic: 0,
    }
    const body = Bodies.rectangle(x, y, 50, 5, options)
    World.add(this.engine.world, body)
    return body
  }

  move(direction, id) {
    const racket = Composite.get(this.engine.world, id, 'body')
    switch (direction) {
      case 'left':
        Body.setVelocity(racket, { x: -5, y: 0 })
        break
      case 'right':
        Body.setVelocity(racket, { x: 5, y: 0 })
        break
      default:
    }
  }

}

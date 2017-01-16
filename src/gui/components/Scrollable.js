import { Graphics, Point } from 'pixi.js'
import { screen2worldRatio } from '../renderer'
import Component from './Component'

class ScrollableComponent extends Component {

  constructor(component, height) {
    super({})
    this.component = component
    this.scrolling = false
    this.startScrollY = 0

    this.onScrollStart = this.onScrollStart.bind(this)
    this.onScrollEnd = this.onScrollEnd.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onScrollWheel = this.onScrollWheel.bind(this)

    // Mask component with the scrolling area
    this.mask = new Graphics()
    this.mask.beginFill()
    this.mask.drawRect(0, 0, component.width, height)
    this.mask.endFill()
    this.component.container.mask = this.mask

    // Frame representing the scrolling area
    this.maskFrame = new Graphics()
    this.maskFrame.beginFill(0x666666)
    this.maskFrame.drawRect(this.mask.x, this.mask.y, this.mask.width, this.mask.height)
    this.maskFrame.endFill()

    // Scroll bar
    this.scrollBar = new Graphics()
    this.scrollBar.beginFill(0xffffff)
    this.scrollBar.drawRect(component.width - 10, 0, 10, 1)
    this.scrollBar.endFill()
    this.scrollBar.interactive = true
    this.scrollBar.buttonMode = true
    this.scrollBar.mouseover = () => { this.scrollBar.tint = 0xAAAAAA }
    this.scrollBar.mouseout = () => { this.scrollBar.tint = 0xFFFFFF }
    this.scrollBar.mousedown = this.onScrollStart
    this.scrollBar.mouseup = this.onScrollEnd
    this.scrollBar.mouseupoutside = this.onScrollEnd
    this.scrollBar.mousemove = this.onScroll
    this.scrollBar.touchstart = this.onScrollStart
    this.scrollBar.touchend = this.onScrollEnd
    this.scrollBar.touchendoutside = this.onScrollEnd
    this.scrollBar.touchmove = this.onScroll
    document.addEventListener('mousewheel', this.onScrollWheel, false)

    this.maskFrame.addChild(this.scrollBar)
    this.component.container.addChild(this.maskFrame)
    this.component.container.addChild(this.mask)
    this.container.addChild(this.component.container)

    this.updateScroll()
  }

  onScrollStart(e) {
    this.scrolling = true
    this.startScrollY = e.data.global.y
  }

  onScrollEnd() {
    this.scrolling = false
  }

  onScroll(e) {
    const delta = e.data.global.y - this.startScrollY
    if (this.scrolling) this.scrollTo(this.scrollBar.y + delta)
    this.startScrollY = e.data.global.y
  }

  onScrollWheel(e) {
    e.preventDefault()
    const { width, height } = this.mask
    // get globale coordinates of the mask origin
    const { x, y } = this.mask.toGlobal(new Point(0, 0))
    // convert event screen coodinates to world global coordinates
    const eGlobalX = e.x * screen2worldRatio[0]
    const eGlobalY = e.y * screen2worldRatio[1]
    // check if wheeling is done in the scroll area (ie. the mask)
    if (eGlobalX >= x && eGlobalX <= x + width && eGlobalY >= y && eGlobalY <= y + height) {
      this.scrollTo(this.scrollBar.y + e.deltaY)
    }
  }

  isScrollable() {
    return this.component.height > this.mask.height
  }

  scrollTo(newPosY) {
    const delta = newPosY - this.scrollBar.y
    const maxPosY = this.mask.height - this.scrollBar.height
    if (this.isScrollable() && newPosY >= 0 && newPosY <= maxPosY && delta !== 0) {
      this.scrollBar.y = newPosY
      const deltaComp = delta * (this.component.height / this.mask.height)
      this.container.y -= deltaComp // move the scrolled container up
      this.mask.y += deltaComp
      this.maskFrame.y += deltaComp
    }
  }

  updateScroll() {
    this.scrollBar.visible = this.isScrollable()
    if (this.isScrollable()) {
      // set the scrollbar height
      const newHeight = (this.mask.height * this.mask.height) / this.component.height
      this.scrollBar.height = newHeight
    } else {
      // if no scroll bar put everything to origin
      this.container.y = 0
      this.mask.y = 0
      this.maskFrame.y = 0
    }
  }

  destroy() {
    this.component.destroy()
    super.destroy()
    document.removeEventListener('mousewheel', this.onScrollWheel)
  }

}

export const scrollable = (component, height) => {
  const scroll = new ScrollableComponent(component, height)

  // the scroll component wrap the given component
  component.attach = (container) => {
    scroll.attach(container)
  }

  // update scrollbar when the given component is updated
  component.onUpdate = (w, h) => {
    scroll.updateScroll(w, h)
  }

  return component
}

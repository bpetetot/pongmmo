import { Text, Graphics } from 'pixi.js'
import Component from './Component'

class Button extends Component {

  static DEFAULT_OPTIONS = {
    padding: 10,
    textStyle: { fontSize: 12, fill: 0xffffff },
    buttonStyle: { bgColor: 0x666666, borderColor: 0x666666 },
  }

  constructor(text, options) {
    super({ ...Button.DEFAULT_OPTIONS, ...options })
    const { padding, textStyle, buttonStyle } = this.options

    this.textBtn = new Text(text, textStyle)
    this.textBtn.position.x = Math.floor(padding)
    this.textBtn.position.y = Math.floor(padding)

    const w = this.textBtn.width + (padding * 2)
    const h = this.textBtn.height + (padding * 2)

    this.rectBtn = new Graphics()
    this.rectBtn.beginFill(buttonStyle.bgColor)
    this.rectBtn.lineStyle(1, buttonStyle.borderColor)
    this.rectBtn.drawRect(0, 0, w, h)
    this.rectBtn.endFill()
    this.rectBtn.interactive = true
    this.rectBtn.buttonMode = true
    this.rectBtn.mouseover = () => { this.rectBtn.tint = 0xAAAAAA }
    this.rectBtn.mouseout = () => { this.rectBtn.tint = 0xFFFFFF }

    super.add(this.rectBtn)
    super.add(this.textBtn)
  }

  onClick(callback) {
    this.rectBtn.click = callback
    this.rectBtn.tap = callback
  }

  text(text) {
    this.textBtn.text = text
    this.rectBtn.width = this.textBtn.width + (this.options.padding * 2)
    this.rectBtn.height = this.textBtn.height + (this.options.padding * 2)
  }

}

export default Button

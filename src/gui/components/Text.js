import { Text as PixiText } from 'pixi.js'
import Component from './Component'

class Text extends Component {

  static DEFAULT_OPTIONS = { fontSize: 12, fill: 0xffffff }

  constructor(text, options) {
    super({ ...Text.DEFAULT_OPTIONS, ...options })
    this.element = new PixiText(text, this.options)
    super.add(this.element)
  }

  text(text = '') {
    this.element.text = text
  }

}

export default Text

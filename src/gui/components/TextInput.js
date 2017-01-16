import { Container, Text, Rectangle, Graphics } from 'pixi.js'
import Component from './Component'

// Trigger an event function if it exists.
const trigger = (fn, e) => {
  if (fn) {
    fn(e)
  }
}

class PixiTextInput extends Container {

  constructor(text = '', style = { fontSize: 20 }) {
    super()
    this.p_text = text
    this.localWidth = 100
    this.p_backgroundColor = 0xffffff
    this.p_caretColor = 0x000000
    this.p_background = true
    this.p_padding = 0

    this.style = style
    this.textField = new Text(this.p_text, style)

    this.localHeight = this.textField.height
    this.backgroundGraphics = new Graphics()
    this.textFieldMask = new Graphics()
    this.caret = new Graphics()
    this.drawElements()

    this.addChild(this.backgroundGraphics)
    this.addChild(this.textField)
    this.addChild(this.caret)
    this.addChild(this.textFieldMask)

    this.scrollIndex = 0
    this.caretIndex = 0
    this.caretFlashInterval = null
    this.blur()
    this.updateCaretPosition()

    this.backgroundGraphics.interactive = true
    this.backgroundGraphics.buttonMode = true
    this.backgroundGraphics.defaultCursor = 'text'

    this.backgroundGraphics.mousedown = this.onBackgroundMouseDown.bind(this)
    this.keyEventClosure = this.onKeyEvent.bind(this)
    this.windowBlurClosure = this.onWindowBlur.bind(this)
    this.documentMouseDownClosure = this.onDocumentMouseDown.bind(this)
    this.isFocusClick = false

    this.updateText()

    this.textField.mask = this.textFieldMask

    this.keypress = null
    this.keydown = null
    this.change = null
  }

  /**
   * Someone clicked.
   * @method onBackgroundMouseDown
   * @private
   */
  onBackgroundMouseDown(e) {
    const x = e.data.global.x
    this.caretIndex = this.getCaretIndexByCoord(x)
    this.updateCaretPosition()
    this.focus()
    this.isFocusClick = true
    const scope = this
    setTimeout(() => {
      scope.isFocusClick = false
    }, 0)
  }

  /**
   * Focus this input field.
   * @method focus
   */
  focus() {
    this.blur()
    document.addEventListener('keydown', this.keyEventClosure)
    document.addEventListener('keypress', this.keyEventClosure)
    document.addEventListener('mousedown', this.documentMouseDownClosure)
    window.addEventListener('blur', this.windowBlurClosure)
    this.showCaret()
  }

  /**
   * Handle key event.
   * @method onKeyEvent
   * @private
   */
  onKeyEvent(e) {
    if (e.type === 'keypress') {
      if (e.charCode < 32) {
        return
      }
      this.p_text = this.p_text.substring(0, this.caretIndex)
        + String.fromCharCode(e.charCode)
        + this.p_text.substring(this.caretIndex)
      this.caretIndex += 1
      this.ensureCaretInView()
      this.showCaret()
      this.updateText()
      trigger(this.keypress, e)
      trigger(this.change)
    }

    if (e.type === 'keydown') {
      switch (e.keyCode) {
        case 8:
          if (this.caretIndex > 0) {
            this.p_text = this.p_text.substring(0, this.caretIndex - 1)
              + this.p_text.substring(this.caretIndex)
            this.caretIndex -= 1
            this.ensureCaretInView()
            this.showCaret()
            this.updateText()
          }
          e.preventDefault()
          trigger(this.change)
          break

        case 46:
          this.p_text = this.p_text.substring(0, this.caretIndex)
            + this.p_text.substring(this.caretIndex + 1)
          this.ensureCaretInView()
          this.updateCaretPosition()
          this.showCaret()
          this.updateText()
          e.preventDefault()
          trigger(this.change)
          break

        case 39:
          this.caretIndex += 1
          if (this.caretIndex > this.p_text.length) { this.caretIndex = this.p_text.length }
          this.ensureCaretInView()
          this.updateCaretPosition()
          this.showCaret()
          this.updateText()
          break

        case 37:
          this.caretIndex -= 1
          if (this.caretIndex < 0) {
            this.caretIndex = 0
          }
          this.ensureCaretInView()
          this.updateCaretPosition()
          this.showCaret()
          this.updateText()
          break

        default:
      }

      trigger(this.keydown, e)
    }
  }

  /**
   * Ensure the caret is not outside the bounds.
   * @method ensureCaretInView
   * @private
   */
  ensureCaretInView() {
    this.updateCaretPosition()

    while (this.caret.position.x >= this.localWidth - 1) {
      this.scrollIndex += 1
      this.updateCaretPosition()
    }

    while (this.caret.position.x < 0) {
      this.scrollIndex -= 2
      if (this.scrollIndex < 0) { this.scrollIndex = 0 }
      this.updateCaretPosition()
    }
  }

  /**
   * Blur ourself.
   * @method blur
   */
  blur() {
    document.removeEventListener('keydown', this.keyEventClosure)
    document.removeEventListener('keypress', this.keyEventClosure)
    document.removeEventListener('mousedown', this.documentMouseDownClosure)
    window.removeEventListener('blur', this.windowBlurClosure)

    this.hideCaret()
  }

  /**
   * Window blur.
   * @method onDocumentMouseDown
   * @private
   */
  onDocumentMouseDown() {
    if (!this.isFocusClick) {
      this.blur()
    }
  }

  /**
   * Window blur.
   * @method onWindowBlur
   * @private
   */
  onWindowBlur() {
    this.blur()
  }

  /**
   * Update caret Position.
   * @method updateCaretPosition
   * @private
   */
  updateCaretPosition() {
    if (this.caretIndex < this.scrollIndex) {
      this.caret.position.x = -1
      return
    }

    const sub = this.p_text.substring(0, this.caretIndex).substring(this.scrollIndex)
    this.caret.position.x = this.textField.context.measureText(sub).width
  }

  /**
   * Update text.
   * @method updateText
   * @private
   */
  updateText() {
    this.textField.text = this.p_text.substring(this.scrollIndex)
  }

  /**
   * Draw the background and caret.
   * @method drawElements
   * @private
   */
  drawElements() {
    this.backgroundGraphics.clear()
    this.backgroundGraphics.beginFill(this.p_backgroundColor)

    const bgHeight = this.localHeight + (this.p_padding * 2)
    const bgWidth = this.localWidth + (this.p_padding * 2)
    if (this.p_background) {
      this.backgroundGraphics.drawRect(0, 0, bgWidth, bgHeight)
    }

    this.backgroundGraphics.endFill()
    this.backgroundGraphics.hitArea = new Rectangle(0, 0, bgWidth, bgHeight)

    this.textField.x = this.p_padding
    this.textField.y = this.p_padding

    this.textFieldMask.clear()
    this.textFieldMask.beginFill(this.backgroundColor)
    this.textFieldMask.drawRect(this.p_padding, this.p_padding, this.localWidth, this.localHeight)
    this.textFieldMask.endFill()

    this.caret.clear()
    this.caret.beginFill(this.p_caretColor)
    this.caret.drawRect(this.p_padding + 1, this.p_padding + 1, 1, this.localHeight - 2)
    this.caret.endFill()
  }

  /**
   * Show caret.
   * @method showCaret
   * @private
   */
  showCaret() {
    if (this.caretFlashInterval) {
      clearInterval(this.caretFlashInterval)
      this.caretFlashInterval = null
    }

    this.caret.visible = true
    this.caretFlashInterval = setInterval(this.onCaretFlashInterval.bind(this), 500)
  }

  /**
   * Hide caret.
   * @method hideCaret
   * @private
   */
  hideCaret() {
    if (this.caretFlashInterval) {
      clearInterval(this.caretFlashInterval)
      this.caretFlashInterval = null
    }

    this.caret.visible = false
  }

  /**
   * Caret flash interval.
   * @method onCaretFlashInterval
   * @private
   */
  onCaretFlashInterval() {
    this.caret.visible = !this.caret.visible
  }

  /**
   * Map position to caret index.
   * @method getCaretIndexByCoord
   * @private
   */
  getCaretIndexByCoord(x) {
    let smallest = 10000
    let cand = 0
    const visible = this.p_text.substring(this.scrollIndex)

    for (let i = 0; i < visible.length + 1; i += 1) {
      const sub = visible.substring(0, i)
      const w = this.textField.context.measureText(sub).width

      if (Math.abs(w - x) < smallest) {
        smallest = Math.abs(w - x)
        cand = i
      }
    }

    return this.scrollIndex + cand
  }

  /**
   * The width of the PixiTextInput. This is overridden to have a slightly
   * different behaivour than the other DisplayObjects. Setting the
   * width of the PixiTextInput does not change the scale, but it rather
   * makes the field larger. If you actually want to scale it,
   * use the scale property.
   * @property width
   * @type Number
   */
  get width() {
    return this.scale.x * this.getLocalBounds().width
  }

  set width(v) {
    this.localWidth = v
    this.drawElements()
    this.ensureCaretInView()
    this.updateText()
  }

  /**
   * The text in the input field. Setting will have the implicit function of resetting the scroll
   * of the input field and removing focus.
   * @property text
   * @type String
   */
  get text() {
    return this.p_text
  }

  set text(v) {
    this.p_text = v.toString()
    this.scrollIndex = 0
    this.caretIndex = 0
    this.blur()
    this.updateText()
  }

  /**
   * The color of the background for the input field.
   * This needs to be specified as an integer, not using HTML
   * notation, e.g. for red background:
   *
   *     myInputText.backgroundColor = 0xff0000;
   *
   * In order for the background to be drawn, the `background`
   * property needs to be true. If not, this property will have
   * no effect.
   * @property backgroundColor
   * @type Integer
   */
  get backgroundColor() {
    return this.p_backgroundColor
  }

  set backgroundColor(v) {
    this.p_backgroundColor = v
    this.drawElements()
  }

  /**
   * The color of the caret.
   * @property caretColor
   * @type Integer
   */
  get caretColor() {
    return this.p_caretColor
  }

  set caretColor(v) {
    this.p_caretColor = v
    this.drawElements()
  }

  /**
   * The padding
   * @property caretColor
   * @type Integer
   */
  get padding() {
    return this.p_padding
  }

  set padding(padding) {
    this.p_padding = padding
    this.drawElements()
  }

  /**
   * Determines if the background should be drawn behind the text.
   * The color of the background is specified using the backgroundColor
   * property.
   * @property background
   * @type Boolean
   */
  get background() {
    return this.p_background
  }

  set background(v) {
    this.p_background = v
    this.drawElements()
  }

  /**
   * Set text.
   * @method setText
   * @param {String} text The new text.
   */
  setText(v) {
    this.p_text = v
  }

}

class TextInput extends Component {

  static DEFAULT_OPTIONS = {
    padding: 10,
    width: 200,
    textStyle: { fontSize: 15, fill: 0x000000 },
  }

  constructor(text, options) {
    super({ ...TextInput.DEFAULT_OPTIONS, ...options })
    this.input = new PixiTextInput(text, this.options.textStyle)
    this.input.padding = this.options.padding
    this.input.width = this.options.width
    super.add(this.input)
  }

  get text() {
    return this.input.text
  }

  set text(text) {
    this.input.text = text
  }

  get visible() {
    return this.input.visible
  }

  set visible(visible) {
    this.input.visible = visible
  }

}

export default TextInput

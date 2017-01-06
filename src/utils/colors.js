const componentToHex = (c) => {
  const hex = c.toString(16)
  return hex.length === 1 ? `0${hex}` : hex
}

const rgbToHex = (r, g, b) => {
  return componentToHex(r) + componentToHex(g) + componentToHex(b)
}

export const randomColor = () => {
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)

  return parseInt(rgbToHex(red, green, blue), 16)
}

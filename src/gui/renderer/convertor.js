import p2 from 'p2'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

const PHYSIC_GRAPHIC_FACTOR = 100

const convertObject = (obj) => {
  const newObj = {}

  Object.keys(obj).forEach((k) => {
    newObj[k] = obj[k] * PHYSIC_GRAPHIC_FACTOR
  })

  return newObj
}

const convertArray = arr => arr.map(v => v * PHYSIC_GRAPHIC_FACTOR)

const convertBody = (position, size) => {
  const [x, y, w, h] = convertArray(Object.values(position).concat(Object.values(size)))
  return { x, y, w, h }
}

export const convert = (obj) => {
  if (obj instanceof p2.Body) {
    if (obj.type === p2.Body.STATIC) return convertBody(obj.position, obj.shapes[0])
    if (obj.type === p2.Body.DYNAMIC) return convertBody(obj.interpolatedPosition, obj.shapes[0])
  }

  if (isArray(obj)) return convertArray(obj)
  if (isObject(obj)) return convertObject(obj)

  return obj * PHYSIC_GRAPHIC_FACTOR
}

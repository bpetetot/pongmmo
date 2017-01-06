// Random number between min and max
export const random = (min, max) => (Math.random() * (max - min)) + min

// Random integer between min and max
export const randomInt = (min, max) => Math.floor(random(min, max))

import Lobby from './lobby'

export const changeState = (state, name) => {
  if (state) state.destroy()

  let newState
  if (name === Lobby.NAME) {
    newState = new Lobby()
  }

  if (newState) newState.create()

  return newState
}

export Lobby from './lobby'

const UPDATE_PLAYER = 'UPDATE_PLAYER'
const SET_PLAYERS = 'SET_PLAYERS'
const SET_PLAYER = 'SET_PLAYER'
const ADD_PLAYER = 'ADD_PLAYER'

const update = (io, socket, player) => {
  console.log(`Update ${JSON.stringify(player)}`)
  io.emit(UPDATE_PLAYER, player)
}

module.exports = {
  actions: {
    UPDATE_PLAYER,
    SET_PLAYERS,
    SET_PLAYER,
    ADD_PLAYER,
  },
  cb: {
    update,
  },
}

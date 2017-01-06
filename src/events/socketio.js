// Socket.io events
export const CONNECTION = 'connection'
export const DISCONNECT = 'disconnect'

// Client sent events
export const CLIENT_PLAYER_CONNECT = 'CLIENT_PLAYER_CONNECT'
export const CLIENT_START_GAME = 'CLIENT_START_GAME'
export const CLIENT_MOVE = 'CLIENT_MOVE'
export const CLIENT_PONG = 'CLIENT_PONG'

// Server sent events
export const SERVER_SET_STATE = 'SERVER_STATE'
export const SERVER_SET_PLAYER = 'SERVER_SET_PLAYER'
export const SERVER_ADD_PLAYERS = 'SERVER_ADD_PLAYERS'
export const SERVER_START_GAME = 'SERVER_START_GAME'
export const SERVER_SYNCHRONIZE = 'SERVER_SYNCHRONIZE'
export const SERVER_PING = 'SERVER_PING'

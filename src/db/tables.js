import rethink from 'rethinkdb'
import dbAbstract from './dbAbstract'

export const TABLES = {
  GAME: 'game',
  PLAYERS: 'players',
}

export const game = dbAbstract(rethink.table(TABLES.GAME))

export const players = dbAbstract(rethink.table(TABLES.PLAYERS))

import rethink from 'rethinkdb'
import { TABLES } from './constants'
import getConnection from './init'

const table = rethink.table(TABLES.PLAYERS)

export default {
  getAll: async () => {
    const cursor = await table.run(await getConnection())
    return await cursor.toArray()
  },

  update: async (player) => {
    return await table.update(player).run(await getConnection())
  },

  onChange: async (cb) => {
    const cursor = await table.changes().run(await getConnection())
    return await cursor.eachAsync((p) => { cb(p.new_val) })
  },

  insert: async (player) => {
    return await table.insert(player).run(await getConnection())
  },
}

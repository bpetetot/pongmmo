import getConnection from './init'

export default table => ({
  table,

  get: async id => await table.get(id).run(await getConnection()),

  getAll: async () => {
    const cursor = await table.run(await getConnection())
    return await cursor.toArray()
  },

  update: async item => await table.update(item).run(await getConnection()),

  onChange: async (cb) => {
    const cursor = await table.changes().run(await getConnection())
    return await cursor.eachAsync((p) => { cb(p.new_val) })
  },

  insert: async item => await table.insert(item).run(await getConnection()),

  delete: async id => await table.get(id).delete().run(await getConnection()),
})

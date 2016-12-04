import rethink from 'rethinkdb'
import { DEFAULT_OPTIONS, TABLES } from './constants'

const DB_OPTIONS = {
  host: process.env.DB_HOST || DEFAULT_OPTIONS.DB.HOST,
  port: process.env.DB_PORT || DEFAULT_OPTIONS.DB.PORT,
  database: process.env.DB_DATABASE || DEFAULT_OPTIONS.DB.DATABASE,
}

console.log('"options":', JSON.stringify({ db: DB_OPTIONS }, null, 2))

let initiated
let conn

export default async () => {
  if (!initiated) {
    initiated = new Promise(async (resolve) => {
      conn = await rethink.connect(DB_OPTIONS)
      const dbs = await rethink.dbList().run(conn)

      console.log(`[DB] Creating and connection to database ${DB_OPTIONS.database}`)
      if (dbs.includes(DB_OPTIONS.database)) {
        await rethink.dbDrop(DB_OPTIONS.database).run(conn)
      }
      await rethink.dbCreate(DB_OPTIONS.database).run(conn)
      await conn.use(DB_OPTIONS.database)

      const promises = []
      console.log('[DB] Creating tables :')
      for (const table of Object.values(TABLES)) {
        console.log(`[DB] \t- ${table}`)
        promises.push(rethink.tableCreate(table).run(conn))
      }

      await Promise.all(promises)
      resolve()
    })
  }

  await initiated

  return conn
}

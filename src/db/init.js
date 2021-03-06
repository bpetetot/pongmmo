import rethink from 'rethinkdb'
import logger from '../logger'
import { DB_OPTIONS } from '../config'
import { TABLES } from './tables'

logger.debug('"options": %j', { db: DB_OPTIONS })

let initiated
let conn

export default async () => {
  if (!initiated) {
    initiated = new Promise(async (resolve) => {
      conn = await rethink.connect(DB_OPTIONS)
      const dbs = await rethink.dbList().run(conn)

      logger.debug('[DB] Creating and connection to database %s', DB_OPTIONS.database)

      if (dbs.includes(DB_OPTIONS.database)) {
        await rethink.dbDrop(DB_OPTIONS.database).run(conn)
      }
      await rethink.dbCreate(DB_OPTIONS.database).run(conn)
      await conn.use(DB_OPTIONS.database)

      const promises = []
      logger.debug('[DB] Creating tables :')
      for (const table of Object.values(TABLES)) {
        logger.debug('[DB] \t- %s', table)
        promises.push(rethink.tableCreate(table).run(conn))
      }

      await Promise.all(promises)
      resolve()
    })
  }

  await initiated

  return conn
}

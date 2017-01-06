const DEFAULT_OPTIONS = {
  HOST: 'localhost',
  PORT: 28015,
  DATABASE: 'pongmmo',
}

export const DB_OPTIONS = {
  host: process.env.DB_HOST || DEFAULT_OPTIONS.HOST,
  port: process.env.DB_PORT || DEFAULT_OPTIONS.PORT,
  database: process.env.DB_DATABASE || DEFAULT_OPTIONS.DATABASE,
}

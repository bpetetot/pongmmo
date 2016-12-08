import winston from 'winston'
import { LOG_LEVEL } from './config'

winston.level = LOG_LEVEL

export default winston

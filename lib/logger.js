import { pino } from 'pino'
import pinoPretty from 'pino-pretty'

export const createLogger = (config) => {
  const { env } = config
  if (env === 'production') return pino()
  return pino(pinoPretty.default())
}

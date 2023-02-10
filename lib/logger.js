import { Writable } from 'node:stream'

import { pino } from 'pino'
import pinoPretty from 'pino-pretty'

export const createLogger = ({ t, config = {} } = {}) => {
  const { environment } = config
  if (environment === 'production') return pino()
  if (t != null) return createTestLogger({ config, t })
  return pino(pinoPretty.default())
}

const createTestLogger = ({ config, t }) => {
  const stream = new LogStream((data) => {
    const { msg, levelLabel, ...rest } = JSON.parse(data)
    delete rest.time
    delete rest.level
    delete rest.pid
    delete rest.hostname
    t.log(levelLabel.toUpperCase(), msg, rest)
  })
  const logger = pino(
    {
      sync: true,
      mixin(_context, level) {
        return { levelLabel: logger.levels.labels[level] }
      }
    },
    stream
  )
  return logger
}

class LogStream extends Writable {
  constructor(log) {
    super()
    this.log = log
  }

  _write(chunk, encoding, callback) {
    this.log(chunk.toString().trim())
    callback()
  }
}

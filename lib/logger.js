import { Writable } from 'node:stream'

import { pino } from 'pino'
import pinoPretty from 'pino-pretty'

export const createLogger = ({ t, ...config }) => {
  const { environment } = config
  if (environment === 'production') return pino()
  if (t != null) return createTestLogger({ ...config, t })
  return pino(pinoPretty.default())
}

const createTestLogger = ({ t, ...config }) => {
  const stream = new LogStream((...args) => {
    t.log(...args)
  })
  return pino(stream)
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

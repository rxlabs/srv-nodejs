import { Writable } from 'node:stream'

import type { ExecutionContext } from 'ava'
import { type Level, type Logger, type LoggerOptions, pino } from 'pino'
import pinoPretty from 'pino-pretty'

export type { Logger } from 'pino'

interface Options {
  t?: ExecutionContext
  logLevel?: Level
  useProductionLogger?: boolean
}

export const createLogger = ({
  t,
  logLevel = 'info',
  useProductionLogger = false
}: Options = {}): Logger => {
  const options: LoggerOptions = { level: logLevel }
  if (useProductionLogger) return pino(options)
  if (t != null) return createTestLogger(t, options)
  return pino(options, pinoPretty.default())
}

const createTestLogger = (
  t: ExecutionContext,
  options: LoggerOptions
): Logger => {
  const stream = new LogStream((data) => {
    const { msg, levelLabel, ...rest } = JSON.parse(data)
    delete rest.hostname
    delete rest.level
    delete rest.pid
    delete rest.time
    t.log(levelLabel.toUpperCase(), msg, rest)
  })
  const logger: Logger = pino(
    {
      ...options,
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
  #log: (message: string) => void

  constructor(log: (data: string) => void) {
    super()
    this.#log = log
  }

  override _write(
    chunk: Buffer,
    _: BufferEncoding,
    callback: () => void
  ): void {
    this.#log(chunk.toString().trim())
    callback()
  }
}

import type { Server } from 'node:http'
import process, { exit } from 'node:process'
import { setImmediate } from 'node:timers/promises'
import { promisify } from 'node:util'

import { type TerminusOptions, createTerminus } from '@godaddy/terminus'
import { type Logger, pino } from 'pino'
import type { StoppableServer } from 'stoppable'

export type DaemonOptions = Omit<TerminusOptions, 'logger'> & {
  port?: number
  logger?: Logger
}

export class Daemon {
  public port: number

  #started = false
  #server: StoppableServer
  #logger: Logger

  constructor(server: Server, options: DaemonOptions) {
    const { port = 80, logger = pino(), ...lifecycleOptions } = options ?? {}
    this.port = port
    this.#server = withLifecycle(server, logger, lifecycleOptions)
    this.#logger = logger
  }

  get isStarted(): boolean {
    return this.#started
  }

  get isStopped(): boolean {
    return !this.#started
  }

  async start(): Promise<void> {
    if (this.isStarted) throw new Error('Server is already started')
    this.#logger.debug('Starting')
    await new Promise<void>((resolve, reject) => {
      this.#server?.once('error', reject)
      this.#server?.listen(this.port, resolve)
    })
    this.#logger.debug({ port: this.port }, 'Started')
    this.#started = true
  }

  async stop(): Promise<void> {
    if (this.isStopped) throw new Error('Server is already stopped')
    this.#logger.debug('Stopping')
    const stop = promisify(this.#server.stop)
    await stop()
    this.#logger.debug('Stopped')
    this.#started = false
  }
}

const withLifecycle = (
  server: Server,
  logger: Logger,
  lifecycleOptions: TerminusOptions
): StoppableServer => {
  server.on('close', () => {
    logger.debug('Closed')
  })

  process.on('unhandledRejection', (err) => {
    logger.fatal({ err }, 'Unhandled rejection')
    exit(1)
  })

  process.on('uncaughtException', (err) => {
    logger.fatal({ err }, 'Uncaught exception')
    exit(1)
  })

  return createTerminus(server, {
    onShutdown: async () => {
      logger.fatal('Shutdown')
      await setImmediate()
    },
    logger: (msg, err) => {
      logger.error({ err }, msg)
    },
    ...lifecycleOptions
  }) as StoppableServer
}

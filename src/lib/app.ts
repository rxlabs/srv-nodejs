import { type Server, createServer } from 'node:http'

import type { Config } from './config.js'
import { Daemon } from './daemon.js'
import type { Logger } from './logger.js'

export const createApp = (logger: Logger, config: Config): App =>
  new App(logger, config)

class App {
  #daemon?: Daemon
  #config: Config
  #logger: Logger

  constructor(logger: Logger, config: Config) {
    this.#config = config
    this.#logger = logger
  }

  get baseUrl(): string {
    return `http://localhost:${this.#server.port}`
  }

  async start(): Promise<void> {
    await this.#server.start()
  }

  async stop(): Promise<void> {
    await this.#cleanup()
    await this.#server.stop()
  }

  // TODO: Define your request handling here.
  // You can swap out the native Node.js HTTP server with your framework of choice.
  #createServer = (): Server => {
    const server = createServer((req, res) => {
      this.#logger.info(req, 'HTTP Request')
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ data: 'TODO' }))
      this.#logger.info(res, 'HTTP Response')
    })
    return server
  }

  #healthChecks = {
    '/livez': async () => true,
    '/readyz': async () => true
  }

  #cleanup = async (): Promise<void> => {}

  get #server(): Daemon {
    this.#daemon ??= new Daemon(this.#createServer(), {
      signals: ['SIGINT', 'SIGUSR2'],
      onSignal: this.#cleanup,
      healthChecks: this.#healthChecks,
      port: this.#config.port,
      logger: this.#logger
    })
    return this.#daemon
  }
}

export type { App }

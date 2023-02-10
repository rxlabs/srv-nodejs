import { createServer as createHttpServer } from 'node:http'

import { createTerminus } from '@godaddy/terminus'

import { createApp } from './app.js'
import { createHealthChecks } from './health.js'

export const createServer = ({ config, logger }) =>
  new Server({ config, logger })

class Server {
  #server

  constructor({ config, logger }) {
    this.config = config
    this.logger = logger
  }

  get port() {
    return this.config?.port ?? 80
  }

  get origin() {
    return `http://localhost:${this.port}`
  }

  async start() {
    this.#init()
    if (this.#server == null) return
    this.logger.info('Server starting')
    await new Promise((resolve, reject) => {
      this.#server.once('error', reject)
      this.#server.listen(this.port, resolve)
    })
    this.logger.info({ origin: this.origin }, 'Server started')
  }

  async stop() {
    this.logger.fatal('Server stopping')
    await new Promise((resolve) => {
      this.#server?.stop(resolve)
    })
    this.logger.fatal('Server stopped')
  }

  #init = () => {
    if (this.#server != null) return
    const { config, logger } = this
    const app = createApp({ config, logger })
    const server = createHttpServer(app.requestListener)

    createTerminus(server, {
      healthChecks: createHealthChecks({ config, logger }),
      beforeShutdown: () => {
        logger.fatal('Server shutting down')
      },
      onShutdown: () => {
        logger.fatal('Server shut down')
      },
      logger: (msg, err) => {
        logger.error({ err }, msg)
      }
    })

    server.on('close', () => {
      logger.fatal('Server closed')
    })

    this.#server = server
  }
}

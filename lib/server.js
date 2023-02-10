import { createTerminus } from '@godaddy/terminus'
import { createLogger } from 'landlubber'

import { createServerFromApp } from './app.js'
import { createHealthChecks } from './health.js'

export const createServer = ({ config, logger }) =>
  new Server({ config, logger })

class Server {
  #server
  #started = false

  constructor({ config = {}, logger = createLogger() }) {
    this.config = config
    this.logger = logger
    this.#server = getServer({ config, logger })
  }

  get port() {
    return this.config.port ?? 80
  }

  get origin() {
    return `http://localhost:${this.port}`
  }

  get isStarted() {
    return this.#started
  }

  get isStopped() {
    return !this.#started
  }

  async start() {
    if (this.isStarted) return
    this.logger.info('Server starting')
    await new Promise((resolve, reject) => {
      this.#server?.once('error', reject)
      this.#server?.listen(this.port, resolve)
    })
    this.logger.info({ origin: this.origin }, 'Server started')
    this.#started = true
  }

  async stop() {
    if (this.isStopped) return
    this.logger.fatal('Server stopping')
    await new Promise((resolve) => {
      this.#server?.stop(resolve)
    })
    this.logger.fatal('Server stopped')
    this.#started = false
  }
}

const getServer = ({ config, logger }) => {
  const server = createServerFromApp({ config, logger })
  wrapServer(server, { config, logger })
  return server
}

const wrapServer = (server, { config, logger }) => {
  server.on('close', () => {
    logger.fatal('Server closed')
  })
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
}

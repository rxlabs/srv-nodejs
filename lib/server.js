import { createServer as createHttpServer } from 'node:http'

import { createTerminus } from '@godaddy/terminus'

import { createApp } from './app.js'
import { createHealthChecks } from './health.js'

export const createServer = ({ config, logger }) => {
  const port = config.port ?? 80
  const origin = `http://localhost:${port}`

  const app = createApp({ config, logger })
  const server = createHttpServer(app.requestListener)

  // TODO: why no logs on shutdown?
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

  return {
    logger,
    config,
    origin,
    start: async () => {
      logger.info('Server starting')
      await new Promise((resolve, reject) => {
        server.once('error', reject)
        server.listen(port, resolve)
      })
      logger.info({ origin }, 'Server started')
    },
    stop: async () => {
      logger.fatal('Server stopping')
      await new Promise((resolve) => {
        server.stop(resolve)
      })
      logger.fatal('Server stopped')
    }
  }
}

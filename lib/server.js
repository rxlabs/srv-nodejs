import { createServer as createHttpServer } from 'node:http'

import { createTerminus } from '@godaddy/terminus'

import { createApp } from './app.js'
import { createHealthChecks } from './health.js'

export const createServer = ({ logger, ...config }) => {
  const port = config.port ?? 80

  const app = createApp({ ...config, ...logger })
  const server = createHttpServer(app.requestListener)

  const healthChecks = createHealthChecks({ ...config, logger })
  createTerminus(server, {
    healthChecks,
    logger: (msg, err) => logger.error({ err }, msg)
  })

  return {
    logger,
    config,
    origin: `http://localhost:${port}`,
    start: () =>
      new Promise((resolve, reject) => {
        server.once('error', reject)
        server.listen(port, resolve)
      })
  }
}

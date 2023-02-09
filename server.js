import process from 'node:process'

import { createLogger, createServer, getConfig } from './index.js'

try {
  const config = await getConfig(process.env)
  const logger = createLogger(config)
  const server = createServer({ ...config, logger })
  await server.run()
  logger.info(server.origin)
} catch (err) {
  const logger = createLogger()
  logger.error({ err })
  process.exit(1)
}

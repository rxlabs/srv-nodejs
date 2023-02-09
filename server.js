import { env, exit } from 'node:process'

import { createLogger, createServer, getConfig } from './index.js'

try {
  const config = await getConfig(env)
  const logger = createLogger(config)
  const server = createServer({ ...config, logger })
  await server.start()
  logger.info(server.origin)
} catch (err) {
  const logger = createLogger()
  logger.error({ err })
  exit(1)
}

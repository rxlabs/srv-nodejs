import test from 'ava'

import { createLogger, createServer, getConfig } from '../index.js'

test('createHealthChecks: /health', async (t) => {
  const config = await getConfig({ NODE_ENV: 'test' })
  const logger = createLogger({ ...config, t })
  const server = createServer({ ...config, logger })
  logger.info(server.origin)
  t.pass()
})

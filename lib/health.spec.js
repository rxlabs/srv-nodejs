import test from 'ava'

import { createHealthChecks } from './health.js'
import { createLogger } from './logger.js'

test('createHealthChecks: /health', async (t) => {
  const logger = createLogger({ t })
  const healthChecks = createHealthChecks({ logger })
  const check = healthChecks['/health']
  const health = await check()
  t.true(health)
})

import getPort from '@ava/get-port'
import test from 'ava'

import { createLogger } from './logger.js'
import { createServer } from './server.js'

test('createServer: returns server', (t) => {
  const logger = createLogger({ t })
  const server = createServer({ logger, config: {} })
  t.truthy(server.start, 'has start')
  t.truthy(server.start, 'has stop')
  t.truthy(server.config, 'has config')
  t.truthy(server.logger, 'has logger')
  t.is(server.port, 80, 'has port')
  t.is(server.origin, 'http://localhost:80', 'has origin')
})

test('createServer: selects port', (t) => {
  const logger = createLogger({ t })
  const server = createServer({ logger, config: { port: 8080 } })
  t.is(server.origin, 'http://localhost:8080', 'origin uses selected port')
})

test('createServer: start and stop', async (t) => {
  const port = await getPort()
  const logger = createLogger({ t })
  const server = createServer({ logger, config: { port } })
  t.is(server.isStarted, false)
  t.is(server.isStopped, true)

  await server.start()
  t.is(server.isStarted, true)
  t.is(server.isStopped, false)

  await server.stop()
  t.is(server.isStarted, false)
  t.is(server.isStopped, true)
})

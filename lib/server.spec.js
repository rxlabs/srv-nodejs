import test from 'ava'
import { createLogger } from 'landlubber'

import { createServer } from './server.js'

test('createServer: returns server', (t) => {
  const logger = createLogger({ t })
  const server = createServer({ logger })
  t.truthy(server.run, 'has run')
  t.truthy(server.config, 'has config')
  t.truthy(server.logger, 'has logger')
  t.is(server.origin, 'http://localhost:80', 'has origin')
})

test('createServer: selects port', (t) => {
  const logger = createLogger({ t })
  const server = createServer({ logger, port: 8080 })
  t.is(server.origin, 'http://localhost:8080', 'origin uses selected port')
})

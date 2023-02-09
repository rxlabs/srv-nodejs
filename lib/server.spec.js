import test from 'ava'

import { createServer } from './server.js'

test('createApp: returns server', (t) => {
  t.truthy(createServer(), 'returns server')
})

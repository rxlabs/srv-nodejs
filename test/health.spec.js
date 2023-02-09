import test from 'ava'

import { getTestServer } from './fixtures/server.js'

test.afterEach(async (t) => {
  await t.context.server?.stop()
})

test('GET: /health', async (t) => {
  const server = await getTestServer(t)
  await server.start()
  const res = await fetch(`${server.origin}/health`)
  const data = await res.json()
  t.snapshot(data, 'data')
})

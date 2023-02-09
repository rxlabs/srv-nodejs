import test from 'ava'

import { getTestServer } from './fixtures/server.js'

test('GET: /health', async (t) => {
  const server = await getTestServer(t)
  const res = await fetch(`${server.origin}/health`)
  const data = await res.json()
  t.snapshot(data, 'data')
})

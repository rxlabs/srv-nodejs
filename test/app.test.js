import test from 'ava'

import { getTestServer } from './fixtures/server.js'

test('GET: /', async (t) => {
  const server = await getTestServer(t)
  const res = await fetch(`${server.origin}/`)
  const data = await res.json()
  t.deepEqual(data, { ok: true })
})

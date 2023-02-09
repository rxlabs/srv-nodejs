import test from 'ava'

import { getTestServer } from './fixtures/server.js'

test('GET: /', async (t) => {
  const server = await getTestServer()
  const res = await fetch(`${server.origin}/`)
  const data = await res.json()
  t.deepEqual(data, {}, 'data')
})

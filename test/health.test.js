import test from 'ava'

import { getConfig } from '../index.js'

test.beforeEach(async (t) => {
  const { port } = await getConfig()
  t.context.got = { port }
})

test('get health', async (t) => {
  const { got } = t.context
  const res = await got.get('health')
  t.snapshot(res)
})

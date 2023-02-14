import test from 'ava'

import { getTestApp } from './fixtures/app.js'

test('GET: /livez', async (t) => {
  const app = await getTestApp(t)
  const res = await fetch(`${app.baseUrl}/livez`)
  t.true(res.ok)
})

test('GET: /readyz', async (t) => {
  const app = await getTestApp(t)
  const res = await fetch(`${app.baseUrl}/readyz`)
  t.true(res.ok)
})

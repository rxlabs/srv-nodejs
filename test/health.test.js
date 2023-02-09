import { env } from 'node:process'

import test from 'ava'

import { createLogger, createServer, getConfig } from '../index.js'

test.beforeEach(async (t) => {
  const config = await getConfig(env)
  t.context.config = config
  t.context.createServer = (t) =>
    createServer({ ...config, logger: createLogger(t) })
})

test('get health', async (t) => {
  const server = t.context.createServer(t)
  server.run()
  const res = await fetch(`${server.origin}/health`)
  const data = await res.json()
  t.snapshot(data)
})

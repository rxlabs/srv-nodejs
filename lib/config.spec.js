import test from 'ava'

import { getConfig } from './config.js'

test('getConfig: production environment', async (t) => {
  const config = await getConfig({ NODE_ENV: 'production' })
  t.is(config.environment, 'production')
})

test('getConfig: test environment', async (t) => {
  const config = await getConfig({ NODE_ENV: 'test' })
  t.is(config.environment, 'test')
})

test('getConfig: development environment', async (t) => {
  const config = await getConfig({ NODE_ENV: 'foo' })
  t.is(config.environment, 'development')
})

test('getConfig: port', async (t) => {
  const config = await getConfig({ PORT: '1234' })
  t.is(config.port, 1234)
})

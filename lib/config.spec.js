import test from 'ava'

import { getConfig } from './config.js'

test('getConfig: production env', async (t) => {
  const config = await getConfig({ NODE_ENV: 'production' })
  t.is(config.env, 'production')
})

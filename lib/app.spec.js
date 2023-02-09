import test from 'ava'

import { createApp } from './app.js'
import { createLogger } from './logger.js'

test('createApp: /', async (t) => {
  t.plan(4)
  const logger = createLogger({ t })
  const app = createApp({ logger })
  const res = {
    end: (data) => {
      t.is(data, '{"ok":true}')
    },
    setHeader: (name, value) => {
      t.is(name, 'Content-Type', 'sets content type header')
      t.is(value, 'application/json', 'uses json content type')
    }
  }
  app.requestListener({}, res)
  t.is(res.statusCode, 200, 'sets status code')
})

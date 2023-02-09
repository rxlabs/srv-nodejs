import test from 'ava'

import { createApp } from './app.js'

test('createApp: returns app', (t) => {
  t.truthy(createApp(), 'returns app')
})

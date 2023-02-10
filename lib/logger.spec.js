import test from 'ava'

import { createLogger } from './logger.js'

test('createLogger: returns logger', (t) => {
  const logger = createLogger({ t })
  logger.info({ foo: 'bar' }, 'AVA t.log')
  t.truthy(createLogger(), 'development environment')
  t.truthy(
    createLogger({ config: { environment: 'production' } }),
    'production environment'
  )
})

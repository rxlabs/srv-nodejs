import { env } from 'node:process'

import getPort from '@ava/get-port'

import { createLogger, createServer, getConfig } from '../../index.js'

export const getTestServer = async (t) => {
  const PORT = env.PORT ?? (await getPort())
  const config = await getConfig({ PORT, ...env })
  const logger = createLogger({ config, t })
  const server = createServer({ config, logger })
  t.context.server = server
  return server
}

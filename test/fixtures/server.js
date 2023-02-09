import { env } from 'node:process'

import getPort from '@ava/get-port'

import { createLogger, createServer, getConfig } from '../../index.js'

export const getTestServer = async (t) => {
  const port = await getPort()
  const config = await getConfig({ PORT: port, ...env })
  const logger = createLogger({ t })
  return createServer({ ...config, logger })
}

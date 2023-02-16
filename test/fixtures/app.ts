import { argv, env } from 'node:process'

import getPort from '@ava/get-port'
import type { ExecutionContext } from 'ava'

import { type App, createApp, createLogger, getConfig } from 'index.js'

export const startTestApp = async (t: ExecutionContext): Promise<App> => {
  const app = await getTestApp(t)
  await app.start()
  t.teardown(async () => {
    await app.stop()
  })
  return app
}

export const getTestApp = async (t: ExecutionContext): Promise<App> => {
  const port = await getPort()
  const config = await getConfig({
    ...env,
    NODE_ENV: 'test',
    PORT: argv.includes('--smoke') ? env['PORT'] : port.toString()
  })
  const logger = createLogger({ ...config, t })
  const app = createApp(logger, config)
  return app
}

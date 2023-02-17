#!/usr/bin/env node

import { argv, env, exit } from 'node:process'

import yargs from 'yargs'

import { createApp, createLogger, getConfig } from './index.js'

const args = await yargs(argv.slice(2))
  .describe('production', 'Run in production mode')
  .describe('test', 'Run in test mode')
  .boolean(['production', 'test'])
  .conflicts('production', 'test')
  .middleware((argv) => {
    const NODE_ENV = ['production', 'test'].find((k) => argv[k])
    argv['NODE_ENV'] = NODE_ENV ?? env['NODE_ENV']
  })
  .check((argv) => {
    const NODE_ENV = argv['NODE_ENV'] as string | undefined
    if (NODE_ENV == null) return true
    if (env['NODE_ENV'] == null) return true
    if (NODE_ENV !== env['NODE_ENV']) {
      throw new Error(
        `Cannot use --${NODE_ENV} with NODE_ENV=${env['NODE_ENV']}`
      )
    }
    return true
  })
  .strict().argv

try {
  const NODE_ENV = args['NODE_ENV'] as string | undefined
  const config = await getConfig({ ...env, NODE_ENV })
  const logger = createLogger(config)
  const app = createApp(logger, config)
  await app.start()
  logger.info(`Server: ${app.baseUrl}`)
} catch (err) {
  const logger = createLogger()
  logger.fatal({ err }, 'Server: failed to start')
  exit(1)
}

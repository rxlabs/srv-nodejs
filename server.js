#!/usr/bin/env node

import { argv, env, exit, on } from 'node:process'

import { createLogger, createServer, getConfig } from './index.js'

try {
  if (argv.includes('--test')) env.NODE_ENV = 'test'
  const config = await getConfig(env)
  const logger = createLogger(config)

  on('unhandledRejection', (err) => {
    logger.fatal({ err }, 'Unhandled rejection')
  })

  on('uncaughtException', (err) => {
    logger.fatal({ err }, 'Uncaught exception')
  })

  const server = createServer({ config, logger })
  await server.start()
} catch (err) {
  const logger = createLogger()
  logger.error({ err })
  exit(1)
}

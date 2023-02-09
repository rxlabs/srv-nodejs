#!/usr/bin/env node

import { argv, env, exit } from 'node:process'

import { createLogger, createServer, getConfig } from './index.js'

try {
  if (argv.includes('--test')) env.NODE_ENV = 'test'
  const config = await getConfig(env)
  const logger = createLogger(config)
  const server = createServer({ ...config, logger })
  await server.start()
} catch (err) {
  const logger = createLogger()
  logger.error({ err })
  exit(1)
}

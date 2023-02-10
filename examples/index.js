#!/usr/bin/env node

import { env } from 'node:process'

import landlubber, { defaultMiddleware } from 'landlubber'

import { createLogger, createServer, getConfig } from '../index.js'

import * as health from './health.js'

const commands = [health]

const createServerContext = async (argv) => {
  const config = await getConfig(env)
  const logger = createLogger(config)
  argv.server = createServer({ config, logger })
}

const middleware = [...defaultMiddleware, createServerContext]

await landlubber(commands, { middleware }).parse()

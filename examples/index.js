#!/usr/bin/env node

import { env } from 'node:process'

import landlubber, { defaultMiddleware } from 'landlubber'

import { createApp, createLogger, getConfig } from '../index.js'

import * as health from './health.js'

const commands = [health]

const createAppContext = async (argv) => {
  const config = await getConfig(env)
  const logger = createLogger({ config })
  argv.app = createApp({ config, logger })
}

const middleware = [...defaultMiddleware, createAppContext]

await landlubber(commands, { middleware }).parse()

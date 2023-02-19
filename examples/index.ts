#!/usr/bin/env tsx

import { env } from 'node:process'

import landlubber, {
  type DefaultContext,
  type Handler as DefaultHandler,
  type EmptyOptions,
  type MiddlewareFunction,
  defaultMiddleware
} from 'landlubber'

import { type App, createApp, createLogger, getConfig } from 'index.js'

import * as health from './health.js'

export type Handler<Options = EmptyOptions> = DefaultHandler<Options, Context>

type Context = DefaultContext & AppContext

interface AppContext {
  app: App
}

const commands = [health]

const createAppContext: MiddlewareFunction = async (argv) => {
  const config = await getConfig(env)
  const logger = createLogger(config)
  const app = createApp(logger, config)
  if (argv['start'] === true) await app.start()
  argv['app'] = app
}

const middleware = [...defaultMiddleware, createAppContext]

const args = await landlubber<Context>(commands, { middleware })
  .describe('start', 'Run server during execution')
  .boolean('start')
  .default('start', false)
  .parse()

if (args.start) await (args['app'] as App)?.stop()

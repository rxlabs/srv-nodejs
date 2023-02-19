import type { Builder, Command, Describe } from 'landlubber'

import type { Handler } from './index.js'

interface Options {
  check: string
}

export const command: Command = 'health [check]'

export const describe: Describe = 'Check health'

export const builder: Builder = {
  check: {
    type: 'string',
    default: 'readyz',
    describe: 'Health check'
  }
}

export const handler: Handler<Options> = async ({ check, app, logger }) => {
  const res = await fetch(`${app.baseUrl}/${check}`)
  const body = await res.json()
  logger.info({ body }, `GET /${check}`)
}

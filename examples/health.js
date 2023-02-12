export const command = 'health [check]'

export const describe = 'Check health'

export const builder = {
  check: {
    type: 'string',
    default: '',
    describe: 'Health check'
  },
  start: {
    type: 'boolean',
    default: false,
    describe: 'Start a local server for the duration of execution'
  }
}

export const handler = async ({ check, app, start, logger }) => {
  if (start) await app.start()
  const res = await fetch(`${app.baseUrl}/health`)

  if (!res.ok) {
    logger.error({ res }, 'Health check failed')
    return
  }

  const data = await res.json()
  logger.info({ data }, check)
  if (start) await app.stop()
}

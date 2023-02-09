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

export const handler = async ({ check, server, start, logger }) => {
  if (start) await server.start()
  const res = await fetch(`${server.origin}/health`)
  const data = await res.json()
  logger.info({ data }, check)
  if (start) await server.stop()
}

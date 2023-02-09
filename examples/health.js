export const command = 'health [check]'

export const describe = 'Check health'

export const builder = {
  check: {
    type: 'string',
    default: '',
    describe: 'Health check'
  }
}

export const handler = async ({ check, server, logger }) => {
  const res = await fetch(`${server.origin}/health`)
  const data = await res.json()
  logger.info({ data }, check)
}

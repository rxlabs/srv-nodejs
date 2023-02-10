export const createHealthChecks = ({ config, logger }) => ({
  '/health': async () => true
})

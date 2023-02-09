export const createHealthChecks = ({ logger, ...config }) => ({
  '/health': async () => true
})

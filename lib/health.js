export const createHealthChecks = ({ logger, ...config }) => ({
  '/health': () => true
})

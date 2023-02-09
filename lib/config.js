export const getConfig = async (env) => ({
  port: getPort(env),
  env: getEnv(env)
})

const getEnv = (env) => {
  if (isProduction(env)) return 'production'
  if (isTest(env)) return 'test'
  return 'development'
}

const getPort = (env) => {
  if (env.PORT != null) return Number(env.port)
  if (isProduction(env)) return 8080
  if (isTest(env)) return 4000
  return 3000
}

const isTest = (env) => env.NODE_ENV === 'test'

const isProduction = (env) => env.NODE_ENV === 'production'

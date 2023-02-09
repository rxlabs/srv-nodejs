export const getConfig = async (env) => ({
  port: getPort(env)
})

const getPort = (env) => {
  if (env.PORT != null) return Number(env.port)
  if (isProduction(env)) return 8080
  if (isDevelopment(env)) return 3000
  if (isTest(env)) return 4000
}

const isTest = (env) => env.NODE_ENV === 'test'
const isProduction = (env) => env.NODE_ENV === 'production'
const isDevelopment = (env) => !(isProduction(env) || isTest(env))

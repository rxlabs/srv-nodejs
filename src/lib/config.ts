export interface Config {
  logLevel: any
  useProductionLogger: boolean
  port: number
}

type Env = Record<string, string | undefined> & {
  NODE_ENV?: string | undefined
  PORT?: string | undefined
  LOG_LEVEL?: string | undefined
}

export const getConfig = async (env: Env): Promise<Config> => ({
  logLevel: env.LOG_LEVEL ?? 'info',
  useProductionLogger: isProduction(env),
  port: getPort(env)
})

const getPort = (env: Env): number => {
  if (env.PORT != null) return Number(env.PORT)
  if (isProduction(env)) return 8080
  if (isTest(env)) return 4000
  return 3000
}

const isTest = (env: Env): boolean => env.NODE_ENV === 'test'

const isProduction = (env: Env): boolean => env.NODE_ENV === 'production'

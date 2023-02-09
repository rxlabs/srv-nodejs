import { argv, env } from 'node:process'

import { getPort } from './lib/config.js'

export default () => {
  env.NODE_ENV = 'test'
  const isSmokeTest = argv.includes('--smoke')
  if (isSmokeTest) env.PORT ??= getPort(env)
  const ext = isSmokeTest ? 'test' : 'spec'
  return {
    ignoredByWatcher: ['tmp/**/*'],
    files: [`**/*.${ext}.js`, '!package/**/*']
  }
}

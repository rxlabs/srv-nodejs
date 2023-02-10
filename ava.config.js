import { argv, env } from 'node:process'

export default () => {
  const isSmokeTest = argv.includes('--smoke')
  if (isSmokeTest) env.NODE_ENV = 'test'
  const ext = isSmokeTest ? 'test' : 'spec'
  return {
    ignoredByWatcher: ['tmp/**/*'],
    files: [`**/*.${ext}.js`, '!package/**/*']
  }
}

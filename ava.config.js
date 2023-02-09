import { env } from 'node:process'

export default () => {
  const ext = isTrue(env.SYSTEM_TEST) ? 'test' : 'spec'
  return {
    ignoredByWatcher: ['tmp/**/*'],
    files: [`**/*.${ext}.js`, '!package/**/*']
  }
}

const isTrue = (value) => ['true', '1'].includes(value?.toLowerCase())

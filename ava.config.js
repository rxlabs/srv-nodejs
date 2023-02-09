import process from 'node:process'

export default () => {
  const ext = isTrue(process.env.SYSTEM_TEST) ? 'test' : 'spec'
  return {
    ignoredByWatcher: ['tmp/**/*'],
    files: [`**/*.${ext}.js`, '!package/**/*']
  }
}

const isTrue = (value) => ['true', '1'].includes(value?.toLowerCase())

import process, { argv } from 'node:process'

export default () => {
  // UPSTREAM: https://nodejs.org/docs/latest-v18.x/api/esm.html#loaders
  process.env.NODE_NO_WARNINGS = '1'

  const ext = argv.includes('--smoke') ? 'test' : 'spec'
  return {
    ignoredByWatcher: ['tmp/**/*'],
    files: [`**/*.${ext}.ts`, '!package/**/*'],
    extensions: {
      ts: 'module'
    },
    nodeArguments: ['--loader=tsx']
  }
}

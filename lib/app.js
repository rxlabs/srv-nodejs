import { createServer } from 'node:http'

export const createApp = ({ config, logger }) => ({
  requestListener
})

export const createServerFromApp = (app) => createServer(app.requestListener)

const requestListener = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ ok: true }))
}

import { createServer } from 'node:http'

export const createApp = ({ config, logger }) => ({
  requestListener: createRequestListener({ config, logger })
})

export const createServerFromApp = (app) => createServer(app.requestListener)

const createRequestListener =
  ({ config, logger }) =>
  (req, res) => {
    logger.info(req, 'HTTP Request')
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: true }))
    logger.info(res, 'HTTP Response')
  }

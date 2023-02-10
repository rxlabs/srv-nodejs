export const createApp = ({ config, logger }) => ({
  requestListener
})

const requestListener = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ ok: true }))
}

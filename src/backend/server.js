const path = require('path')
const express = require('express')
const _localIp = require('ip')
const _publicIp = require('public-ip')

const router = express.Router()

router.use(express.json())
router.use(express.static(path.join(__dirname, '..', '..', 'dist')))

router.post('/get-public-ip', async (req, res) => {
  const publicIp = await _publicIp.v4()
  const result = { publicIp }
  res.json(result)
})

router.post('/coming-request', (req, res) => {
  res.json({ pong: true })
})

router.get('*', (req, res) => {
  const localIp = _localIp.address()
  const port = req.headers.host.split(':')[1]

  res.render('index', {
    defaults: {
      localIp,
      port
    }
  })
})

module.exports = router

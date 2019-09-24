const path = require('path')
const express = require('express')
const axios = require('axios')
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

router.post('/connect-to-ip', async (req, res) => {
  const result = {
    success: false,
    validations: {}
  }

  try {
    const urlToConnect = `http://${req.body.partnerIp}/coming-request`
    const _ping = await axios.post(urlToConnect, { ping: true })
    const ping = _ping.data

    if (ping.pong) {
      result.success = true
    } else {
      result.validations.partnerIp = 'Cannot connect'
    }
  } catch (e) {
    result.validations.partnerIp = e.message
  }

  res.json(result)
})

router.get('*', (req, res) => {
  const localIp = _localIp.address()
  /* const port = server.address().port */
  /* pass this value with a middleware */
  const port = req.headers.host.split(':')[1]

  res.render('index', {
    defaults: {
      localIp,
      port
    }
  })
})

module.exports = router

const axios = require('axios')
const _publicIp = require('public-ip')

const socket = io => {
  io.on('connection', client => {
    client.on('get-public-ip', async data => {
      const result = { success: false }
      const publicIp = await _publicIp.v4()
      result.success = true
      result.publicIp = publicIp
      client.emit('get-public-ip', result)
    })

    client.on('connect-to-partner', async data => {
      const result = { success: false }

      try {
        const urlToConnect = `http://${data.partnerIp}/coming-request`
        const _ping = await axios.post(urlToConnect, { ping: true })
        const ping = _ping.data

        if (ping.pong) {
          result.success = true
        } else {
          result.error = 'Cannot connect'
        }
      } catch (e) {
        result.error = e.message
      }

      client.emit('connect-to-partner', result)
    })
  })
}

module.exports = socket

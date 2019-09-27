const axios = require('axios')

const socket = io => {
  io.on('connection', client => {
    client.on('coming-request', async data => {
    })

    client.on('connect-to-partner', async data => {
      const result = {
        success: false
      }

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

const socket = io => {
  console.log('hey')
  io.on('connection', (client) => {
    client.on('event1', (comingData) => {
      console.log('coming data from client to server:', comingData)
      client.emit('event2', 'sending data from server to client')
    })
  })
}

module.exports = socket

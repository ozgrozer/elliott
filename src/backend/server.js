const path = require('path')
const express = require('express')
const _localIp = require('ip')
const _publicIp = require('public-ip')

const app = express()
app.use(express.json())
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '..', 'frontend', 'html'))
app.use(express.static(path.join(__dirname, '..', '..', 'dist')))

const server = app.listen(process.env.PORT || 0, () => {
  console.log('Example app listening on port http://localhost:' + server.address().port)
})

app.post('/get-public-ip', async (req, res) => {
  const publicIp = await _publicIp.v4()
  const result = { publicIp }
  res.json(result)
})

app.post('/connect-to-ip', async (req, res) => {
  const result = {
    success: false,
    validations: {}
  }
  result.validations.partnerIp = 'Cannot connect'
  res.json(result)
})

app.get('*', (req, res) => {
  const localIp = _localIp.address()
  const port = server.address().port

  res.render('index', {
    defaults: {
      localIp,
      port
    }
  })
})

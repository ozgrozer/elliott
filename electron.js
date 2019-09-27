const { app, BrowserWindow } = require('electron')
const path = require('path')
const express = require('express')
const expressApp = express()
const server = require('http').createServer(expressApp)
const io = require('socket.io')(server)
require('./src/backend/socket')(io)

const serverRoutes = require('./src/backend/server')
expressApp.use('/', serverRoutes)
expressApp.set('view engine', 'pug')
expressApp.set('views', path.join(__dirname, 'src', 'frontend', 'html'))

let port = ''
const _server = server.listen(process.env.PORT || 0, () => {
  port = _server.address().port
  console.log('Example app listening on port http://localhost:' + port)
})

let win

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 500,
    show: false,
    titleBarStyle: 'hidden'
  })
  win.loadURL('http://localhost:' + port)
  win.once('ready-to-show', () => {
    win.show()
  })
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  app.quit()
})

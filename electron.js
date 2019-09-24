const { app, BrowserWindow } = require('electron')
const path = require('path')
const express = require('express')

const serverRoutes = require('./src/backend/server')
const expressApp = express()
expressApp.use('/', serverRoutes)
expressApp.set('view engine', 'pug')
expressApp.set('views', path.join(__dirname, 'src', 'frontend', 'html'))

let port = ''
const server = expressApp.listen(process.env.PORT || 0, () => {
  port = server.address().port
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

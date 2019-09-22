const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
let win

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 500,
    show: false,
    titleBarStyle: 'hiddenInset'
  })
  win.loadURL(isDev ? 'http://localhost:1234' : `file://${__dirname}/public/index.html`)
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

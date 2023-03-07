const { app, BrowserWindow, ipcMain, shell } = require('electron')
const path = require('path')

app.disableHardwareAcceleration()

//MAIN WINDOW
let mainWindow

let createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, './preload.js'),
    },
  })

  mainWindow.loadFile('index.html')

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  mainWindow.on('closed', () => (mainWindow = null))
}

app.whenReady().then(() => {
  createMainWindow()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createMainWindow()
})

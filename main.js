const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let win

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile("index.html")
}

app.whenReady().then(() => {
    createWindow()
})

ipcMain.on('chiudi', (e, data) => {
    console.log(data)
    win.webContents.send('risposta', {nome:"marco", cognome:"verdi"})
})
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const webp = require('webp-converter');
webp.grant_permission();

let win

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, "preload.js")
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})

ipcMain.on("send-image", () => {
    const result = webp.cwebp("_R001096.jpg", "_R001096.webp", "-q 80", logging = "-v");
    result.then((response) => {
        console.log(response)
        win.webContents.send("convert-image");
    });
})

ipcMain.on("minimize", () => {
    win.minimize()
})
ipcMain.on("maximize", () => {
    if (win.isMaximized()) {
        win.restore()
    } else {
        win.maximize()
    }   
})
ipcMain.on("close", () => {
    win.close()
})
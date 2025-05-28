const { app, BrowserWindow, ipcMain, Menu, MenuItem, Tray, nativeImage } = require('electron');
const path = require('path');


let win
let secondWin
let tray

const template = [
    { label: "prova", click: mandaEvento },
    {
        label: "About",
        submenu: [
            {
                label: "About",
                submenu: [
                    { label: "About", accelerator: "Alt+Ctrl+A", id: "about" },
                    { label: "About" }
                ]
            },
            { type: "separator" },
            { label: "Quit", click: () => mandaEvento }
        ]
    },
    { label: "Quit", role: "minimize" }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, "preload.js")
        }
    })

    win.loadFile('index.html')
    win.on('minimize', (e) => {
        e.preventDefault()
        win.setSkipTaskbar(true)
    })
}

app.whenReady().then(() => {
    createWindow()
    const icon = nativeImage.createFromPath("pngegg.png")
    const contextMenu = Menu.buildFromTemplate([{
        label: "chiudi", role: "quit"
    }])
    tray = new Tray(icon)
    tray.setContextMenu(contextMenu)
    tray.setToolTip("tool tip")
    tray.setTitle("title")
    tray.on ("double-click",()=>{
        win.show()
    })
})

ipcMain.on("segunda", () => {
    secondWin.close()
    secondWin = null
    win.webContents.send("primera")
})

function mandaEvento() {
    secondWin = new BrowserWindow({
        modal: true,
        parent: win,
        width: 400,
        height: 200,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, "preload.js")
        }
    })
    secondWin.loadFile("form.html")
}

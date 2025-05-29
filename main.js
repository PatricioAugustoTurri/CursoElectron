const electron = require("electron")
const { app, BrowserWindow, ipcMain, Menu, MenuItem, Tray, nativeImage, Notification } = require('electron');
const path = require('path');
const contextMenu = require('electron-context-menu').default

contextMenu({
    showSaveImageAs: true
});

let win
let secondWin
let tray

const template = [
    { label: "prova", click: mandaEvento },
    {
        label: "About", submenu: [
            {
                label: "About", submenu: [
                    { label: "About", accelerator: "Alt+Ctrl+A", id: "about" },
                    { label: "About" }
                ]
            },
            { type: "separator" },
            { label: "Quit", click: mandaEvento }
        ]
    },
    { label: "Quit", role: "quit" }
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
    app.setAppUserModelId("com.PatoTurri") // para que la notificacion aparezca en la barra de tareas
    createWindow()

    const icon = nativeImage.createFromPath("pngegg.png")
    const menuBajo = Menu.buildFromTemplate([
        { label: "chiudi", role: "quit" }
    ])

    tray = new Tray(icon)
    tray.setContextMenu(menuBajo)
    tray.setToolTip("tool tip")
    tray.setTitle("title")
    tray.on("double-click", () => {
        win.show()
    })
})

ipcMain.on("segunda", () => {
    secondWin.close()
    secondWin = null
    win.webContents.send("primera")
})
ipcMain.on("notificacion", () => {
    const notifica = new Notification({
        title:"Increible",
        body:"El cuerpo de Pato es increible",
        icon: "pngegg.png"
    })
    notifica.show()
    notifica.on ("close", ()=>{
        console.log("close notificacion")
    })
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


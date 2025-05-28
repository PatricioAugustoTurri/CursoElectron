const { app, BrowserWindow, ipcMain, Menu, MenuItem } = require('electron');
const path = require('path');

let win

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
}

app.whenReady().then(() => {
    createWindow()
})

function mandaEvento() {
    //win.webContents.openDevTools()
    //win.webContents.send("provaMenu")
    menu.getMenuItemById("about").enabled = false
}

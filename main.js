const path = require('path')
const url = require('url')
const {app, BrowserWindow} = require('electron')

let win

function main() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: __dirname + "/img/snake_wild_32x32.png"
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    //win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

app.whenReady().then(() => {
    main()
})

app.on('window-all-closed', () => {
    app.quit()
})
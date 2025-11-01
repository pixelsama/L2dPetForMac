const {WindowsManager} = require("./WindowsManager");

class Menus {
    static create_menu() {
        app.dock.hide()
        let icon_path = 'app/res/image/icon_16x16@2x.png'
        const {Tray, Menu} = require('electron')
        global.tray = new Tray(icon_path)

        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Show / Hide',
                type: 'normal',
                click:()=>{
                    const win = WindowsManager.getMain();
                    if (!win) {
                        return;
                    }
                    if (win.isVisible()) {
                        win.hide();
                    } else {
                        win.show();
                    }
                }
            },
            {
                label: 'Toggle DevTools',
                type: 'normal',
                click:()=>{
                    const win = WindowsManager.getMain();
                    if (!win) {
                        return;
                    }
                    if (win.webContents.isDevToolsOpened()) {
                        win.webContents.closeDevTools();
                    } else {
                        win.webContents.openDevTools({mode: 'detach', activate: false});
                    }
                }
            },
            {
                label: 'Quit',
                type: 'normal',
                click:()=>{
                    app.exit()
                }
            },
        ])
        // tray.setToolTip('This is my application.')
        // tray.setTitle("\u001b[34m")
        tray.setContextMenu(contextMenu)
    }
}

module.exports  = {
    Menus
}

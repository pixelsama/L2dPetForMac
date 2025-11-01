// 在主进程中.

const {ipcMain} = require("electron");
const {MainWindow} = require("./job/MainWindow");

class IpcMainServer {

    /**
     * 开启监听.
     */
    static on() {
        [
            MainWindow.show_inactive,
            MainWindow.focus,
            MainWindow.open_ignore_mouse_events,
            MainWindow.close_ignore_mouse_events,
            MainWindow.get_position,
        ].forEach((handler) => {
            this.bind(MainWindow.name, handler);
        });
    }

    /**
     * @private
     */
    static bind(name, func) {
        console.log('on ipc listen', name + "-" + func.name)
        ipcMain.on(name + "-" + func.name, func)
    }
}

module.exports = {
    IpcMainServer
}

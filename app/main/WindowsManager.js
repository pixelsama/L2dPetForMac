/**
 * 窗口管理类
 */
class WindowsManager {
    static #windows = {}

    /**
     * 初始化主窗口
     */
    static init() {
        const {PanelWindow} = require('../../panel')
        const mainWindow = new PanelWindow({
            // center: true,
            width: 600,
            height: 600,
            x: 1300,
            y: 800,
            show: true,
            // minimizable: false,
            // resizable: true,
            // fullscreen: true,
            frame: false,
            transparent: true,
            hasShadow: false,

            webPreferences: {
                nodeIntegration: true,// 主线程的node
                enableRemoteModule: true,
                contextIsolation:false,
                nodeIntegrationInWorker: true,// worker内使用node
                // preload: 'app/preload.js'//18版本必须是绝对路径
            }
        })
        // 屏蔽安全策略
        process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

        console.log(mainWindow.id, '窗口id')
        // mainWindow.maximize();
        // 所有工作空间中显示
        mainWindow.setVisibleOnAllWorkspaces(true);
        // mainWindow.setAlwaysOnTop(true)
        let file = 'app/renderer/views/index.html';
        mainWindow.loadFile(file).finally(function () {
            // mainWindow.showInactive()
        })
        this.#windows['main'] = mainWindow
    }

    /**
     * 获取window主窗口
     * @returns {PanelWindow}
     */
    static getMain(){
        return this.#windows['main'];
    }
}

module.exports = {
    WindowsManager
}

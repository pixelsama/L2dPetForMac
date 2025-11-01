
/**
 * 管理应用生命周期类
 */
class Main {
    constructor() {
        console.log('启动')
        // 启动应用加载越少越好
        const {app, globalShortcut} = require('electron')
        global.app = app;
        global.globalShortcut = globalShortcut;
        console.log('当前版本号', app.getVersion())

        // 可以异步初始化的东西
        this.init_async()

        // 启动应用
        app.whenReady()
            .then(this.init)
            .then(this.start);

        app.on('before-quit',function (){
            console.log('退出前准备')
            if (global.ioHook) {
                global.ioHook.stop();
            }
        })

    }

    /**
     * 异步加载
     */
    init_async() {
        setTimeout(function () {
            const {IpcMainServer} = require("./ipc/IpcMainServer");
            IpcMainServer.on()
        })

        setTimeout(function (){
            try {
                const ioHook = require('iohook');
                ioHook.start(false);
                global.ioHook = ioHook;
                ioHook.on('mousemove', (type)=>{
                    if (global.WindowsManager && global.WindowsManager.getMain()){
                        global.WindowsManager.getMain().webContents.send('my_on_drag',{
                            screenX:type.x,
                            screenY:type.y
                        })
                    }
                });
            } catch (error) {
                console.warn('iohook unavailable, skipping global mouse tracking', error.message);
            }
        },1000);
    }

    /**
     * 这个方法将在完成时被调用
     * 初始化，并准备创建浏览器窗口。
     * 有些api只能在此事件发生后使用。
     */
    init() {
        console.log('AppPath:', global.app.getAppPath());
        console.log('UserData:', global.app.getPath('userData'));

        const {WindowsManager} = require("./WindowsManager");
        global.WindowsManager = WindowsManager;
        WindowsManager.init();
    }

    /**
     * 初始化完成走start
     */
    start() {
        const {Menus} = require("./Menus");
        Menus.create_menu()

        globalShortcut.register('CommandOrControl+P', () => {
            // WindowsManager.getMain().webContents.send('', {state: 1})
            let win = global.WindowsManager.getMain();
            if (win.isVisible()) {
                win.hide();
            } else {
                win.show();
            }
        })
        globalShortcut.register('CommandOrControl+O', () => {
            // WindowsManager.getMain().webContents.send('', {state: 1})
            const win = global.WindowsManager.getMain();
            if (win.webContents.isDevToolsOpened() === true) {
                win.webContents.closeDevTools();
            } else {
                win.webContents.openDevTools({mode: 'detach', activate: false});
            }
        })
    }
}

module.exports = {
    Main
}

class MainWindow{
    static name = 'main_window';

    /**
     * 显示主窗口但不聚焦
     */
    static show_inactive(){
        global.WindowsManager.getMain().showInactive();
    }

    /**
     * 返回当前窗口位置
     * @param event
     * @param arg
     */
    static get_position(event, arg){
        event.returnValue = global.WindowsManager.getMain().getPosition();
    }
    /**
     * 焦点
     * @param event
     * @param arg
     */
    static focus(event, arg) {
        global.WindowsManager.getMain().focus()
        event.returnValue = 0;
    }

    /**
     * 忽略操作事件
     * @param event
     * @param arg
     */
    static open_ignore_mouse_events(event, arg){
        global.WindowsManager.getMain().setIgnoreMouseEvents(true,{forward:true})
    }

    /**
     * 不忽略操作事件
     * @param event
     * @param arg
     */
    static close_ignore_mouse_events(event, arg){
        global.WindowsManager.getMain().setIgnoreMouseEvents(false,{forward:true})
    }
}
module.exports = {
    MainWindow
}

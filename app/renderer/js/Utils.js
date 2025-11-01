class Utils {
    //禁止滚动条滚动
    static unScroll() {
        var top = $(document).scrollTop();
        $(document).on('scroll.unable', function (e) {
            $(document).scrollTop(top);
        })
    }

    static drag_move(element) {
        element = document.querySelector(element);
        let dragging = false;
        let mouseX = 0;
        let mouseY = 0;
        element.addEventListener('mousedown', (e) => {
            dragging = true;
            const { pageX, pageY } = e;
            mouseX = pageX;
            mouseY = pageY;
        });
        window.addEventListener('mouseup', () => {
            dragging = false;
        });
        const {ipcRenderer} = require('electron')

        window.addEventListener('mousemove', (e) => {
            if (dragging) {
                const { pageX, pageY } = e;
                const pos = ipcRenderer.sendSync('main_window-get_position')
                pos[0] = pos[0] + pageX - mouseX;
                pos[1] = pos[1] + pageY - mouseY;
                window.moveTo(pos[0], pos[1]);
            }
        });
    }
}

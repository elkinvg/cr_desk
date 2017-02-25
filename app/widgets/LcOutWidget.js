Ext.define('ControlRoomDesktop.widgets.LcOutWidget', {
    extend: 'Ext.ux.desktop.Module',
    id: 'lcout_widg',
    // Для добавление внешней ссылки. 
    // Нужно посмотреть более разумный метод через обработку клика по ярлыку
    // на рабочем столе
    // Пока что происходит через метод создания окна.
    createWindow: function () {
        var login = localStorage.getItem("login");
        var passw = localStorage.getItem("password");
        if ( (this.login===null || this.passw===null) || (this.login === 'anon'  || this.passw === 'anon' ) ) {
            window.open("/lc_ro");
        }
        else {
            window.open("/lc");
        }        
    }
});


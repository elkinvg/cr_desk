Ext.define('ControlRoomDesktop.widgets.LogOutWidget', {
    extend: 'Ext.ux.desktop.Module',
    id: 'logout_widg',
    // Для добавление внешней ссылки. 
    // Нужно посмотреть более разумный метод через обработку клика по ярлыку
    // на рабочем столе
    // Пока что происходит через метод создания окна.
    init: function () {
        this.launcher = {
            text: 'Журнал',
            iconCls: 'log_32x32'
        };
    },

    createWindow: function () {
        window.open("/log");      
    }
});
Ext.define('ControlRoomDesktop.widgets.LcOutWidget', {
    extend: 'Ext.ux.desktop.Module',
    id: 'lcout_widg',
    createWindow: function () {
        window.open("/lc_ro");
    }
});


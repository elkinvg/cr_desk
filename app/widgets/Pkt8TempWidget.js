Ext.define('ControlRoomDesktop.widgets.Pkt8TempWidget', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'ControlRoomDesktop.view.pkt8.Pkt8Temp'
    ],
    id: 'pkt8temp_widg',
    
    // For init
    init: function () {
        this.launcher = {
            text: 'ПКТ-8',
            iconCls: 'cooling_small_48' // ??? ИЗМЕНИТЬ!!!
        };
    },

    createWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('pkt8temp');
        if (!win) {
            win = desktop.createWindow({
                stateId: 'pkt8temp',
                iconCls: 'cooling_small_48', // ??? ИЗМЕНИТЬ!!!
                stateful: true,
                id: 'pkt8temp',
                title: 'ПКТ-8', // ??? ИЗМЕНИТЬ!!!
                border: true,
                
                // ??? ИЗМЕНИТЬ!!!
                width: 565,
                minWidth: 565,
                maxWidth: 565,
                height: 225,
                minHeight: 225,
                maxHeight: 225,
                items: [{
                        xtype: 'pkt8_temp'
                    }],
            });
            win.show();
        }
        return win;
    }
});



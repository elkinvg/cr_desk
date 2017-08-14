Ext.define('ControlRoomDesktop.widgets.BuvLhfControlWidget', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'ControlRoomDesktop.view.lhf.BuvLhfControl'
    ],
    id: 'lhf_widg',

    init: function () {
        this.launcher = {
            text: 'ЛЖФ пучка',
            iconCls: 'cooling_small_48'
        };
    },

    createWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('lenscool');
        if (!win) {
            win = desktop.createWindow({
                stateId: 'buvlhf',
                iconCls: 'cooling_small_32',
                stateful: true,
                id: 'buvlhf',
                title: 'Управление ЛЖФ пучка в ЛУ-20',

                // WIDTH
                width: 1024,
                minWidth: 1024,
                maxWidth: 1024,
                // HEIGHT
                height: 630,
                minHeight: 630,
                maxHeight: 630,

                border: true,
                style: {
                    // borderColor: 'black',
                    // borderStyle: 'solid',
                    borderWidth: '3px'
                },

                //minWidth: 650,
                items: [{
                    xtype: 'buv_lhf'
                }],
            });
            win.show();
        }
        return win;
    }
});


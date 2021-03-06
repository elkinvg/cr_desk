Ext.define('ControlRoomDesktop.widgets.BuvLhfControlWidget', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'ControlRoomDesktop.view.lhf.BuvLhfControl'
    ],
    id: 'lhf_widg',

    init: function () {
        this.launcher = {
            text: 'ЛЖФ пучка',
            iconCls: 'buvlhf_32x32'
        };
    },

    createWindow: function () {
        me = this;
        var desktop = me.app.getDesktop();
        var win = desktop.getWindow('buvlhf');
        if (!win) {
            win = desktop.createWindow({
                stateId: 'buvlhf',
                iconCls: 'buvlhf_32x32',
                stateful: true,
                id: 'buvlhf',
                title: 'Управление ЛЖФ пучка в ЛУ-20 <button id="buv_lhf_out_button" style="">Открыть отдельно</button>',

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
            me.app.outButtonClick(win,'buv_lhf');
        }
        return win;
    }
});


Ext.define('ControlRoomDesktop.widgets.LensCoolingWidget', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'ControlRoomDesktop.view.cooling.LensCooling'
    ],
    id: 'lenscool_widg',
    
    init: function () {
        this.launcher = {
            text: 'Охлаждение линз',
            iconCls: 'cooling_small_48'
        };
    },
    
    createWindow: function () {
        me = this;
        var desktop = me.app.getDesktop();
        var win = desktop.getWindow('lenscool');
        if (!win) {
            win = desktop.createWindow({
                stateId: 'lenscool',
                iconCls: 'cooling_small_32',
                stateful: true,
                id: 'lenscool',
                title: 'Охлаждение линз <button id="lens_cool_out_button" style="">Открыть отдельно</button>',
                width: 500,
                minWidth: 500,
                maxWidth: 550,
                border: true,
                style: {
//                    borderColor: 'black',
//                    borderStyle: 'solid',
                    borderWidth: '3px'
                },
                
                height: 500,
                minHeight: 500,
                maxHeight: 550,
                //minWidth: 650,
                items: [{
                        xtype: 'lens_cooling'
                    }],
            });
            win.show();
            me.app.outButtonClick(win,'lens_cool');
        }
        return win;
    }
});


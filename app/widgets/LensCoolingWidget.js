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
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('lenscool');
        if (!win) {
            win = desktop.createWindow({
                stateId: 'lenscool',
                iconCls: 'cooling_small_32',
                stateful: true,
                id: 'lenscool',
                title: 'Охлаждение линз',
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
        }
        return win;
    }
});


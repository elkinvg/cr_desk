Ext.define('ControlRoomDesktop.widgets.MagnetCoolingWidget', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'ControlRoomDesktop.view.cooling.MagnetCooling'
    ],
    id: 'magncool_widg',
    
    init: function () {
        this.launcher = {
            text: 'Охлаждение магнитов',
            iconCls: 'magn_32'
        };
    },
    
    createWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('magncool');
        if (!win) {
            win = desktop.createWindow({
                stateId: 'magncool',
                iconCls: 'magn_32',
                stateful: true,
                id: 'magncool',
                title: 'Охлаждение магнитов',
                border: true,
                style: {
//                    borderColor: 'black',
//                    borderStyle: 'solid',
                    borderWidth: '3px'
                },
                
                width: 800,
                minWidth: 800,
                maxWidth: 850,
                
                height: 690,
                minHeight: 690,
                maxHeight: 730,
                //minWidth: 650,
                items: [{
                        xtype: 'magn_cooling'
                    }],
            });
            win.show();
        }
        return win;
    }
});

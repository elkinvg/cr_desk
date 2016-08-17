Ext.define('ControlRoomDesktop.widgets.RfqWidget', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'ControlRoomDesktop.view.rfq.Rfq_control'
    ],
    id: 'rfq-widg',
    
    init: function () {
        this.launcher = {
            text: 'RFQ-контроль',
            iconCls: 'icon-grid'
        };
    },
    
    createWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('sensors-grid');
        if (!win) {
            win = desktop.createWindow({
                stateId: 'stateSensorsGrid',
                iconCls: 'icon-grid',
                stateful: true,
                id: 'sensors-grid',
                title: 'RFQ',
                width: 700,
                minWidth: 650,
                height: 660,
                items: [{
                        xtype: 'rfq_control'
                    }],
            });
            win.show();
        }
        return win;
    },   
});



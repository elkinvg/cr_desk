Ext.define('ControlRoomDesktop.widgets.RfqWidget', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'ControlRoomDesktop.view.rfq.Rfq_control'
    ],
    id: 'rfq-widg',
    
    init: function () {
        this.launcher = {
            text: 'RFQ-контроль',
            iconCls: 'rfq_32x32'
        };
    },
    
    createWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('rfqwidg');
        if (!win) {
            win = desktop.createWindow({
                stateId: 'rfqwidg',
                iconCls: 'rfq_32x32',
                stateful: true,
                id: 'rfqwidg',
                title: 'Управление модулятором RFQ',
                // WIDTH
                width: 525,
                minWidth: 525,
                maxWidth: 525,
                // HEIGHT
                height: 760,
                minHeight: 760,
                maxHeight: 760,
                items: [{
                        xtype: 'rfq_control'
                    }]
            });
            win.show();
        }
        return win;
    },   
});



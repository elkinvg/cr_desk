Ext.define('ControlRoomDesktop.store.BuvLhfControlStore', {
    extend: 'Ext.data.Store',
    alias: 'store.buvlhfstore',
    storeId: 'buvlhfStore',
    
    fields: [
        'Current',
        'Voltage',
        'Status',
        'State',
        'stateCurrent',
        'stateProtection',
        'stateOutput',
        'key'
    ],
    
     proxy: {
        //type: 'websocket',
        type: 'memory',
        storeId: 'buvlhfStore',

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});



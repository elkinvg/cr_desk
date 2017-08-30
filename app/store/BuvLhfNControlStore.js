Ext.define('ControlRoomDesktop.store.BuvLhfNControlStore', {
    extend: 'Ext.data.Store',
    alias: 'store.buvlhfnstore',
    storeId: 'buvlhfnStore',
    
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
        storeId: 'buvlhfnStore',

        /*reader: {
            type: 'json',
//            rootProperty: 'data'
            rootProperty: function(data) {
                console.log("rootProperty: function(data)");
            }
        }*/
    }
});



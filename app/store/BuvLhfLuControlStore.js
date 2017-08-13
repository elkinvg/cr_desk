Ext.define('ControlRoomDesktop.store.BuvLhfLuControlStore', {
    extend: 'Ext.data.Store',
    alias: 'store.buvlhflustore',
    storeId: 'buvlhfluStore',
    
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
        storeId: 'buvlhfluStore',

        /*reader: {
            type: 'json',
//            rootProperty: 'data'
            rootProperty: function(data) {
                console.log("rootProperty: function(data)");
            }
        }*/
    }
});



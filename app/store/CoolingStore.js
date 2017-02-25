Ext.define('ControlRoomDesktop.store.CoolingStore', {
    extend: 'Ext.data.Store',
    alias: 'store.coolingstore',
    storeId: 'cooling_Store',

    autoload: true,

    proxy: {
        method: 'GET',
        //url: '/cr_conf/oil_temperature.php',
        type: 'ajax',
        reader: {
            rootProperty: 'data',
            successProperty: 'success',
            type: 'json'
        }
    },
    listeners: {
        load: function (store, records, success) {
        }
    }
});

Ext.define('ControlRoomDesktop.store.RegnflagsStr', {
    extend: 'Ext.data.Store',
    storeId: 'regnflagStore',
    alias: 'store.regnflagsstr',
//    model: 'model.rfq.regnflags',
    fields: [
        'name', 'value', 'description'
    ],
    autoload: true,
//    proxy: proxyVar,
    proxy: {
        type: 'ajax',
        rootProperty: 'argout',
        successProperty: 'readStatus',
        method: 'GET',
//        username: 'tango',
//        password: 'tango',
        headers : { 'Authorization' : 'Basic ' + btoa(localStorage.getItem("login") + ':' + localStorage.getItem("password")) },
    },
    autoLoad: true,
    listeners: {
        load: function (records, store, success) {
            if (success) {
                // ??? where is successProperty
                var readStatus = store[0].data['readStatus'];

                var size = Object.keys(store[0].data['argout']['0']).length;
                this.generateNewStore(store);

                if (typeof dbg !== 'undefined')
                    console.log("Data loaded. Number of rows is  " + size);

                if (readStatus == true)
                {
                    if (typeof dbg !== 'undefined')
                        console.log("readStatus is TRUE");
                } else
                {
                    console.log("readStatus is FALSE");
                }
            } else {
                console.log("not success!!!");
            }
        },
        beforeload: function () {
            console.log('BEFORE LOAD');
            var auuu = this;
            
        },
        update: function (store, record, op, modifiedFieldNames) {
        }
    },
    generateNewStore: function (store) {
        if (typeof dbg !== 'undefined')
            console.log("generateNewStore");
        var dataFrom = store[0].data['argout'];
        // чтение статуса RFQ. true - если нет ошибок modbus
        var readStatus = store[0].data['readStatus'];

        var toStore = this;
        toStore.removeAt(0);

        Ext.Object.each(dataFrom[0], function (key, value) {
            toStore.add({
                name: key,
                value: value,
                description: 'описание регистров при необходимости может быть добавлено',
                readStatus: readStatus,
                id: key
            });  // посмотреть про использование id
        });
    }
});

//console.log("TangoUrl " + proxyVar.getUrl());
//var proxyVar = new Ext.data.proxy.Ajax({
//    type: 'ajax',
//    rootProperty: 'argout',
//    successProperty: 'readStatus'
//});
//
//var dbg = false;
//var person = Ext.create('ControlRoomDesktop.oth.Property');
//proxyVar.setUrl(person.getUrltan());
Ext.define('ControlRoomDesktop.view.lhf.BuvLhfControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.buv_lhf',
    init: function () {
        var me = this;
        openws("159.93.50.223/wslhf");
        
        // ??? !!! Без этого store не загружается 
        Ext.create('store.buvlhfstore');
        
        function openws(urlws) {
            me.ws = Ext.create('Ext.ux.WebSocket', {
                url: "ws://" + urlws,
                autoReconnect: true,
                autoReconnectInterval: 1000,
                
                listeners: {
                    open: function (ws) {
                        if (typeof dbg !== 'undefined')
                            console.log('websocket Open');
                    },
                    message: function (ws, data) {
                        if (data === "")
                            return;
                        me.getData(data);
                    }
                }
            });
        }
    },
    //
    //
    //
    getData: function(data) {
        var me = this;
        console.log("data uploaded");
        
        // store сейчас определяется как memory.
        // Заменено type: 'websocket' на type: 'memory'
        // type: 'websocket' брался из 'Ext.ux.WebSocketManager'
        // При определении store как websocket приходилось открывать два сокета
        // Один для заполнения таблиц, другой для отправления команд на сервер
        var storeMem = Ext.data.StoreManager.get("buvlhfStore");
        //здесь принимаются данные с сервера и затем записываются в Store
        var dataForStore = data.data;
    }
});



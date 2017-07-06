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
        var storeMem_lu = Ext.data.StoreManager.get("buvlhfStore");
        var storeMem_n = Ext.data.StoreManager.get("buvlhfStore");
        //здесь принимаются данные с сервера и затем записываются в Store
        var dataForStore = data.data;
        
        // Example "LU20/lens_hard_focus/ps_lhf_num_1" or "LU20/lens_hard_focus/ps_lhf_num_lu_1"
        // Получение новых объектов для сохранения в store
        // obj["ps_lhf_n_1"] 
        //       {'Current',
        //        'Voltage',
        //        'Status',
        //        'State',
        //        'stateCurrent',
        //        'stateProtection',
        //        'stateOutput'
        //        }
//        var ps_lhf_n = new Object();
//        var ps_lhf_lu = new Object();
        
        var ps_lhf_n = new Array();
        var ps_lhf_lu = new Array();
        
        Ext.iterate(dataForStore, function(key, value){
            var newKey = getNeyKey(key);
            
            if (!Array.isArray(newKey))
                return;
            
            var newDataObj = getDataFromPsArray(value, newKey[1]);
            
            if (newKey[0] === "n") {
                ps_lhf_n.push(newDataObj);
            }
            if (newKey[0] === "l") {
                ps_lhf_lu.push(newDataObj);
            }
            
            function getNeyKey(key) {
                var res = parseInt(key.substr(key.lastIndexOf("ps_lhf_num_lu")+14));
                
                if (!isNaN(res))
                    return ["l",res];
                
                res = parseInt(key.substr(key.lastIndexOf("ps_lhf_num_")+11));
                if (!isNaN(res))
                    return ["n",res];
                
                return null;
            };
            
            function getDataFromPsArray(inpArray, keyN) {
                var dataObj = new Object();
                inpArray.forEach(function (item, i, arr) {
                    dataObj[item.attr] = item.data;
                });
                dataObj["key"] = keyN;
                return dataObj;
            };
            //var new_key = 
        });
        
        // ??? !!! Они равны
        storeMem_n.loadData(ps_lhf_n);
        storeMem_lu.loadData(ps_lhf_lu);
        console.log("storeMem tmp");
        
//        dataForStore.forEach(function (item, i, arr) {
//            var test = 'test;'
//        });
    }
});



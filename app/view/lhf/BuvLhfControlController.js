Ext.define('ControlRoomDesktop.view.lhf.BuvLhfControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.buv_lhf',
    init: function () {
        var me = this;
        // В настройке apache должна содержаться
        //      ProxyPass /wslhf ws://host/wslhf
        //      ProxyPassReverse  /wslhf ws://host/wslhf
        openws(location.host + "/wslhf");
        
        var firstnfull = true;
        // ??? !!! Без этого store не загружается 
        //Ext.create('store.buvlhfstore');
        
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
                        firstnfull = me.getData(data, firstnfull);
                        return;

                    },
                    close: function (ws) {
                        if (typeof dbg !== 'undefined')
                            console.log('websocket Close');
                    }
                }
            });
        }
    },
    //
    //
    //
    getData: function(data, first) {
        var me = this;

        if (typeof dbg !== 'undefined')
            console.log("data uploaded");
        
        // store сейчас определяется как memory.
        // Заменено type: 'websocket' на type: 'memory'
        // type: 'websocket' брался из 'Ext.ux.WebSocketManager'
        // При определении store как websocket приходилось открывать два сокета
        // Один для заполнения таблиц, другой для отправления команд на сервер
        var storeMem_lu = Ext.data.StoreManager.get("buvlhfluStore");
        var storeMem_n = Ext.data.StoreManager.get("buvlhfnStore");
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
        });

        // сортировка по ключам
        ps_lhf_lu.sort(function (a, b) {
            return a.key - b.key;
        });
        ps_lhf_n.sort(function (a, b) {
            return a.key - b.key;
        });

        if (first) {
            storeMem_lu.loadData(ps_lhf_lu);
            storeMem_n.loadData(ps_lhf_n);
            if (ps_lhf_n.length == 12 && ps_lhf_lu.length == 13)
                first = false;
            return first;
        }



        // Если данные с вебсокета соответствуют запросу
        // В данный момент для ps_lhf_n данные с 12ти источников
        //                 для ps_lhf_lu данные с 13ти источников
        
        if (ps_lhf_n.length == 12 && ps_lhf_lu.length == 13) {
            var mainGrid = me.lookupReference('lhf_lu_Grid');
            var record = mainGrid.getSelectionModel();
            var models = mainGrid.getStore().getRange();
            // models[0].set("Current", 12);
            setData(models,ps_lhf_lu);
            
            function setData(inpmodel,dataarr) {
                for ( i=0; i<inpmodel.length; i++) {
                    inpmodel[i].data = dataarr[i];
                }
            }
        }

        if (typeof dbg !== 'undefined')
            console.log("storeMem tmp");

        return first;
    },
    //
    //
    //
    panelDestroyed: function (e, eOpts) {
        if (typeof dbg !== 'undefined')
            console.log('BUVLhf Destoyed');
        var me = this;
        var ws = me.ws;
        ws.close();
        if (typeof dbg !== 'undefined')
            console.log('WS Closed');
        //this.runner.destroy();
    },
    //
    //
    //
    forrownumber: function (a, b) {
        return this.getRowNumberStr(b.rowIndex)
    },
    //
    //
    //
    getRowNumberStr: function (inpStr) {
        if (inpStr < 11)
            return inpStr;
        if (inpStr == 11)
            return "11/1";
        if (inpStr == 12)
            return "11/2";
    },
    //
    //
    //
    setStatusColor: function (val, meta) {
        // установка цветового индикатора статуса
        if (val === "FAULT")
            meta.style = "background-color:red;";
        if (val === "ON")
            meta.style = "background-color:green;";
        if (val === "OFF")
            meta.style = "background-color:orange;";

        return "";
    },
    //
    //
    //
    boldnnum: function (val,meta,data) {
        // Здесь производится проверка разницы токов
        // Если разница превышает заданный уровень - предупрждение
        try {
            var newval = val.toFixed(3);
            return newval;
        }
        catch (e) {
            return "---";
        }
    },
    //
    //
    //
    cellClickProc: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts)
    {
        // or lhf-n-grid
        // or lhf-lu-grid
        var grid_id = grid.grid.id;
        var dataIndex = grid.headerCt.getGridColumns()[cellIndex].dataIndex;

        if (dataIndex !== "State")
            return;

        var state = record.data.State;

        if (grid_id === "lhf-lu-grid")
            var psId = this.getRowNumberStr(record.data.key-1);
        else
            var psId = record.data.key;

        if (state === "FAULT") {
            statFunc(state,psId,"??? !!!");
            return;
        }

        function statFunc(state, id, device) {
            if (state === 'ON') {
                if(typeof dbg !== 'undefined') console.log('STATUS ON');
                var messageIn = 'Источник включён, вы хотите его выключить?';
                var buttonIn = Ext.Msg.YESNO;
                var command = new Object();
                command.command = "OffDevice";
                command.argin = device;
                var buttonIn = Ext.Msg.YESNO;
                var icon = Ext.Msg.QUESTION;
                var butText = {
                    yes: "Да",
                    no: "Нет"
                }
            } else if (state === 'OFF') {
                if(typeof dbg !== 'undefined') console.log('STATUS OFF');
                var messageIn = 'Источник выключен, вы хотите его включить?';
                var buttonIn = Ext.Msg.YESNO;
                var command = new Object();
                command.command = "OnDevice";
                command.argin = device;
                var buttonIn = Ext.Msg.YESNO;
                var icon = Ext.Msg.QUESTION;
                var butText = {
                    yes: "Да",
                    no: "Нет"
                };
            } else if (state === 'FAULT') {
                if(typeof dbg !== 'undefined') console.log('STATUS FAULT');
                var messageIn = 'связь с Источником ' + id + ' нарушена';
                var buttonIn = Ext.Msg.OK;
                var icon = Ext.Msg.ERROR;
                //return;
            }
            Ext.Msg.show({
                title: 'Состояние источника ' + id,
                message: messageIn,
                buttons: buttonIn,
                icon: icon,
                buttonText: butText,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var comJson = Ext.util.JSON.encode(command);
                        me.ws.send(comJson);
                        if(typeof dbg !== 'undefined') console.log('Yes pressed');
                    } else if (btn === 'no') {
                        if(typeof dbg !== 'undefined') console.log('No pressed');
                    }
                }
            });
        };
    },
});



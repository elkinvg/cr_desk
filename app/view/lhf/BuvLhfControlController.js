Ext.define('ControlRoomDesktop.view.lhf.BuvLhfControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.buv_lhf',
    init: function () {
        var me = this;
        openws("159.93.50.223/wslhf");
        
        function openws(urlws) {
            me.ws = Ext.create('Ext.ux.WebSocket', {
                url: "ws://" + urlws,
                autoReconnect: true,
                autoReconnectInterval: 1000,
                
                listeners: {
                    open: function (ws) {
                        if (typeof dbg !== 'undefined')
                            console.log('websocket Open');
                        
                        var command = new Object();
                        command.type_req = "timer_start";
                        command.msec = 3000;
                        
                        // test/lhf/num_*
                        // test/lhf/b_num_lu_*
                        var devices = new Object();
                        
                        for (var i = 1; i < 12; i++) {
                            var key = "test/lhf/num_" + i;
                            devices[key] = {
                                attr: ["Current","Voltage"]
                            };
                        }
                        command.devices = devices;
                        var comJson = Ext.util.JSON.encode(command);
                        
                        //command.
                        me.ws.send(comJson);
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
    }
});



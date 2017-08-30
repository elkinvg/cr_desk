Ext.define('ControlRoomDesktop.view.pkt8.Pkt8TempController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pkt8temp',
    
    init: function () {
        var me = this;
        
        console.log("INIT Pkt8TempController"); // ??? REMOVE
        
        var task = {
            run: function () {
                if (window.location.hostname === 'localhost') {
                    // For HOME_debug
                    var pkt8_serv = '/clone/desk_dbg.php';
                } else {
                    var pkt8_serv = '/cr_conf/termo/read_of_pkt8.php';
                }
                
                Ext.Ajax.request({
                    url: pkt8_serv,
                    method: 'GET',
                    success: function (ans) {
                        console.log("data loaded"); // ??? REMOVE
                        var Pkt8_cell = {};
                        Pkt8_cell.pkt_1 = Ext.ComponentQuery.query('[name=pkt_1]'),
                                Pkt8_cell.pkt_2 = Ext.ComponentQuery.query('[name=pkt_2]'),
                                Pkt8_cell.pkt_3 = Ext.ComponentQuery.query('[name=pkt_3]'),
                                Pkt8_cell.pkt_4 = Ext.ComponentQuery.query('[name=pkt_4]'),
                                Pkt8_cell.pkt_5 = Ext.ComponentQuery.query('[name=pkt_5]'),
                                Pkt8_cell.pkt_6 = Ext.ComponentQuery.query('[name=pkt_6]'),
                                Pkt8_cell.pkt_7 = Ext.ComponentQuery.query('[name=pkt_7]'),
                                Pkt8_cell.pkt_8 = Ext.ComponentQuery.query('[name=pkt_8]');
                        try {
                            var decodedString = Ext.decode(ans.responseText);
                            var success = decodedString.success;

                            if (success === true) {
                                if (decodedString.argout === undefined) {
                                    // ??? дописать для отсутсвия argout
                                } else {
                                    // ??? INFO 
                                    updateData(decodedString.argout);
                                }
                            }
                        } catch (e) {
                            // ??? Дописать для исключений?
                        }
                        
                        function updateData(data) {
                            Ext.Object.each(Pkt8_cell,
                                    function (key, value) {
                                        // ??? .toFixed(3) for val.000
                                        // parseInt
                                        var dataFromPkt8 = data[key];

                                        var text = '<span style="font-weight:bold; color:black; font-size:250%">' + dataFromPkt8 + '</span>';
                                        Ext.each(value, function (component, index) {
                                            component.setText(text, false);
                                        });
                            });
                        }
                    },
                    failure: function (ans) {
                        if(typeof dbg !== 'undefined') 
                            console.log("Pkt8. AJAX FAILURE");
                    }                    
                });
            },
            interval: 3000 // 3 seconds            
        };
        
        var runner = new Ext.util.TaskRunner();
        runner.start(task);
    }
});



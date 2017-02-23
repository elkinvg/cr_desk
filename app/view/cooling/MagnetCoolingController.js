Ext.define('ControlRoomDesktop.view.cooling.MagnetCoolingController', {
    extend: 'ControlRoomDesktop.view.cooling.AbstractCoolingController',
    alias: 'controller.magncooling',
    //requires: ['Ext.ux.Mediator'],
    //
    //
    //
    init: function () {
        var me = this;
        
        var task = {
            run: function () {
                //var dStore = Ext.data.StoreManager.lookup('lenscooling_Store');

                if (window.location.hostname === 'localhost') {
                    // For HOME_debug
                    var urlLensCooling = '/clone/desk_dbg.php';
                } else {
                    var urlLensCooling = '/cr_conf/termo/reading_of_oil_temp.php';
                }
                Ext.Ajax.request({
                    url: urlLensCooling,
                    method: 'GET',
                    success: function (ans) {
                        var Temp = {};
                        Temp.T2_1 = Ext.ComponentQuery.query('[name=T2_1]'),
                                Temp.T2_2 = Ext.ComponentQuery.query('[name=T2_2]'),
                                Temp.T2_3 = Ext.ComponentQuery.query('[name=T2_3]'),
                                Temp.T2_4 = Ext.ComponentQuery.query('[name=T2_4]'),
                                Temp.T2_6 = Ext.ComponentQuery.query('[name=T2_6]'),
                                Temp.T2_7 = Ext.ComponentQuery.query('[name=T2_7]');
                        me.getData(ans, Temp);
                    },
                    failure: function (ans) {
                        console.log("AJAX FAILURE");
                    }
                });
            },
            interval: 3000 // 3 seconds
        };

        var runner = new Ext.util.TaskRunner();
        runner.start(task);
    },

});
    


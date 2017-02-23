Ext.define('ControlRoomDesktop.view.cooling.LensCoolingController', {
//    extend: 'Ext.app.ViewController',
    extend: 'ControlRoomDesktop.view.cooling.AbstractCoolingController',
    alias: 'controller.lenscooling',
    init: function () {
        var me = this;
        console.log("LensCoolingController init");
        //Ext.ux.Mediator.on('test', this.testMed, this);

        Ext.create('store.lenscoolingstore');

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
                        Temp.T_1 = Ext.ComponentQuery.query('[name=T_1]'),
                                Temp.T_2 = Ext.ComponentQuery.query('[name=T_2]'),
                                Temp.T_3 = Ext.ComponentQuery.query('[name=T_3]'),
                                Temp.T_4 = Ext.ComponentQuery.query('[name=T_4]'),
                                Temp.T_5 = Ext.ComponentQuery.query('[name=T_5]'),
                                Temp.T_6 = Ext.ComponentQuery.query('[name=T_6]'),
                                Temp.T_7 = Ext.ComponentQuery.query('[name=T_7]');
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
    //
    //
    //
    getChart: function () {
        // График строится по запросу
        // При Выводе графика без запроса вылезает глюк, если в течении
        // 30 секунд не перейти на вкладку        
        var win = Ext.create('ControlRoomDesktop.view.cooling.LensCoolChart');
    }
});
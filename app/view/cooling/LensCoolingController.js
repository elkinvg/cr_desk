Ext.define('ControlRoomDesktop.view.cooling.LensCoolingController', {
    extend: 'ControlRoomDesktop.view.cooling.AbstractCoolingController',
    alias: 'controller.lenscooling',

    init: function () {
        var me = this;
        if(typeof dbg !== 'undefined') 
            console.log("LensCoolingController init");
        //Ext.ux.Mediator.on('test', this.testMed, this);

        Ext.create('store.coolingstore');

        var urlNparams = me.getUrlAndParamsForTemperature();



        if (urlNparams.length !== 2) {
            me.toastActive("LensCooling","Невозможно получить URl, возвращаемый массив из getUrlAndParamsForTemperature имеет неправильный размер", "red");
            return;
        }



        var task = {
            run: function () {
                //var dStore = Ext.data.StoreManager.lookup('lenscooling_Store');

                //var urlLensCooling = '/cr_conf/termo/reading_of_oil_temp.php';

                Ext.Ajax.request({
                    url: urlNparams[0],
                    params: urlNparams[1],
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
                        if(typeof dbg !== 'undefined') 
                            console.log("AJAX FAILURE");
                        try {
                            var respData = Ext.JSON.decode(ans.responseText);
                            var warn_mess = respData.err_mess;
                        }
                        catch(e){
                            me.toastActive("LensCooling","Неизвестная ошибка от сервера", "red");
                            return;
                        }
                        me.toastActive("LensCooling",warn_mess, "red");
                    }
                });
            },
            interval: 3000 // 3 seconds
        };

        var runner = new Ext.util.TaskRunner();
        runner.start(task);
        me.runner = runner;
        me.task = task;
    },
    //
    //
    //
    getChart: function () {
        // График строится по запросу
        // При Выводе графика без запроса вылезает глюк, если в течении
        // 30 секунд не перейти на вкладку

        // Если было вызвано из отделённого окна
        if (get_params.widgout === "lens_cool") {
            var href = window.location.href;
            // Замена GET 
            href = href.replace("widgout=lens_cool","widgout=lens_cool_chart");
            window.open(href);
        }
        else {
            var win = Ext.create('ControlRoomDesktop.view.cooling.LensCoolChart');
        }
    },
    //
    //
    //
    panelDestroyed: function (e, eOpts) {
        if (typeof dbg !== 'undefined')
            console.log('lencool Destoyed');
        var me = this;
        me.runner.stop(me.task);
    }
});
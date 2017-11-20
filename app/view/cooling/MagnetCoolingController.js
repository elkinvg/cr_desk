Ext.define('ControlRoomDesktop.view.cooling.MagnetCoolingController', {
    extend: 'ControlRoomDesktop.view.cooling.AbstractCoolingController',
    alias: 'controller.magncooling',

    init: function () {
        var me = this;

        var urlNparams = me.getUrlAndParamsForTemperature();

        if (urlNparams.length !== 2) {
            me.toastActive("MagnetCooling","Невозможно получить URl, возвращаемый массив из getUrlAndParamsForTemperature имеет неправильный размер", "red");
            return;
        }
        
        var task = {
            run: function () {

                //var urlLensCooling = '/cr_conf/termo/reading_of_oil_temp.php';
                Ext.Ajax.request({
                    url: urlNparams[0],
                    params: urlNparams[1],
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
        if (get_params.widgout === "magn_cool") {
            var href = window.location.href;
            // Замена GET 
            href = href.replace("widgout=magn_cool","widgout=magn_cool_chart");
            window.open(href);
        }
        else {
            var win = Ext.create('ControlRoomDesktop.view.cooling.MagnetCoolChart');
        }
    },
    //
    //
    //
    panelDestroyed: function (e, eOpts) {
        if (typeof dbg !== 'undefined')
            console.log('magncooling Destoyed');
        var me = this;
        if (me.runner !== undefined)
            me.runner.stop(me.task);
    }
});
    


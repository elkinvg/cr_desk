Ext.define('ControlRoomDesktop.view.cooling.LensCoolChartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.lenscool_chart',
    init: function () {
        var me = this;

        var win = Ext.ComponentQuery.query('[name=lenscool_chart]')[0];

        var graphbut = Ext.ComponentQuery.query('[name=graphbut]')[0];
        graphbut.disable();

        var dStore = Ext.data.StoreManager.lookup('lenscooling_Store');

        var ref = Ext.ComponentQuery.query('[name=chart]')[0];
        // График показывается только пи успешной загрузке store
        dStore.load(
                {
                    callback: function (records, operation, success) {
                        if (success) {
                            var axes0 = ref.axes[0];
                            if (typeof dbg !== 'undefined')
                                console.log("store with Temperature Loaded!");
                            var ss = records[records.length - 1];
                            var dataFrom = ss.data;
                            if (dataFrom === undefined) {
                                console.log("Store: dataFrom===undefined");
                                return;
                            }
                            // Устанавливаются минимум и максимум для
                            // ординаты, для лучшего отбражения графика
                            // по умолчанию, не всегда добавляется пробел
                            var minT = dataFrom['min_T'];
                            var maxT = dataFrom['max_T'];
                            if (minT === undefined || maxT === undefined) {
                                return;
                            }

                            axes0.setMaximum(parseFloat(maxT) + 2);
                            if (minT !== 0) {
                                axes0.setMinimum(parseFloat(minT) - 2);
                            }
                            win.show();
                            //me.show();
                        }
                        graphbut.enable();
                    }
                });
    },
    //
    //
    //
    onSeriesTooltipRender: function (tooltip, record, item) {
            //tooltip.setHtml(item.field + " " + record.get('time') + " " + record.get(item.series.getYField()) + '&deg;C');
            tooltip.setHtml(item.series.config.title + " " + record.get('time') + " " + record.get(item.series.getYField()) + '&deg;C');
        }
});


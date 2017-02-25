Ext.define('ControlRoomDesktop.view.cooling.AbstractCoolChartController', {
    extend: 'Ext.app.ViewController',
    //
    //
    //
    forInit: function() {
        var me = this;
        var url;

        if (me.type === 'magnetcool_chart') {
            var win = Ext.ComponentQuery.query('[name=magnetcool_chart]')[0];
            url = '/cr_conf/oil_temperature.php?tm2';
            var graphbut = Ext.ComponentQuery.query('[name=magnet_graphbut]')[0];
        }
        else if (me.type === 'lenscool_chart') {
            var win = Ext.ComponentQuery.query('[name=lenscool_chart]')[0];
            url = '/cr_conf/oil_temperature.php';
            var graphbut = Ext.ComponentQuery.query('[name=lens_graphbut]')[0];
        }

        graphbut.disable();

        var dStore = Ext.data.StoreManager.lookup('cooling_Store');

        var ref = Ext.ComponentQuery.query('[name=chart]')[0];
        // График показывается только пи успешной загрузке store
        //dStore.setUrl('/cr_conf/oil_temperature.php');
        dStore.load(
                {
                    url: url,
                    callback: function (records, operation, success) {
                        if (success) {
                            var axes0 = ref.axes[0];
                            if (typeof dbg !== 'undefined')
                                console.log("store with Temperature for " + me.type + " Loaded!");
                            var ss = records[records.length - 1];
                            var dataFrom = ss.data;
                            if (dataFrom === undefined) {
                                console.log("Store for " + me.type + " : dataFrom===undefined");
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



Ext.define('ControlRoomDesktop.view.cooling.LensCoolChart', {
    xtype: 'lenscool_chart',
    extend: 'Ext.window.Window',
    controller: 'lenscool_chart',
    requires: [
        'Ext.data.Store',
        'ControlRoomDesktop.view.cooling.LensCoolChartController',
        'ControlRoomDesktop.store.LensCoolingStore',
        'Ext.chart.*'
    ],
    width: '100%'
            , title: 'Изменение температур системы охлаждения'
            , height: 600
            , draggable: false
            , border: false
            , modal: true
            , resizable: false
            , name: 'lenscool_chart'
            , items: [
                {
                    xtype: 'cartesian',
                    reference: 'chart', 
                    name: 'chart',
                    width: '100%',
                    height: 500,
                    interactions: 'crosshair',
                    store: {
                        type: 'lenscoolingstore'
                    },
                    legend: {
                        docked: 'right'
                    },
                    axes: [{
                            title: 'Температура',
                            type: 'numeric',
                            fields: [
                                'T_1',
                                'T_2',
                                'T_3',
                                'T_4',
                                'T_5',
                                'T_6',
                                'T_7'
                            ],
                            //minimum: 18,
                            //maximum: 21,
                            position: 'left',
                            grid: true,
                            //minimum: 0,
                            //renderer: 'onAxisLabelRender'
                            listeners: {
                                rangechange: function (axis, range, eOpts) {
                                }
                            }
                        }, {
                            type: 'category',
                            fields: 'time',
                            position: 'bottom',
                            grid: true,
                            label: {
                                rotate: {
                                    degrees: -45
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            type: 'line',
                            xField: 'time',
                            yField: 'T_1',
                            title: 'напор<br>общий',
                            style: {
                                lineWidth: 4
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRender'
                            }
                        },
                        {
                            type: 'line',
                            xField: 'time',
                            yField: 'T_2',
                            title: 'K2',
                            style: {
                                lineWidth: 4
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRender'
                            }
                        },
                        {
                            type: 'line',
                            xField: 'time',
                            yField: 'T_3',
                            title: 'K3',
                            style: {
                                lineWidth: 4
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRender'
                            }
                        },
                        {
                            type: 'line',
                            xField: 'time',
                            yField: 'T_4',
                            title: 'K1',
                            style: {
                                lineWidth: 4
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRender'
                            }
                        },
                        {
                            type: 'line',
                            xField: 'time',
                            yField: 'T_5',
                            title: 'слив<br>общий',
                            style: {
                                lineWidth: 4
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRender'
                            }
                        },
                        {
                            type: 'line',
                            xField: 'time',
                            yField: 'T_6',
                            title: 'Вода<br>подача',
                            style: {
                                lineWidth: 4
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRender'
                            }
                        },
                        {
                            type: 'line',
                            xField: 'time',
                            yField: 'T_7',
                            title: 'Вода<br>слив',
                            style: {
                                lineWidth: 4
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: 'Закрыть',
                    margin: '0 0 0 100',
                    width: 150,
                    handler: function() {
                        var win = this.up('window');
                        win.close();
                    }
                }
            ]
});


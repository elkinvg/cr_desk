Ext.define('ControlRoomDesktop.view.cooling.MagnetCoolChart', {
    xtype: 'magnetcool_chart',
    extend: 'Ext.window.Window',
    controller: 'magnetcool_chart',
    requires: [
        'Ext.data.Store',
        'ControlRoomDesktop.view.cooling.MagnetCoolChartController',
        'ControlRoomDesktop.store.CoolingStore',
        'Ext.chart.*'
    ],
    width: '100%'
            , title: 'Изменение температур системы охлаждения поворотных магнитов'
            , err: 'err'
            , height: 600
            , draggable: false
            , border: false
            , modal: true
            , resizable: false
            , name: 'magnetcool_chart'
            ,id: 'magnetcool_chart'
            , items: [
                {
                    xtype: 'cartesian',
                    reference: 'chart', 
                    name: 'chart',
                    width: '100%',
                    height: 500,
                    interactions: 'crosshair',
                    store: {
                        type: 'coolingstore'
                    },
                    legend: {
                        docked: 'right'
                    },
                    axes: [{
                            title: 'Температура',
                            type: 'numeric',
                            fields: [
                                'T2_1',
                                'T2_2',
                                'T2_3',
                                'T2_4',
                                //'T_5',
                                'T2_6',
                                'T2_7'
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
                            yField: 'T2_1',
                            title: 'ПМ1 подача',
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
                            yField: 'T2_2',
                            title: 'ПМ2 подача',
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
                            yField: 'T2_3',
                            title: 'ПМ2 слив',
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
                            yField: 'T2_4',
                            title: 'ПМ1 слив',
                            style: {
                                lineWidth: 4
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRender'
                            }
                        },
                        /*{
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
                        },*/
                        {
                            type: 'line',
                            xField: 'time',
                            yField: 'T2_6',
                            title: 'ПМ1 ветвь 5',
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
                            yField: 'T2_7',
                            title: 'ПМ1 ветвь 4',
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





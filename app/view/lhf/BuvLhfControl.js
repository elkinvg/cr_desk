Ext.define('ControlRoomDesktop.view.lhf.BuvLhfControl', {
    // extend: 'Ext.form.Panel',
    extend: 'Ext.container.Container',
    xtype: 'buv_lhf',
    //title: 'Управление ЛЖФ пучка в ЛУ-20',
    alias: 'widget.buv_lhf',
    width: '100%',
    controller: 'buv_lhf',

    requires: [
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'ControlRoomDesktop.view.lhf.BuvLhfControlController',
        'Ext.ux.WebSocket',
        'ControlRoomDesktop.store.BuvLhfLuControlStore',
        'ControlRoomDesktop.store.BuvLhfNControlStore'
    ],
    listeners: {
        removed: 'panelDestroyed'
    },

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    //bodyPadding: 5,
    items: [
        {
            xtype: 'grid',
            width: 500,
            title: 'ЛЖФ ЛУ',
            reference: 'lhf_lu_Grid',
            id: 'lhf-lu-grid',
            margin: '0 10 0 0',
            //style: 'border: solid 1px',
            store: {
                type: 'buvlhflustore'
            },
            listeners: {
                cellclick: 'cellClickProc'
            },
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 50,
                    renderer: 'forrownumber',
                    align: "center"
                },
                {
                    text: 'Установка U, В',
                    width: 200,
                    xtype: 'widgetcolumn',
                    widget: {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                cls: 'test-frm-sz',
                                xtype: 'numberfield',
                                width: 100,
                                minValue: 0,
                                maxValue: 500,
                                stepValue: 10
                            },
                            {
                                cls: 'test-btn',
                                xtype: 'button',
                                width: 80,
                                text: 'Уст. U'
                            }
                        ]
                    }
                },
                {
                    text: 'U вых., В',
                    dataIndex: 'Voltage',
                    width: 100,
                    align: "center",
                    renderer: 'boldnnum'
                }, {
                    text: 'I вых., А',
                    width: 100,
                    dataIndex: 'Current',
                    align: "center",
                    renderer: 'boldnnum'
                },
                {
                    dataIndex: 'State',
                    flex: 1,
                    renderer: 'setStatusColor'
                }
            ]
        },
        {
            xtype: 'grid',
            width: 500,
            reference: 'lhf_n_Grid',
            id: 'lhf-n-grid',
            title: 'ЛЖФ H',
            margin: '0 0 0 10',
            store: {
                type: 'buvlhfnstore'
            },
            listeners: {
                cellclick: 'cellClickProc'
            },
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 50,
                    align: "center"
                },
                {
                    text: 'Установка U, В',
                    width: 200,
                    xtype: 'widgetcolumn',
                    widget: {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                cls: 'test-frm-sz',
                                xtype: 'numberfield',
                                width: 100,
                                minValue: 0,
                                maxValue: 500,
                                stepValue: 10
                            },
                            {
                                cls: 'test-btn',
                                xtype: 'button',
                                width: 80,
                                text: 'Уст. U'
                            }
                        ]
                    }
                },
                {
                    text: 'U вых., В',
                    dataIndex: 'Voltage',
                    width: 100,
                    align: "center",
                    renderer: 'boldnnum'
                }, {
                    text: 'I вых., А',
                    width: 100,
                    dataIndex: 'Current',
                    align: "center",
                    renderer: 'boldnnum'
                },
                {
                    dataIndex: 'State',
                    flex: 1,
                    renderer: 'setStatusColor'
                }
            ]
        }
    ]
});



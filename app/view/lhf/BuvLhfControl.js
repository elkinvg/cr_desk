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
    bodyPadding: 5,
    items: [
        {
            xtype: 'grid',
            width: 550,
            title: 'ЛЖФ ЛУ',
            reference: 'lhf_lu_Grid',
            id: 'test-grid',
            store: {
                type: 'buvlhflustore'
            },
            columns: [
                {
                    xtype: 'rownumberer'
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
                    width: 200
                }, {
                    text: 'I вых., А',
                    width: 100,
                    dataIndex: 'Current'
                }
            ]
        },
        {
            xtype: 'grid',
            width: 550,
            reference: 'lhf_n_Grid',
            title: 'ЛЖФ H',
            store: {
                type: 'buvlhfnstore'
            },
            columns: [
                {
                    xtype: 'rownumberer',
                    renderer: function (a,b,c) {
                        return 'x';
                    }
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
                    width: 200
                }, {
                    text: 'I вых., А',
                    width: 100,
                    dataIndex: 'Current'
                }
            ]
        }
    ]
});



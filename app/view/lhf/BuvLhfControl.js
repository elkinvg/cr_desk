Ext.define('ControlRoomDesktop.view.lhf.BuvLhfControl', {
    extend: 'Ext.form.Panel',
    xtype: 'buv_lhf',
    //title: 'Управление ЛЖФ пучка в ЛУ-20',
    alias: 'widget.buv_lhf',
    width: '100%',
    controller: 'buv_lhf',

    requires: [
        'ControlRoomDesktop.view.lhf.BuvLhfControlController',
        'Ext.ux.WebSocket',
        'ControlRoomDesktop.store.BuvLhfControlStore'
    ],   
    ///
//    layout: {
//        type: 'hbox',
//        align: 'stretch'
//    },
    items: [
        {
            xtype: 'grid',
            title: 'ЛЖФ ЛУ',
            reference: 'lhf_lu_Grid',
            id: 'test-grid',
            store: {
                type: 'buvlhfstore'
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
//                    items: [
//                        {
//                            xtype: 'numberfield',
//                            width: 100,
//                        },
//                        {
//                            xtype: 'button',
//                            width: 80,
//                            text: 'Уст. U'
//                        }
//                    ]
                },
                {
                    text: 'U вых., В',
                    dataIndex: 'Voltage',
                    width: 200
                }, {
                    text: 'I вых., А',
                    width: 100,
                    dataIndex: 'Current'
                }]
        }, /*{
            xtype: 'grid',
            title: 'ЛЖФ H',
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    text: 'Установка U, В',
                    width: 200
                },
                {
                    text: 'U вых., В',
                    width: 100
                }, {
                    text: 'I вых., А',
                    width: 100
                }]
        }*/]
});



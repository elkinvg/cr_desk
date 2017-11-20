Ext.define('ControlRoomDesktop.view.rfq.Rfq_control', {
    extend: 'Ext.form.Panel',
    alias: 'widget.rfq_control',
    xtype: 'rfq_control',
    requires: [
        //'ControlRoomDesktop.view.rfq.Rfq_controlModel',
        'ControlRoomDesktop.view.rfq.Rfq_controlController',
        //'ControlRoomDesktop.store.RfqControlStore',
        'Ext.ux.WebSocket',
        //------------------------------------------------//
        'Ext.panel.Panel',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Number'
    ],

    // viewModel: {
    //     type: 'rfq_control'
    // },

    width: 522,
    bodyPadding: 5,
    header: false,

    controller: 'rfq_control',

    listeners: {
        removed: 'panelDestroyed'
    },

    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'center'
    },
    items: [
        {
            xtype: 'fieldset',
            //flex: 1,
            height: 150,
            bodyBorder: true,
            title: '<b>Состояние элементов защиты</b>',
            defaultType: 'displayfield',
            defaults: {
                margin: '5 5 5 5',
                labelStyle: 'width: 130px; font-weight:bold;'
            },
            store: {
                type: 'rfqcontrolstore'
            },
            layout: {
                type: 'table',
                columns: 3,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },
            items: [
                {
                    fieldLabel: 'Двери модулятора',
                    reference: 'X0'
                },
                {
                    fieldLabel: 'Охлаждение трансформатора',
                    reference: 'X10'
                },
                {
                    fieldLabel: 'Внешнее управление',
                    reference: 'M24'
                },
                {
                    fieldLabel: 'Штанга',
                    reference: 'X1'
                },
                {
                    fieldLabel: 'Охлаждение лампы',
                    reference: 'X11'
                },
                {
                    fieldLabel: 'Вакуум',
                    reference: 'M25'
                }
            ]
        },
        {
            xtype: 'fieldset',
            height: 160,
            title: '<b>В(ы)ключение системы</b>',
            layout: {
                type: 'table',
                columns: 4,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },
            items: [
                //------------------
                {
                    xtype: 'button',
                    width: 130,
                    text: 'Вентилятор',
                    id: 'M3',
                    val: 'M45',
                    handler: 'systemBtnClick'
                },
                {
                    xtype: 'label',
                    reference: 'M45'
                },
                //------------------
                {
                    xtype: 'button',
                    width: 130,
                    text: 'ВНМ (RFQ)',
                    id: 'M5',
                    val: 'X13',
                    handler: 'systemBtnClick'
                },
                {
                    xtype: 'label',
                    reference: 'X13'
                },
                //------------------
                {
                    xtype: 'button',
                    width: 130,
                    text: 'Накал',
                    id: 'M1',
                    val: 'X3',
                    handler: 'systemBtnClick'
                },
                {
                    xtype: 'label',
                    reference: 'X3'
                },
                //------------------
                {
                    xtype: 'button',
                    width: 130,
                    text: 'Банчер',
                    id: 'M7',
                    val: 'M7',
                    handler: 'systemBtnClick'
                },
                {
                    xtype: 'label',
                    reference: 'M7'
                },
                //------------------
                {
                    xtype: 'container',
                    margin: '5 0 5 5',
                    colspan: 4,
                    layout: {
                        type: 'hbox'
                    },
                    items: [
                        {
                            cls: 'for_value',
                            xtype: 'displayfield',
                            labelWidth: 330,
                            reference: 'D46',
                            fieldLabel: "<b>Напр. накала лампы выходного каскада ГВЧ </b>"
                        }
                    ]
                }

            ]
        },
        {
            xtype: 'fieldset',
            height: 180,
            title: '<b>Высокое напряжение модулятора (ВНМ) RFQ</b>',
            // ??? !!! reference: 'highVoltageMod',
            // ??? !!! временно, затем восстановить
            //disabled: true,
            width: '100%',
            defaults: {
                labelWidth: 100,
                anchor: '100%',
                layout: 'hbox'
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '<b>Заданное</b>',
                    combineErrors: false,
                    defaults: {
                        hideLabel: true,
                        //margin: '0 20 0 0'
                    },
                    items: [
                        {
                            // задание тока
                            name: 'D68',
                            xtype: 'numberfield',
                            reference: 'D68',
                            minValue: 0,
                            allowBlank: false,
                            maxValue: 60000,
                            maxLenght: 5,
                            step: 10,
                            width: 100
                        },
                        {
                            xtype: 'displayfield',
                            value: 'мА',
                            width: 50,
                            margin: '0 0 0 5'
                        },
                        {
                            // задание напряжения
                            name: 'D66',
                            xtype: 'numberfield',
                            reference: 'D66',
                            minValue: 0,
                            maxValue: 60000,
                            step: 100,
                            width: 100,
                            allowBlank: false
                        },
                        {
                            xtype: 'displayfield',
                            value: 'В',
                            width: 50,
                            margin: '0 0 0 5'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '<b>Измеренное</b>',
                    combineErrors: false,
                    defaults: {
                        hideLabel: true
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            reference: 'D61',
                            cls: 'for_value',
                            width: 140
                        },
                        {
                            xtype: 'displayfield',
                            reference: 'D98',
                            cls: 'for_value',
                            width: 140
                        }
                    ]
                },
                {
                    xtype: 'button',
                    maxWidth: 230,
                    text: 'Установить новые значения',
                    handler: 'hvModClick'
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: '<b>Высокое напряжение Банчера RFQ</b>',
            // ??? !!! reference: 'highVoltageMod',
            // ??? !!! временно, затем восстановить
            //disabled: true,
            width: '100%',
            height: 180,
            defaults: {
                labelWidth: 100,
                anchor: '100%',
                layout: 'hbox'
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '<b>Заданное</b>',
                    combineErrors: false,
                    defaults: {
                        hideLabel: true
                    },
                    items: [
                        {
                            // задание тока
                            xtype: 'numberfield',
                            reference: 'D58',
                            minValue: 0,
                            allowBlank: false,
                            maxValue: 60000,
                            maxLenght: 5,
                            step: 10,
                            width: 100
                        },
                        {
                            xtype: 'displayfield',
                            value: 'мА',
                            width: 50,
                            margin: '0 0 0 5'
                        },
                        {
                            // задание напряжения
                            xtype: 'numberfield',
                            reference: 'D106',
                            minValue: 0,
                            maxValue: 60000,
                            step: 100,
                            width: 100,
                            allowBlank: false
                        },
                        {
                            xtype: 'displayfield',
                            value: 'В',
                            width: 50,
                            margin: '0 0 0 5'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '<b>Измеренное</b>',
                    combineErrors: false,
                    defaults: {
                        hideLabel: true,
                        //margin: '0 0 0 0',
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            reference: 'D63',
                            cls: 'for_value',
                            width: 140
                        },
                        {
                            xtype: 'displayfield',
                            reference: 'D116',
                            cls: 'for_value',
                            width: 140
                        }
                    ]
                },
                {
                    xtype: 'button',
                    maxWidth: 230,
                    text: 'Установить новые значения',
                    handler: 'hvBunchClick'
                }
            ]
        }
    ]
});


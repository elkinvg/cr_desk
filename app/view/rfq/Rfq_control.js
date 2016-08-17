Ext.define('ControlRoomDesktop.view.rfq.Rfq_control', {
    xtype: 'rfq_control',
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Display',
        'Ext.container.Container',
        'Ext.Button',
        'Ext.form.field.Number',
        'ControlRoomDesktop.store.RegnflagsStr',
        'ControlRoomDesktop.view.rfq.Rfq_controlController',
        'ControlRoomDesktop.view.rfq.Rfq_controlModel'
    ],
    title: 'Панель управления RFQ <span style="color:red; font-size:150%"> &#9899; </span>',
    alias: 'widget.rfq_control',
    //width: '700px',
    width: '100%',
    viewModel: 'rfq_control',
    controller: 'rfq_control',
    listeners: {
        destroy: 'panelDestroyed'
    },
    
    layout: {
        type: 'vbox'
    },
    items: [
        {
//            xtype: 'panel',
            xtype: 'fieldset',
            title: 'Состояние элементов защиты <span style="color:red; font-size:150%"> &#9899; </span>',
            collapsible: true,
            reference: 'connectStatus',
            width: '100%',
            layout: {
                type: 'vbox',
                align: 'stretch',
            },
            items: [
                {
                    defaultType: 'displayfield',
                    defaults: {margin: '10 0 10 0', labelStyle: 'width: 130px;'},
                    layout: {
                        type: 'table',
                        columns: 3,
                        tableAttrs: {
                            style: {
                                width: '100%'
                            }}
                    },
                    items: [
                        {
                            fieldLabel: '<b>Двери модулятора закрыты</b>',
                            reference: 'X0',
//                    bind : {
//                        value: '{readstatus}'
//                    } 
                            value: '<span style="color:red; font-size:300%"> &#9899; </span>'},
                        {
                            fieldLabel: '<b>Охлаждение накального трансформатора</b>',
                            reference: 'X10',
                            value: '<span style="color:red; font-size:300%"> &#9899; </span>'},
                        {
                            fieldLabel: '<b>Штанга повешена</b>',
                            reference: 'X1',
                            value: '<span style="color:red; font-size:300%"> &#9899; </span>'},
                        {
                            fieldLabel: '<b>Охлаждение лампы</b>',
                            reference: 'X11',
                            value: '<span style="color:red; font-size:300%"> &#9899; </span>'},
                        {
                            fieldLabel: '<b>Внешнее управление</b>',
                            reference: 'M24',
                            value: '<span style="color:red; font-size:300%"> &#9899; </span>'},
                        {
                            fieldLabel: '<b>Вакуум</b>',
                            reference: 'M25',
                            value: '<span style="color:red; font-size:300%"> &#9899; </span>'}]
                }
            ]
        },
        {
//            xtype: 'panel',
            xtype: 'fieldset',
            title: 'Включение/выключение  системы',
            reference: 'onOffPanel',
            width: '100%',
            layout: {
                type: 'vbox',
                align: 'stretch',
            },
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                    },
                    defaults: {
                        margin: '20 0 20 0',
                        flex: 1,
                    },
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'button',
                                    width: 130,
                                    text: 'Вентилятор',
                                    reference: 'ventilatorButton',
                                    handler: 'ventilatorClick'
                                },
                                {
                                    xtype: 'label',
//                                    text: 'My Label'
                                    html: '<span style="color:red; font-size:300%"> &#9899; </span>',
                                    reference: 'M45',
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'button',
                                    width: 130,
                                    text: 'Накал',
                                    reference: 'heatButton',
                                    disabled: true,
                                    handler: 'heatClick'
                                },
                                {
                                    xtype: 'label',
                                    html: '<span style="color:red; font-size:300%"> &#9899; </span>',
                                    reference: 'X3',
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'button',
                                    width: 130,
                                    text: 'ВНМ (RFQ)',
                                    disabled: true,
                                    reference: 'bhmButton',
                                    handler: 'bhmClick'
                                },
                                {
                                    xtype: 'label',
                                    html: '<span style="color:red; font-size:300%"> &#9899; </span>',
                                    reference: 'X13',
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'displayfield',
                    labelStyle: 'width: 150px;',
                    fieldLabel: '<b>Напряжение накала ламп:</b>',
                    reference: 'D46',
                    value: '<span style="font-size:200%"> 0 В</span>'
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Высокое напряжение модулятора (ВНМ) RFQ',
            reference: 'highVoltageMod',
            disabled: true,
            width: '100%',
            defaults: {
                labelWidth: 120,
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
                        margin: '0 20 0 0',
                    },
                    items: [{
                            // задание тока
                            name: 'D68',
                            xtype: 'numberfield',
                            minValue: 0,
                            allowBlank: false,
                            maxValue: 60000,
                            maxLenght: 5,
                            step: 10,
                            width: 120
                        }, {
                            xtype: 'displayfield',
                            value: 'мА',
                            width: 30
                        }, {
                            // задание напряжения
                            name: 'D66',
                            xtype: 'numberfield',
                            minValue: 0,
                            maxValue: 60000,
                            step: 100,
                            width: 120,
                            allowBlank: false
                        }, {
                            xtype: 'displayfield',
                            value: 'В',
                            width: 30
                        },
                        {
                            xtype: 'button',
                            width: 130,
                            text: 'Установить',
                            handler: 'hvInstClick'
                        }]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '<b>Измеренное</b>',
                    combineErrors: false,
                    defaults: {
                        hideLabel: true,
                        margin: '0 20 0 0',
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            style: 'text-align: right;',
                            reference: 'D9',
                            value: '<span style="font-size:200%"> 0 мА</span>',
                            width: 150
                        },
                        {
                            xtype: 'displayfield',
                            style: 'text-align: right;',
                            reference: 'D98',
                            value: '<span style="font-size:200%"> 0 В</span>',
                            width: 150
                        }
                    ]
                }
            ]
        }
    ]
//    renderTo: Ext.getBody()
});



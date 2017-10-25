Ext.define('ControlRoomDesktop.view.pkt8.Pkt8Temp', {
    xtype: 'pkt8_temp',
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.data.Store',
        'Ext.layout.container.Absolute',
        'ControlRoomDesktop.view.pkt8.Pkt8TempController'
    ],
    
    controller: 'pkt8temp',
    listeners: {
        removed: 'panelDestroyed'
    },
    
    items: [
        {
            xtype: 'panel',
            // ??? ИЗМЕНИТЬ!!!
            width: 545,
            height: 200,
            layout: 'absolute',
            bodyStyle: "background-image:url(resources/images/pkt8.png?random=" + new Date().getTime() + ") !important",
            defaultType: 'label',
            items: [
                {
                    name: 'pkt_1',
                    x: 120,
                    y: 17,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> A </span>'
                },
                {
                    name: 'pkt_2',
                    x: 405,
                    y: 17,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> B </span>'
                },
                {
                    name: 'pkt_3',
                    x: 120,
                    y: 61,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> C </span>'
                },
                {
                    name: 'pkt_4',
                    x: 405,
                    y: 61,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> D </span>'
                },
                {
                    name: 'pkt_5',
                    x: 120,
                    y: 103,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> E </span>'
                },
                {
                    name: 'pkt_6',
                    x: 405,
                    y: 103,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> F </span>'
                },
                {
                    name: 'pkt_7',
                    x: 120,
                    y: 144,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> G </span>'
                },
                {
                    name: 'pkt_8',
                    x: 405,
                    y: 144,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> H </span>'
                },
            ]
        }
    ]
});



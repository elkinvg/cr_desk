Ext.define('ControlRoomDesktop.view.pkt8.Pkt8Temp', {
    xtype: 'pkt8_temp',
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.data.Store',
        'Ext.layout.container.Absolute',
        'ControlRoomDesktop.view.pkt8.Pkt8TempController'
    ],
    
    controller: 'pkt8temp',
    
    items: [
        {
            xtype: 'panel',
            // ??? ИЗМЕНИТЬ!!!
            width: 300,
            height: 500,
            layout: 'absolute',
            defaultType: 'label',
            items: [
                {
                    name: 'pkt_1',
                    x: 100,
                    y: 50,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> A </span>'
                },
                {
                    name: 'pkt_2',
                    x: 100,
                    y: 100,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> B </span>'
                },
                {
                    name: 'pkt_3',
                    x: 100,
                    y: 150,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> C </span>'
                },
                {
                    name: 'pkt_4',
                    x: 100,
                    y: 200,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> D </span>'
                },
                {
                    name: 'pkt_5',
                    x: 100,
                    y: 250,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> E </span>'
                },
                {
                    name: 'pkt_6',
                    x: 100,
                    y: 300,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> F </span>'
                },
                {
                    name: 'pkt_7',
                    x: 100,
                    y: 350,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> G </span>'
                },
                {
                    name: 'pkt_8',
                    x: 100,
                    y: 400,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> H </span>'
                },
            ]
        }
    ]
});



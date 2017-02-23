Ext.define('ControlRoomDesktop.view.cooling.MagnetCooling', {
    xtype: 'magn_cooling',
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.data.Store',
        //'Ext.chart.*',
        'ControlRoomDesktop.view.cooling.MagnetCoolingController',
        'Ext.layout.container.Absolute'
    ],
    controller: 'magncooling',
    items: [
        {
            xtype: 'component',
            anchor: '100%',
            name: 'info_temp_mes',
            height: 50
        },
//        {
//            xtype: 'component',
//            anchor: '100%',
//            name: 'warning_mes',
//            hidden: true
//        },
        {
            xtype: 'panel',
            width: 788,
            height: 585,
            layout: 'absolute',
            bodyStyle: "background-image:url(resources/images/termo_new_0902_small.png?random=" + new Date().getTime() + ") !important",
            defaultType: 'label',
            items: [
                {
//                    reference: 'T2_1',
                    name: 'T2_1',
                    x: 34,
                    y: 246,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> T2_1</span>'
                },
                {
//                    reference: 'T2_2',
                    name: 'T2_2',
                    x: 437,
                    y: 246,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> T2_2</span>'
                },
                {
//                    reference: 'T2_3',
                    name: 'T2_3',
                    x: 682,
                    y: 246,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> T2_3</span>'
                },
                {
//                    reference: 'T2_4',
                    name: 'T2_4',
                    x: 272,
                    y: 246,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> T2_4</span>'
                },
                {
//                    reference: 'T2_6',
                    name: 'T2_6',
                    x: 150,
                    y: 346,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> T2_5(6)</span>'
                },
                {
//                    reference: 'T2_7',
                    name: 'T2_7',
                    x: 150,
                    y: 280,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> T2_6(7)</span>'
                }
            ]
        }
    ]
});


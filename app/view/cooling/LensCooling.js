Ext.define('ControlRoomDesktop.view.cooling.LensCooling', {
    xtype: 'lens_cooling',
    extend: 'Ext.panel.Panel',
    
    requires: [
        'Ext.data.Store',
        'ControlRoomDesktop.view.cooling.LensCoolingController',
        'ControlRoomDesktop.store.CoolingStore',
        //'LensControl.store.LensTemperatureStore',
        'Ext.chart.*',
        'Ext.layout.container.Absolute',
        'ControlRoomDesktop.view.cooling.LensCoolChart'
    ],
    controller: 'lenscooling',
    //store: 'lenscooling_Store',
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
            width: 485,
            height: 393,
            layout: 'absolute',
            bodyStyle: "background-image:url(resources/images/wallp_new_small.jpg?random=" + new Date().getTime() + ") !important",
            defaultType: 'label',
            items: [
                {
                    name: 'T_1',
                    x: 10,
                    y: 245,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> T1</span>'
                },
                {
                    name: 'T_2',
                    x: 144,
                    y: 168,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> T2</span>'
                },
                {
                    name: 'T_3',
                    x: 208,
                    y: 208,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> T3</span>'
                },
                {
                    name: 'T_4',
                    x: 74,
                    y: 128,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> T4</span>'
                },
                {
                    name: 'T_5',
                    x: 144,
                    y: 286,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> T5</span>'
                },
                {
                    name: 'T_6',
                    x: 349,
                    y: 73,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> T6</span>'
                },
                {
                    name: 'T_7',
                    x: 349,
                    y: 152,
                    html: '<span style="font-weight:bold; color:black; font-size:250%"> T7</span>'
                },
                {
//                    x: 490, 
//                    y: 450,
                    // Для меньшей картинки
                    x: 318, 
                    y: 317,
                    xtype: 'button',
                    reference: 'lens_graphbut',
                    name: 'lens_graphbut',
                    width: 150,
                    text: 'Показать график',
                    handler: 'getChart'
                }
            ]
        }

    ]
});



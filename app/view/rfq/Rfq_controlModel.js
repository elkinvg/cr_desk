/**
 *
 */
Ext.define('ControlRoomDesktop.view.rfq.Rfq_controlModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.rfq_control',

    data: {
        name: 'ControlRoomDesktop',

        readstatus: '<span style="color:green; font-size:300%"> &#9899; </span>'
    },
    stores: {
        mainStore: {
            type: 'regnflagsstr'
        }
    }

    //TODO - add data, formulas and/or methods to support your view
});

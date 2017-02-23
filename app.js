/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'ControlRoomDesktop',
    
    requires: [
        'ControlRoomDesktop.Application'
    ],
    
    init: function () {
        var app = new ControlRoomDesktop.Application();
    },
    //
    //
    //
    getSettFromLocalStorage: function (nameOfKey) {
        var set_data = localStorage.getItem("sett_data");

        if (set_data === null)
            return set_data;

        try {
            var dataFromSettLS = Ext.util.JSON.decode(set_data);
        } catch (e) {
            return null;
        }

        var values = dataFromSettLS[nameOfKey];

        if (values === undefined)
            return null;

        return values;
    },
    //
    //
    //
    saveSettInLocalStorage : function (nameOfKey,value) {
        // Для сохранения различных настроек в sett_data из LocalStorage
        var sett_data = localStorage.getItem("sett_data");
        
        if (sett_data===null) {
            sett_data = new Object();
            sett_data[nameOfKey] = value;
            var json =  Ext.util.JSON.encode(sett_data);
            localStorage.setItem("sett_data", json);
        } else {
            try {
                var fromSettData = Ext.util.JSON.decode(sett_data);
                fromSettData[nameOfKey] = value;
                var json = Ext.util.JSON.encode(fromSettData);
                localStorage.setItem("sett_data", json);
            }
            catch (e){}
        }
    }
    
//    extend: 'ControlRoomDesktop.Application',
//
//    requires: [
//        'ControlRoomDesktop.view.main.Main'
//    ],

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
//    mainView: 'ControlRoomDesktop.view.main.Main'

    //-------------------------------------------------------------------------
    // Most customizations should be made to ControlRoomDesktop.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});

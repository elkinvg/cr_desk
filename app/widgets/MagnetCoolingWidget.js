Ext.define('ControlRoomDesktop.widgets.MagnetCoolingWidget', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'ControlRoomDesktop.view.cooling.MagnetCooling'
    ],
    id: 'magncool_widg',
    
    init: function () {
        this.launcher = {
            text: 'Охлаждение магнитов',
            iconCls: 'magn_32'
        };
    },
    
    createWindow: function () {
        me = this;
        var desktop = me.app.getDesktop();
        var win = desktop.getWindow('magncool');
        if (!win) {
            win = desktop.createWindow({
                stateId: 'magncool',
                iconCls: 'magn_32',
                stateful: true,
                id: 'magncool',
                title: 'Охлаждение магнитов <button id="magn_cool_out_button" style="">Открыть отдельно</button>',
                border: true,
                style: {
//                    borderColor: 'black',
//                    borderStyle: 'solid',
                    borderWidth: '3px'
                },
                
                width: 800,
                minWidth: 800,
                maxWidth: 850,
                
                height: 690,
                minHeight: 690,
                maxHeight: 730,
                //minWidth: 650,
                items: [{
                        xtype: 'magn_cooling'
                    }],
            });
            win.show();
            me.app.outButtonClick(win,'magn_cool');
        }
        return win;
    },
    // //
    // //
    // //
    // outButtonClick: function (win) {
    //     Ext.get('magn_cool_out_button').on('click', function() {
    //         var href = window.location.href;
    //         if (href.indexOf("?") === -1) {
    //             href += ('?widgout=magn_cool');
    //         }
    //         else {
    //             href += ('&widgout=magn_cool');
    //         }
    //         win.close();
    //         window.open(href, 'magn_cool', 'width=644,height=544');
    //     });
    // }
});

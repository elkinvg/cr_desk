Ext.define('ControlRoomDesktop.common.CommonMixController', {
    toastActive : function (name, message, color) {
        if (color !== undefined) {
            message = "<p style='color:" + color +";'>" + message + "</p>";
        }
        Ext.toast({
            title: name,
            html: message,
            header: false,
            width: 300,
            align: 'tr'
        });
    }
});
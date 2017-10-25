Ext.define('ControlRoomDesktop.common.AbstractCommonWsController', {
    extend: 'Ext.app.ViewController',


    /**
     * Common function for opening of WebSocket connection
     * @param urlws - URl of WebSocket
     */
    openws: function (urlws, name) {
        var me = this;
        me.id_req = 0;
        me.firstnfull = true;
        var arl = arguments.length;
        // Пока для запуска одного метода
        if (arguments.length === 3)
            var outfunc = arguments[2];

        me.ws = Ext.create('Ext.ux.WebSocket', {
            url: "ws://" + urlws,
            autoReconnect: true,
            autoReconnectInterval: 1000,

            listeners: {
                open: function (ws) {
                    if (typeof dbg !== 'undefined')
                        console.log('websocket Open');
                    // Запускается дополнительный метод
                    // Пока используется для запуска таймера
                    if (outfunc !== undefined)
                        outfunc(me);
                    Ext.toast({
                        title: name,
                        html: "Соединение для " + name + " по WS открыто",
                        header: false,
                        width: 300,
                        align: 'tr'
                    });
                },
                message: function (ws, data) {
                    if (data === "")
                        return;
                    me.firstnfull = me.getData(data, me.firstnfull);
                    return;

                },
                close: function (ws) {
                    if (typeof dbg !== 'undefined')
                        console.log('websocket Close');
                    var evCode = event.code;
                    var evReason = event.reason;

                    if (!evReason.length) {
                        if (me.wasError && me.closeFromClient !== true) {
                            evReason = "Возможно не запущен WS танго-сервер";
                            wasError = false;
                        }
                        else {
                            evReason = "WS соедиение закрыто";
                        }
                    }
                    Ext.toast({
                        title: name,
                        html: name + "<br>Error Code:" + evCode + "<br>" + evReason,
                        header: false,
                        width: 300,
                        align: 'tr'
                    });

                },
                error: function (ws) {
                    me.wasError = true;
                }
            }
        });
    },

    /**
     *
     * @param param
     */
    sendAjaxReqestForGettingWsHost: function (param, name) {
        // param for GEt
        // пока не передаётся логин и пароль
        // me.openws("ws://" + fromResponse['host'] + parForWs, outfunc);
        // Режим ReadOnly
        var me = this;
        var arl = arguments.length;
        // Пока для запуска одного метода
        if (arguments.length === 3)
            var outfunc = arguments[2];

        Ext.Ajax.request({
            url: '/cr_conf/extjs_cr_get_vars.php',
            method: 'GET',
            timeout: 2000,
            disableCaching: false,
            params: {
                type: "get_host",
                param: param
            },
            success: function (response, opts) {
                var fromResponse = Ext.util.JSON.decode(response.responseText);
                if ('host' in fromResponse) {
                    me.openws(fromResponse['host'],name, outfunc);
                } else if ('err' in fromResponse) {
                    me.messageErrorShow(fromResponse['err'],500);
                } else {
                    me.messageErrorShow("Неизветный ответ от сервера",300);
                }
            },
            failure: function (response, opts) {
                try {
                    var respData = Ext.JSON.decode(response.responseText);
                    if (respData.reason !== undefined)
                        me.messageErrorShow(respData.reason,500);
                    else if (respData.err_mess !== undefined)
                        me.messageErrorShow(respData.err_mess,500);
                }
                catch (e) {
                    me.messageErrorShow("Возможно нет доступа к конфигурационному <br>файлу <b>extjs_cr_get_vars.php</b>  проверьте его наличие",500);
                }
            }
        });
    },

    /**
     * Common function for destroying the panel
     * @param e
     * @param eOpts
     */
    panelDestroyed: function (e, eOpts) {
        if (typeof dbg !== 'undefined' && eOpts.title !== undefined )
            console.log(eOpts.title + ' Destoyed');
        var me = this;
        var ws = me.ws;
        if (ws !== undefined) {
            ws.close();
            me.closeFromClient = true;
        }
        if (typeof dbg !== 'undefined')
            console.log('WS Closed');
    },
    /**
     * Show error message
     * @param message
     * @param width
     */
    messageErrorShow: function (message,width) {
        var params = {
            title: 'Ошибка',
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK,
            message: message
        };

        if (width !== undefined && (typeof width === 'number')) {
            params.width = width;
        }

        Ext.Msg.show(params);
    }
});
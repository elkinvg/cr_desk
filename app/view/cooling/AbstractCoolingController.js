Ext.define('ControlRoomDesktop.view.cooling.AbstractCoolingController', {
    extend: 'Ext.app.ViewController',
    //mixins: ['Ext.ux.mixin.Mediator'],
    mixins: {
        commonMix: 'ControlRoomDesktop.common.CommonMixController'
    },

    getData: function (jsonData, Temp) {
        // Температура, выше которой высылается предупрдление
        var me= this;
        var warn_temp = ControlRoomDesktop.app.getSettFromLocalStorage("warning_temperature");


        try {
            var decodedString = Ext.decode(jsonData.responseText);
            var temperature = decodedString.data;

            if (me.device_for_req === undefined || me.rest_or_wshost === undefined) {
                var tango_device = decodedString.tango_device;
                var rest_or_wshost = decodedString.rest_or_wshost;

                if (tango_device === undefined || rest_or_wshost === undefined) {
                    warn_temperature_mess("Неправильные json-данные с сервера<br>нет ключа tango_device или rest_or_wshost");
                    return;
                }

                me.device_for_req = tango_device;
                me.rest_or_wshost = rest_or_wshost;
            }

            if (temperature === undefined)
            {
                warn_temperature_mess("Неправильные json-данные с сервера<br>нет ключа data или tango_device или rest_or_wshost");
                return;
            }

            // На данный момент с сервера приходят данные с 14 значениями

            var templength = 14;

            if (temperature.length !== templength)
            {
                warn_temperature_mess("Длина массива данных с температурами должна быть 14");
                return;
            }

            var tempIn = {};
            for (var i = 0; i < templength; i++){
                if (i<7) {
                    var key = "T_" + (i+1);
                }
                else {
                    var key = "T2_" + (i-6);
                }
                tempIn[key] = temperature[i];
            }

            info_temperature_mess();
            updateDataTemp(tempIn);

            /*if (success === true) {
                if (decodedString.argout === undefined) {
                    warn_temperature_mess();
                }
                else {
                    info_temperature_mess();
                    updateDataTemp(decodedString.argout);
                }

                
            }*/
        } catch (e) {
            warn_temperature_mess();
        }


        function warn_temperature_mess() {
            console.log("warn_temperature_mess");
            var time_warning_mes = Ext.ComponentQuery.query('[name=info_temp_mes]');
            var warning_message = '<h3><span style="color:red; font-size:150%"> Не удалось загрузить данные по температуре</span></h3>';
            Ext.each(time_warning_mes, function (component, index) {
                component.update(warning_message);
                component.setHidden(false);
            });
        }

        function info_temperature_mess() {
            var info_mes = Ext.ComponentQuery.query('[name=info_temp_mes]');
            Ext.each(info_mes, function (component, index) {
                var even_iter = component.even_iter;
                if (even_iter === undefined) {
                    component.even_iter = 1;
                    var info_message = '<h3><span style="color:blue"> Данные по температуре обновились</span></h3>';
                }
                else {
                    if (component.even_iter === 1) {
                        var info_message = '<h3><span style="color:green"> Данные по температуре обновились</span></h3>';
                        component.even_iter = 2;
                    } else if (component.even_iter === 2) {
                        var info_message = '<h3><span style="color:blue"> Данные по температуре обновились</span></h3>';
                        component.even_iter = 1;
                    }
                }
                
                component.update(info_message);
                component.setHidden(false);
            });
        }

        function updateDataTemp(temperature) {
            // Для проверки температуры
            var isHeatTemp = false;
            var maxTempDefault = 40;

            // Максимальная температура.
            // После превышения этой температуры выводится 
            // Предупреждающее сообщение
            if (warn_temp === undefined ||
                    warn_temp === null) {
                var maxTemp = maxTempDefault;
            } else {
                var maxTemp = warn_temp;
            }

            editTempOutByName(Temp, temperature);

            // Для вывода значения температуры на картинке
            // if t is ARRAY
            // Temp - from Ext.ComponentQuery.query
            function editTempOutByName(t, dataTemp) {
                Ext.Object.each(t,
                        function (key, value) {
                            var temperature = dataTemp[key];
                            var checkTmp = parseInt(temperature, 10);
                            if (isNaN(checkTmp) !== true) {
                                if (checkTmp > maxTemp) {
                                    isHeatTemp = true;
                                }
                            }

                            // Если температура выше критической, выделяется красным цветом
                            if (checkTmp > maxTemp) {
                                var text = '<span style="font-weight:bold; color:red; font-size:250%">' + temperature.toFixed(1) + '</span>';
                            } else {
                                //var text = '<span style="font-weight:bold; color:blue; font-size:300%">' + temperature.toFixed(1) + '</span>';
                                var text = '<span style="font-weight:bold; color:black; font-size:250%">' + temperature.toFixed(1) + '</span>';
                            }

                            Ext.each(value, function (component, index) {
                                component.setText(text, false);
                            });
                        });
            }
        }
    },
    //
    //
    //
    getUrlAndParamsForTemperature: function () {
        /// Происходит запрос на /cr_conf/scripts/get_data_from_restds.php
        /// В этом скрипте запрос перенаправляется на RESTDS сервер
        /// В БД должны быть прописаны для "alias": "oil_temp"
        ///                                 "host_from_db" : "oil_temp_rest"
        var me = this;

        if (me.device_for_req === undefined || me.rest_or_wshost === undefined) {
            var params = {
                "type_req" : "restds_read_attrs",
                "is_first_req": true,
                "attrs": "oil_temperature",
                "host_from_db": "oil_temp_rest",
                "alias": "oil_temp"
            }
        }
        else {
            var params = {
                "type_req" : "restds_read_attrs",
                "attrs": "oil_temperature",
                "device_for_req": me.device_for_req,
                "rest_or_wshost": me.rest_or_wshost
            }
        }

        // Для работы вне института использовать локальный php
        // должен также быть задан GET параметр home
        if(typeof HOME_DEBUG !== 'undefined') {
            var url_for_rest_req = "/cr_conf/home-debug.php";
        }
        else
            var url_for_rest_req = "/cr_conf/scripts/get_data_from_restds.php";

        return [url_for_rest_req,params];
    }
});
Ext.define('ControlRoomDesktop.view.cooling.AbstractCoolingController', {
    extend: 'Ext.app.ViewController',
    //mixins: ['Ext.ux.mixin.Mediator'],


    getData: function (jsonData, Temp) {
        // Температура, выше которой высылается предупрдление
        var warn_temp = ControlRoomDesktop.app.getSettFromLocalStorage("warning_temperature");


        try {
            var decodedString = Ext.decode(jsonData.responseText);
            var success = decodedString.success;

            if (success === true) {
                if (decodedString.argout === undefined) {
                    warn_temperature_mess();
                }
                else {
                    info_temperature_mess();
                    updateDataTemp(decodedString.argout);
                }
                
            }
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
    }
});
Ext.define('ControlRoomDesktop.view.rfq.Rfq_controlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rfq_control',
    arrayProtection: ['X0', 'X1', 'M24', 'X10', 'X11', 'M25'], // элементы защиты
    arraySystem: ['M45', 'X3', 'X13'], // элементы системы
    arrayOfRegisters: ['D46', 'D9', 'D98'], // элементы с выводом значений
    arrayOfSetReg: ['D68', 'D66'], // заданные значения тока и напряжения
    dataArrayOfFlags: {},
    dataArrayOfRegisters: {},
    init: function () {
        var thisOut = this;
        var array = this.arrayProtection;
        this.arraySystem.forEach(function (item, i, arr) {
            array.push(item)
        });

        var arrayOfRegisters = this.arrayOfRegisters;
        var arrayOfSetReg = this.arrayOfSetReg;

        //var prop = Ext.create('ControlRoomDesktop.oth.Property');
        var prop = Ext.create('Common_d.Property');
        
        var firstIter = true;

        var task = {
            run: function () {
                var dStore = Ext.data.StoreManager.lookup('regnflagStore');
                
                // установка прокси. Взятие url, из файла конфига
                dStore.getProxy().setUrl(prop.getUrltan());


                dStore = dStore.load(
                        {
                            callback: function (records, operation, success) {
                                var stateOv = thisOut.lookupReference('onOffPanel');
                                var hvm = thisOut.lookupReference('highVoltageMod');
                                var ventButton = thisOut.lookupReference('ventilatorButton');
                                if (!success) {
                                    console.log('DONT SUCCESS');
                                    // смена цвета всех индикаторв на красный
                                    thisOut.dataArrayOfFlags = {};
                                    thisOut.dataArrayOfRegisters = {};
                                    thisOut.changeStatusColor(array);
                                    thisOut.changeValuesOfLabels(arrayOfRegisters, 'value');
                                    hvm.disable();
                                    stateOv.disable();
                                } else {
                                    if (typeof dbg !== 'undefined')
                                        console.log('Task Runner Clock:' + Ext.Date.format(new Date(), 'g:i:s A'));
                                    // Получение данных из ControlRoomDesktop.store.RegnflagsStr для флагов
                                    var dataArray = thisOut.generateDataArray(dStore, array);
                                    // Изменение цвета статуса для панели вывода состояния
                                    thisOut.dataArrayOfFlags = dataArray;
                                    thisOut.changeStatusColor(dataArray);


                                    // блокировка всех кнопок, если выключено внешнее управление
                                    if (dataArray['M24'].data['value'] === 0) {
                                        hvm.disable();
                                        stateOv.disable();
                                    } else
                                    {
                                        // если внешнее управление включено, проверка статусов
                                        // для блокировки/разблокировки кнопок включеия накала, и ВНМ   
                                        stateOv.enable();
                                        var isHeat = true;
                                        var isBhm = true;
                                        var isAll = true;
                                        Ext.Object.each(dataArray, function (key, value) {
                                            if (key !== 'X13' && key !== 'X3' && value.data.value === 0)
                                            {
                                                isHeat = false;
                                                isBhm = false;
                                                isAll = false;
                                            }
                                            if (key === 'X3' && value.data.value === 0) {
                                                isBhm = false;
                                                isAll = false;
                                            }
                                            if (key === 'X13' && value.data.value === 0)
                                            {
                                                isAll = false;
                                            }
                                        });

                                        var heatButton = thisOut.lookupReference('heatButton');
                                        if (isHeat) {
                                            heatButton.enable();
                                            ventButton.enable();
                                        }
                                        else
                                            heatButton.disable();
                                        
                                        var bhmButton = thisOut.lookupReference('bhmButton');
                                        if (isBhm) {
                                            bhmButton.enable();
                                            ventButton.disable();
                                        }                                        
                                        else
                                            bhmButton.disable();
                                        
                                        var hvm = thisOut.lookupReference('highVoltageMod');
                                        if (isAll) {
                                            heatButton.disable();
                                            hvm.enable();
                                        }
                                        else
                                            hvm.disable();
                                    }



                                    // Получение данных из ControlRoomDesktop.store.RegnflagsStr для регистров
                                    dataArray = thisOut.generateDataArray(dStore, arrayOfRegisters);
                                    thisOut.dataArrayOfRegisters = dataArray;

                                    thisOut.changeValuesOfLabels(dataArray, 'value');
                                    if (firstIter) {
                                        // установка значений, заданных последними, в numberfieldы
                                        var tmpData = thisOut.generateDataArray(dStore, arrayOfSetReg);
                                        var tmp = thisOut.getView().getForm().findField("D68");
                                        tmp.setValue(tmpData['D68'].data.value);
                                        var tmp = thisOut.getView().getForm().findField("D66");
                                        tmp.setValue(tmpData['D66'].data.value);
                                        firstIter = false;
                                    }

//                                    var form = thisOut.getView().getForm();
//                                    thisOut.testing(dataArray);
                                }
                            }
                        });
            },
            interval: 5000 // 5 second
        };
        thisOut.runner = new Ext.util.TaskRunner();
        thisOut.runner.start(task);
    },
//    testing: function (dataArray){
//        var iid = dataArray['X0'].getId();
//    },

    changeStatusColor: function (inputArray) {
        var out = this;
        // возвращает заголовок панели со статусом
        var statusFunc = function (color) {
            return 'Панель управления RFQ  <span style="color:' + color + '; font-size:150%"> &#9899; </span>'
        };
        var statusOverall = function (color) {
            return 'Состояние элементов защиты  <span style="color:' + color + '; font-size:150%"> &#9899; </span>'
        };
        // определение статуса работы сервера. Если связи нет inputArray обычный массив
        var isArray = Array.isArray(inputArray);
        // статус выставляется в заголовок панели управления
//        var statePanelTitle = out.lookupReference('connectStatus');
        var statePanelTitle = this.getView();
        var stateOv = out.lookupReference('connectStatus');

        if (isArray === true) {
            inputArray.forEach(function (item) {
                var grid = out.lookupReference(item);
                var colorSpan = '<span style="color:red; font-size:300%"> &#9899; </span>';
                if (grid.xtype === 'displayfield')
                    grid.setValue(colorSpan);
                if (grid.xtype === 'label')
                    grid.setText(colorSpan, false);

            });

            statePanelTitle.setTitle(statusFunc('red'));
            stateOv.setTitle(statusOverall('red'));
            return;
        }

        var rfqConnectStatus = false;
        var securityElemStatus = false;
        var statuses = this.changeValuesOfLabels(inputArray, 'status');
        rfqConnectStatus = statuses[0];
        securityElemStatus = statuses[1];

        var color = (rfqConnectStatus) ? 'green' : 'red';
        statePanelTitle.setTitle(statusFunc(color));
        var color = (securityElemStatus) ? 'green' : 'red';
        stateOv.setTitle(statusOverall(color));
    },
    //
    //
    //
    generateDataArray: function (store, arrayOfFlags) {
        // формирование ассоциативного массива необходимых флагов
        // В rfq_control определены формы с соответсвующими именами свойством reference
        var dataArray = {};
        arrayOfFlags.forEach(function (item) {
            dataArray[item] = store.getAt(store.find('name', item));
        });
        return dataArray;
    },
    //
    //
    //
    changeValuesOfLabels: function (inputArray, flagOrReg) {
        // Изменение значений в выводе или цвета статуса
        var out = this;
        var rfqConnectStatus = false;
        var securityElemStatus = true;

        // Получение строки в зависимости от типа вывода
        getSparWithValue = function (val, dim) {
            return '<span style="font-size:200%"> ' + val + '' + dim + '</span>';
        };

        // установка значений в выводах тока и напряжения
        setGridValue = function (gridInp, itemInp, getValueInp) {
            if (itemInp === 'D46' || itemInp === 'D98')
                if (itemInp === 'D46')
                    getValueInp = getValueInp / 10;
            gridInp.setValue(getSparWithValue(getValueInp, 'B'));
            if (itemInp === 'D9')
                gridInp.setValue(getSparWithValue(getValueInp / 100, 'мА'));
        };

        // если нет связи с танго-сервером. Все значения устанавливаются в ноль
        var isArray = Array.isArray(inputArray);
        if (isArray === true && flagOrReg === 'value') {
            inputArray.forEach(function (item) {
                var grid = out.lookupReference(item);
                setGridValue(grid, item, 0);
            });
            return;
        }

        Ext.Object.each(inputArray, function (key, value) {
            var i = key.toString();
            var grid = out.lookupReference(i);
            var xtypeI = grid.xtype;
            rfqConnectStatus = value.data['readStatus'];

            if (rfqConnectStatus === 1)
                rfqConnectStatus = true;
            if (rfqConnectStatus === 0)
                rfqConnectStatus = false;

            // если вывод обозначет статус (взят с флага)
            if (flagOrReg === 'status') {
                var color = (value.data['value'] === 1 && rfqConnectStatus === true) ? 'green' : 'red';
                var colorSpan = '<span style="color:' + color + '; font-size:300%"> &#9899; </span>';
                if (xtypeI === 'displayfield')
                    grid.setValue(colorSpan);
                if (xtypeI === 'label')
                    grid.setText(colorSpan, false);
                if (i !== 'M45' && i !== 'X3' && i !== 'X13') {
                    // для выставления статуса "Состояния элементов защиты"
                    // если хотя бы один элемент false. securityElemStatus = false.
                    securityElemStatus = securityElemStatus & value.data['value'];
                }
            } else
            // если вывод обозначет значение (взят с регистра)
            if (flagOrReg === 'value') {
                var getValue = (rfqConnectStatus === true) ? value.data['value'] : 0;
                setGridValue(grid, i, getValue);
            }
        });
        securityElemStatus = rfqConnectStatus & securityElemStatus;
        return [rfqConnectStatus, securityElemStatus];
    },
    //
    //
    //
    ventilatorClick: function () {
        if (typeof dbg !== 'undefined')
            console.log('ventilatorClick');
        this.functionForClick("M3");
    },
    //
    //
    //
    heatClick: function () {
        if (typeof dbg !== 'undefined')
            console.log('heatClick');
        this.functionForClick("M1");
    },
    //
    //
    //
    bhmClick: function () {
        if (typeof dbg !== 'undefined')
            console.log('bhmClick');
        this.functionForClick("M5");
    },
    //
    //
    //
    functionForClick: function (name) {
        var input = this.gettingDataForSendingToAjax(name);
        if (input.length === 0)
            return;
        this.sendAjaxFromButtonClick(input);
    },
    //
    //
    //
    hvInstClick: function () {
        var thisOut = this;
        var send = function (reg) {
            var tmp = thisOut.getView().getForm().findField(reg);
            var input = [reg];
            var getVal = tmp.getValue();
            if (getVal < 0 || getVal > 60000 || getVal === null)
                return;
            input.push(getVal);
            thisOut.sendAjaxFromButtonClick(input);
        };
        var task = new Ext.util.DelayedTask(function () {
            send("D66");
        });
        send("D68");
        task.delay(300);
    },
    //
    //
    //
    sendAjaxFromButtonClick: function (input) {
        //var prop = Ext.create('ControlRoomDesktop.oth.Property');
        var prop = Ext.create('Common_d.Property');

        var url = prop.getUrlwrite();
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            username: localStorage.getItem("login"),
            password: localStorage.getItem("password"),
//            method: 'POST',
            timeout: 2000,
            disableCaching: false,
            params: {
                argin: input
            },
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                //console.dir(obj);
                if (typeof dbg !== 'undefined')
                    console.log(obj);
            },
            failure: function (response, opts) {
                if (typeof dbg !== 'undefined')
                    console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //
    //
    //
    gettingDataForSendingToAjax: function (nameFlag) {
        var output = [];
        var size = Ext.Object.getSize(this.dataArrayOfFlags);
        if (size === 0)
            return output;

        output.push(nameFlag);
        var key;
        if (nameFlag === 'M3')
            key = 'M45';
        else if (nameFlag === 'M1')
            key = 'X3';
        else if (nameFlag === 'M5')
            key = 'X13';
        var onOrOff = this.dataArrayOfFlags[key].data['value']; //.data['value'];
        if (onOrOff === 0 || onOrOff === false) {
            output.push(1);
        } else if (onOrOff === 1 || onOrOff === true) {
            output.push(0);
        }
        return output;
    },
    //
    //
    //
    panelDestroyed: function (e, eOpts) {
        this.runner.destroy();
        if (typeof dbg !== 'undefined')
            console.log('RFQ-panel Destoyed');
    }
});



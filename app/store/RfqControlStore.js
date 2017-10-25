Ext.define('ControlRoomDesktop.store.RfqControlStore', {
    extend: 'Ext.data.Store',
    storeId: 'rfqcontrolStore',
    alias: 'store.rfqcontrolstore',

    //autoload: true,

    fields : [
        // Состояние элементов защиты
        'X0',
        'X1',
        'M24',
        'X10',
        'X11',
        'M25',
        // Выключение (статус) системы
        'M45',
        'X3',
        'X13',
        'M7',
        // Высокое напряжение модулятора
        'D68',
        'D66',
        'D61',
        'D98',
        // Высокое напряжение Банчера RFQ
        'D58',
        'D106',
        'D63',
        'D116'
    ],
    proxy : {
        type: 'memory',
        storeId: 'rfqcontrolStore'
    }
});
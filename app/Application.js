// Для вывода debug
// GET-> adddress/?dbg=1
var get_params = Ext.urlDecode(location.search.substring(1));

if (get_params.dbg !== undefined) {
    dbg = "";
}


if (get_params.anon !== undefined) {
    anon_user = "";
}

if ("home" in get_params) {
    HOME_DEBUG = true;
}




Ext.define('ControlRoomDesktop.Application', {
    extend: 'Ext.ux.desktop.App',
    login: localStorage.getItem("login"),
    passw: localStorage.getItem("password"),
    
    requires: [
        'Ext.state.*',
        'Ext.window.MessageBox',
        'Ext.window.Toast',
        'Ext.ux.desktop.ShortcutModel',

        'ControlRoomDesktop.widgets.LensCoolingWidget',
        'ControlRoomDesktop.widgets.MagnetCoolingWidget',
        'ControlRoomDesktop.widgets.LcOutWidget',
        'Login.view.login.LoginCheck',
        //LHF
        'ControlRoomDesktop.widgets.BuvLhfControlWidget',
        // PKT_8
        //'ControlRoomDesktop.widgets.Pkt8TempWidget',
        // in extjs 6.2
        'ControlRoomDesktop.widgets.RfqWidget',
        'Ext.layout.container.boxOverflow.Menu',
        'ControlRoomDesktop.widgets.LogOutWidget'
    ],
    

    init: function () {
        
        if (this.login===null || this.passw===null) {
            // Пока без авторизации
            if (typeof anon_user === 'undefined') {
                Ext.widget('logincheck');
                return;
            }
            else {
                this.login = 'anon';
            }
        }
        //
        if (get_params.widgout !== undefined) {
            if (this.isWidgOut()) {
                return;
            }
        }
        
        Ext.toast({
            html: 'Hello, ' + this.login,
            header: false,
            width: 200,
            align: 'tr'
        });
        this.callParent();
    },
    //
    //
    //
    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();
        var toolConfItems = new Array();
        if ((this.login !== null && this.login !== 'anon') || (this.passw !== null && this.passw !== 'anon')) {
            /*toolConfItems.push({
                text: 'Выйти',
                iconCls: 'logout',
                handler: me.onLogout,
                scope: me
            });
        /*toolConfItems.push('-');
        toolConfItems.push({
            text: 'Настройки',
            iconCls: 'settings',
            handler: me.openSetPage,
            scope: me
        });*/
        }

        
        return Ext.apply(ret, {
            //title: localStorage.getItem("Login"),
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: toolConfItems
            }
        });
    },
    //
    //
    //
    getTaskbarConfig: function () {
        var ret = this.callParent();
        var forTrayItems = [
            {xtype: 'trayclock', flex: 1, timeFormat: 'H:i'}
        ];
        return Ext.apply(ret, {
            trayItems: forTrayItems
        });
    },
    //
    //
    //
    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        var dataFor = new Array();
        // проверка наличия логина и пароля в localStorage
        // также предполагается добавлять элементы в зависимости от клиента ... 
        // использовать настройки клиента
        
        // Модули только для зарегистрированных 
        if ((this.login !== null && this.login !== 'anon') || (this.passw !== null && this.passw !== 'anon') ) {
            forUser();
            forAnon();
        }
        // Для анон
        else {
            forAnon();
        }
        
        // add context menuItem
        var contextFor = new Array();
        // add logout button
        if ((this.login !== null && this.login !== 'anon') || (this.passw !== null && this.passw !== 'anon')) {
            /*contextFor.push({
                text: 'Выход',
                handler: me.onLogout,
                scope: me
            });*/
        }
        
        function forAnon() {
            // Модули для анонимного пользователя
            dataFor.push({name: 'Magn Cool 11',text: "Охлаждение магнитов", iconCls: 'magn_48', module:'magncool_widg'}); //'Охлаждение магнитов'
            dataFor.push({name: 'LensCool',text: "Охлаждение линз", iconCls: 'cooling_small_l_48', module:'lenscool_widg'}); //'Охлаждение линз'
            dataFor.push({name: 'LensControl',text: "Питание линз", iconCls: 'ps_icon_48x48', module:'lcout_widg'}); //'Питание линз'
            // LHF
            dataFor.push({name: 'BuvLhf',text: "ЛЖФ", iconCls: 'buvlhf_48x48', module:'lhf_widg', pos: 1}); // 'Линзы жёсткой фокусировки'
            // ??? !!! test
            //dataFor.push({name: 'PKT-8',text: "ПКТ-8", iconCls: 'ps_icon_48x48', module:'pkt8temp_widg'}); // ??? ИЗМЕНИТЬ!!!
            dataFor.push({name: 'RFQ-control',text: "Модулятор RFQ", iconCls: 'rfq_48x48', module:'rfq-widg'}); //'Охлаждение магнитов'
            dataFor.push({name: 'Log',text: 'Журнал', iconCls: 'log_48x48', module:'logout_widg'}); //'Журнал'
        }
        
        function forUser() {
            // Модули для зарегистрированного пользователя
        }
        
        return Ext.apply(ret, {
//            wallpaper: 'resources/images/wallpapers/desktop.jpg',
            wallpaper: 'resources/images/wallpapers/desktopLhep.jpg',

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: dataFor
            }),
            shortcutTpl:[
                '<tpl for=".">'
                ,   '<div class="ux-desktop-shortcut" id="{name}-shortcut">'
                ,       '<div class="ux-desktop-shortcut-icon {iconCls}">'
                ,           '<img src="',Ext.BLANK_IMAGE_URL,'" title={name}>'
                ,       '</div>'
                ,       '<span class="ux-desktop-shortcut-text">{text}</span>'
                ,   '</div>'
                ,'</tpl>'
            ],
            /*
            // Если понадобится несколько столбцов для ярлыков
            // также нужно определить pos = 1 и pos = 0
             '<table>'
             ,'<tpl for=".">'

             , '<tpl if="pos == 0 ">'
             , '<tr>'
             , '</tpl>'

             , '<td>'
             ,   '<div class="ux-desktop-shortcut" id="{name}-shortcut">'
             ,       '<div class="ux-desktop-shortcut-icon {iconCls}">'
             ,           '<img src="',Ext.BLANK_IMAGE_URL,'" title={name}>'
             ,       '</div>'
             ,       '<span class="ux-desktop-shortcut-text">{text}</span>'
             ,   '</div>'
             , '</td>'


             , '<tpl if="pos == 1 ">'
             , '</tr>'
             , '</tpl>'

             ,'</tpl>'
             ,'</table>'
             */
            contextMenuItems: contextFor
        });
    },
    //
    //
    //
    getModules : function(){
        var modules = new Array();
        
        // Модули только для зарегистрированных 
        if ((this.login !== null && this.login !== 'anon') || (this.passw !== null && this.passw !== 'anon') ) {
            forAnon();
            forUser();
        }
        // Для анон
        else {
            forAnon();
        }
        
        function forAnon() {
            // Модули для анонимного пользователя
            modules.push(new ControlRoomDesktop.widgets.LensCoolingWidget());
            modules.push(new ControlRoomDesktop.widgets.MagnetCoolingWidget());
            modules.push(new ControlRoomDesktop.widgets.LcOutWidget());
            // LHF
            modules.push(new ControlRoomDesktop.widgets.BuvLhfControlWidget());
            // ??? !!! tmp
            //modules.push(new ControlRoomDesktop.widgets.Pkt8TempWidget());
            modules.push(new ControlRoomDesktop.widgets.RfqWidget());
            modules.push(new ControlRoomDesktop.widgets.LogOutWidget());

        }
        
        function forUser() {
            // Модули для зарегистрированного пользователя
        }
        
        return modules;       
    },
    //
    //
    //
    onLogout: function() {
        window.location.reload();
        localStorage.removeItem('login');
        localStorage.removeItem('password');
        localStorage.removeItem('user_type');
        localStorage.removeItem('rand_ident');
        localStorage.removeItem('use_rand_ident');
    },
    //
    //
    //
    openSetPage: function() {
        // Будет открываться страница общей настройки для пользователя
        window.open("/");
    },
    //
    //
    //
    isWidgOut: function () {
        // Используется для открытия виджетов в отдельном окне
        // если в GET имеется widgout="имя_элемента" откроется соответствующий виджет
        var headerHeight = 46;
        if (get_params.widgout === "magn_cool") {
            magnCoolOut();
            return true;
        }
        if (get_params.widgout === "lens_cool") {
            lensCoolOut();
            return true;
        }
        if (get_params.widgout === "buv_lhf") {
            buvLhfOut();
            return true;
        }
        if (get_params.widgout === "rfq") {
            rfqOut();
            return true;
        }
        return false;

        // Виджет охлаждения магнитов
        function magnCoolOut() {
            document.title = 'Охлаждение магнитов';
            var panel = Ext.create({
                xtype: 'panel',
                frame: true,
                renderTo: document.body,
                height: 690 - headerHeight,
                width: 800,
                items: [
                    {
                        xtype: 'magn_cooling'
                    }
                ]
            });
        }

        // Виджет охлаждения линз
        function lensCoolOut() {
            document.title = 'Охлаждение линз';
            var panel = Ext.create({
                xtype: 'panel',
                frame: true,
                renderTo: document.body,
                height: 500 - headerHeight,
                width: 500,
                items: [
                    {
                        xtype: 'lens_cooling'
                    }
                ]
            });
        }

        // Управление ЛЖФ пучка в ЛУ-20
        function buvLhfOut() {
            document.title = 'Управление ЛЖФ пучка в ЛУ-20';
            var panel = Ext.create({
                xtype: 'panel',
                frame: true,
                renderTo: document.body,
                height: 630 - headerHeight,
                width: 1024,
                items: [
                    {
                        xtype: 'buv_lhf'
                    }
                ]
            });
        }
        // Модулятор RFQ
        function rfqOut() {
            document.title = 'Модулятор RFQ';
            var panel = Ext.create({
                xtype: 'panel',
                frame: true,
                renderTo: document.body,
                height: 760 - headerHeight,
                width: 525,
                items: [
                    {
                        xtype: 'rfq_control'
                    }
                ]
            });
        }
    },
    //
    //
    //
    outButtonClick: function(win, name) {
        // id button must be name+out_button
        var idButton = name + "_out_button";

        Ext.get(idButton).on('click', function() {
            // Получение ширины хедера ExtJs панели
            var headerHeight = win.header.getHeight();
            // Получение zoom страницы
            // Скрипт определён в "app/other/detect-zoom.js"
            var zoom = detectZoom.zoom();
            //var device = detectZoom.device();

            var winh = win.height - headerHeight;
            var winw = win.width;
            var winhnew = Math.round(winh*zoom);
            var winwnew = Math.round(winw*zoom);
            
            var winhw = 'width=' + winwnew + ',height=' + winhnew;
            var href = window.location.href;

            // Добавление GET параментра для открытия виджета
            if (href.indexOf("?") === -1) {
                href += ('?widgout=' + name);
            }
            else {
                href += ('&widgout=' + name);
            }
            win.close();
            // Открытие отдельного окна
            // Заданы вычесленные ширина и высота
            window.open(href, name, winhw);
        });
    }
    
});

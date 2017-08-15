// Для вывода debug
// GET-> adddress/?dbg=1
var get_params = Ext.urlDecode(location.search.substring(1));

if (get_params.dbg === '1') {
    dbg = "";
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
//        'ControlRoomDesktop.widgets.RfqWidget',
        'ControlRoomDesktop.widgets.LensCoolingWidget',
        'ControlRoomDesktop.widgets.MagnetCoolingWidget',
        'ControlRoomDesktop.widgets.LcOutWidget',
        'Login.view.login.LoginCheck',
        //LHF
        'ControlRoomDesktop.widgets.BuvLhfControlWidget',
        // in extjs 6.2
        'Ext.layout.container.boxOverflow.Menu'
    ],
    

    init: function () {
        
        if (this.login===null || this.passw===null) {
            // Пока без авторизации
            /*Ext.widget('logincheck');
            return;*/
            this.login = 'anon';
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
        //var rfqControl = {name: 'RFQ-контоль', iconCls: 'cpu-shortcut', module:'rfq-widg'};
        var dataFor = new Array();
        // проверка наличия логина и пароля в localStorage
        // также предполагается добавлять элементы в зависимости от клиента ... 
        // использовать настройки клиента
        
        // Модули только для зарегистрированных 
        if ((this.login !== null && this.login !== 'anon') || (this.passw !== null && this.passw !== 'anon') ) {
            //dataFor.push({name: 'RFQ-контоль', iconCls: 'cpu-shortcut', module:'rfq-widg'});
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
            dataFor.push({name: 'MagnCool', iconCls: 'magn_48', module:'magncool_widg'}); //'Охлаждение магнитов'
            dataFor.push({name: 'LensCool', iconCls: 'cooling_small_l_48', module:'lenscool_widg'}); //'Охлаждение линз'
            dataFor.push({name: 'LensControl', iconCls: 'ps_icon_48x48', module:'lcout_widg'}); //'Питание линз'
            // LHF
            dataFor.push({name: 'BuvLhf', iconCls: 'ps_icon_48x48', module:'lhf_widg'}); // 'Линзы жёсткой фокусировки'
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
//            modules.push(new ControlRoomDesktop.widgets.RfqWidget());            
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
    }
    
});

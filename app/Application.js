/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('ControlRoomDesktop.Application', {
//    extend: 'Ext.app.Application',
    extend: 'Ext.ux.desktop.App',
    login: localStorage.getItem("login"),
    passw: localStorage.getItem("password"),
    
    //name: 'ControlRoomDesktop',
    
    requires: [
        'Ext.state.*',
        'Ext.window.MessageBox',
        'Ext.window.Toast',
        'Ext.ux.desktop.ShortcutModel',
        //'ControlRoomDesktop.widgets.RfqWidget',
        'ControlRoomDesktop.widgets.LensCoolingWidget',
        'ControlRoomDesktop.widgets.MagnetCoolingWidget',
        'ControlRoomDesktop.widgets.LcOutWidget',
        'Login.view.login.LoginCheck'
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
        /*toolConfItems.push({
            text: 'Выйти',
            iconCls: 'logout',
            handler: me.onLogout,
            scope: me
        });
        toolConfItems.push('-');
        toolConfItems.push({
            text: 'Настройки',
            iconCls: 'settings',
            handler: me.openSetPage,
            scope: me
        });*/
        
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
        // использовать настройки клиентаs
        // Модули только для зарегистрированных 
        if ((this.login !== null && this.login !== 'anon') || (this.passw !== null && this.passw !== 'anon') ) {
            //dataFor.push({name: 'RFQ-контоль', iconCls: 'cpu-shortcut', module:'rfq-widg'});            
        }
        // Для анон
        else {
            dataFor.push({name: 'Охлаждение магнитов', iconCls: 'magn_48', module:'magncool_widg'});
            dataFor.push({name: 'Охлаждение линз', iconCls: 'cooling_small_l_48', module:'lenscool_widg'});
            dataFor.push({name: 'Питание линз', iconCls: 'ps_icon_48x48', module:'lcout_widg'});
        }
        
        // add context menuItem
        var contextFor = new Array();
        // add logout button
        contextFor.push({
            text: 'Выход',
            handler: me.onLogout,
            scope: me
        });
        
        return Ext.apply(ret, {
            wallpaper: 'resources/images/wallpapers/desktop.jpg',
            
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
            //modules.push(new ControlRoomDesktop.widgets.RfqWidget());            
        }
        // Для анон
        else {
            modules.push(new ControlRoomDesktop.widgets.LensCoolingWidget());
            modules.push(new ControlRoomDesktop.widgets.MagnetCoolingWidget());
            modules.push(new ControlRoomDesktop.widgets.LcOutWidget());
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

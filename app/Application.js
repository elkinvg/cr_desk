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
    
    requires: [
        'Ext.state.*',
        'Ext.window.MessageBox',
        'Ext.window.Toast',
        'Ext.ux.desktop.ShortcutModel',
        'ControlRoomDesktop.widgets.RfqWidget',
        'Login.view.login.LoginCheck'
    ],
    
    init: function () {
        if (this.login===null || this.passw===null) {
            Ext.widget('logincheck');
            return;
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
        toolConfItems.push({
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
        });
        
        return Ext.apply(ret, {
            title: localStorage.getItem("Login"),
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
        var rfqControl = {name: 'RFQ-контоль', iconCls: 'cpu-shortcut', module:'rfq-widg'};
        var dataFor = new Array();
        // проверка наличия логина и пароля в localStorage
        // также предполагается добавлять элементы в зависимости от клиента ... 
        // использовать настройки клиентаs
        if (this.login !== null || this.passw !== null) {
            dataFor.push(rfqControl);
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
                data: dataFor,
            }),
            contextMenuItems: contextFor
        });
    },
    //
    //
    //
    getModules : function(){
        var modules = new Array();
        
        if (this.login !== null || this.passw !== null) {
            modules.push(new ControlRoomDesktop.widgets.RfqWidget());
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
        localStorage.removeItem('priority');
    },
    //
    //
    //
    openSetPage: function() {
        // Будет открываться страница общей настройки для пользователя
        window.open("/");
    }
    
});

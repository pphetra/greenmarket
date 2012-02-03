Ext.ns("app.form");

popStack = {
    stacks: [],
    push: function(tabItem, record) {
        this.stacks.push({
            tabItem: tabItem,
            record: record
        })
    },
    pop: function() {
        return this.stacks.pop();
    }
}

new Ext.Application({
    name: 'app',

    launch: function() {

        this.spash = new Ext.Panel({
            modal: true,
            floating: true,
            centered: true,
            width: 1000,
            height: 700,
            styleHtmlContent: true,
            html: '<img src="/images/greenfair.jpg" height="100%" width="100%"/>',
            dockedItems: [
                {
                    dock: 'top',
                    xtype: 'toolbar',
                    title: 'เครือข่ายร้านกรีน'
                }
            ]
        });
        this.spash.show();


        Ext.util.Functions.defer(function() {
            this.spash.hide();
            this.viewport = new Ext.TabPanel({
                programSwitch: false,
                cls: 'watermark',
                fullscreen: true,
                tabBar: {
                    height: 72,
                    dock: 'bottom',
                    layout: {
                        pack: 'center'
                    }
                },
                ui: 'dark',
                listeners: {
                    'beforecardswitch': function(comp, card) {
                        console.log(arguments);
                        if (! app.viewport.programSwitch) {
                            popStack.stacks.length = 0;
                            card.reset();
                            app.viewport.doLayout()
                        }
                    }
                },
                items: [
                    productPanel,
                    standardPanel,
                    supplierPanel
                ]
            })
        }, 1000, this)
    }
});
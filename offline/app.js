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
        this.viewport = new Ext.TabPanel({
            programSwitch: false,
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
                'beforecardswitch': function(comp) {
                    if (! app.viewport.programSwitch) {
                        popStack.stacks.length = 0;
                    }
                }
            },
            items: [
                productPanel,
                {
                    title: 'มาตรฐาน'
                },
                supplierPanel
            ]
        })
    }
});
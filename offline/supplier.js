Ext.ns("app.form");

supplierListPanel = new Ext.Panel({
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    items: [{
        xtype: 'list',
        height: 500,
        width: 300,
        store: supplierStore,
        itemTpl: '<div class="category">{name}</div>',
        onItemDisclosure: function(record) {
            supplierDetail.down('toolbar').setTitle(record.get('name'));
            supplierDetail.loadRecord(record);
            supplierDetail.currentRecord = record;
            supplierPanel.layout.next({
                type: 'slide',
                direction: 'left'
            });
        }
    }]
});

supplyProductPanel = new Ext.Panel({
    floating: true,
    modal: true,
    layout: 'card',
    centered: false,
    width: 400,
    height: 800,
    styleHtmlContent: true,
    items: [
        {
            xtype: 'list',
            itemTpl: '<div class="category">{name}</div>',
            store: supplyProductStore,
            onItemDisclosure : function(record) {
                supplyProductPanel.hide();
                productPopup.showRecord(record, supplierPanel);
            }
        }
    ]
});

supplyProductDetail = new Ext.form.FormPanel({
    scroll: 'vertical',
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            title: 'Product',
            items: [
                {
                    ui: 'back',
                    text: 'back',
                    handler: function() {
                        supplierPanel.setActiveItem(supplierDetail);
                        supplyProductPanel.showBy(supplierDetail.down('#supplyProductBtn'));
                    }
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'displayfield',
            name: 'name',
            label: 'Name'
        },
        {
            xtype: 'displayArea',
            name: 'description',
            label: 'Description',
            maxRows: 10
        },
        {
            xtype: 'displayfield',
            name: 'supplierName',
            label: 'Company',
            style: 'background: white'
        },
        {
            xtype: 'standardfield',
            name: 'standardId',
            itemId: 'standardField',
            zoomable: true,
            style: 'background: white;',
            zoomFn: function() {
                standardPopup.setStandard(supplyProductDetail.currentRecord.get('standardId'));
                standardPopup.show('pop');
            },
            label: 'Standard'
        },
        {
            xtype: 'imagefield',
            itemId: 'imageField',
            height: 500
        }
    ]
})

supplierDetail = new Ext.form.FormPanel({
    scroll: 'vertical',
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            title: '',
            items: [
                {
                    ui: 'back',
                    text: 'Back',
                    handler: function () {
                        if (popStack.stacks.length > 0) {
                            var tmp = popStack.pop();
                            app.viewport.setActiveItem(tmp.tabItem, {
                                type: 'slide',
                                direction: 'right'
                            });
                            if (tmp.record) {
                                tmp.tabItem.pop(tmp.record);
                            }

                        } else {
                            supplierPanel.layout.prev({
                                type: 'slide',
                                direction: 'right'
                            });
                        }
                    }
                },
                {
                    xtype: 'spacer'
                },
                {
                    text: 'สินค้าที่ผลิต',
                    ui: 'decline',
                    id: 'supplyProductBtn',
                    handler: function() {
                        supplyProductPanel.showBy(this)
                        supplyProductStore.clearFilter();
                        supplyProductStore.filter('supplierId', supplierDetail.currentRecord.get('id'));
                    }

                }
            ]
        }
    ],
    items: [
        {
            xtype: 'displayfield',
            name: 'name',
            label: 'Name'
        },
        {
            xtype: 'displayArea',
            name: 'description',
            label: 'Description',
            maxRows: 20
        }
    ]
});

supplierPanel = new Ext.Panel({
    title: 'ผู้ผลิต',
    iconCls  : 'team',
    layout: 'card',
    readyToReset: false,
    items: [
        supplierListPanel,
        supplierDetail,
        supplyProductDetail
    ],

    /**
     * call จากหน้าจออื่นๆ เท่านั้น
     */
    display: function(id) {
        app.viewport.programSwitch = true;
        app.viewport.setActiveItem(this);

        this.setActiveItem(supplierDetail);
        app.viewport.programSwitch = false;

        var record = supplierStore.getById(id);

        this.setSupplier(record);

    },

    listeners: {
        afterrender : function() {
            supplierPanel.readyToReset = true;
        }
    },

    setSupplier: function(record) {
        supplierDetail.down('toolbar').setTitle(record.get('name'));
        supplierDetail.loadRecord(record);
        supplierDetail.currentRecord = record;
    },

    reset: function() {
        if (this.readyToReset) {
            console.log('hi');
            this.setActiveItem(supplierListPanel);
        }
    }

});


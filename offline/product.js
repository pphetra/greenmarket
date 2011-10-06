Ext.ns("app.form");

categoryPanel = new Ext.Panel({
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    items: [{
        xtype: 'list',
        height: 500,
        width: 300,
        store: categoryStore,
        itemTpl: '<div class="category">{name}</div>',
        onItemDisclosure: function(record) {
            productPanel.layout.next({
                type: 'slide'
            });
            productStore.clearFilter();
            productStore.filter('categoryId', record.get('id'));

            var list = productDetailPanel.down('list');
            Ext.each(list.getSelectedRecords(), function(r) {
                list.deselect(r);
            });

            productDetailPanel.clear();
            productDetailPanel.down('toolbar').setTitle(record.get('name'));
        }
    }]
});

standardPopup = new Ext.Panel({
    modal: true,
    floating: true,
    centered: true,
    width: 300,
    height: 200,
    styleHtmlContent: true,
    html: 'show me',
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            title: 'มาตรฐาน'
        }
    ],
    setStandard: function(id) {
        var record = standardStore.getById(id);
        this.down('toolbar').setTitle(record.get('name'));
        this.update(record.get('description'));
    }
});

productForm = new Ext.form.FormPanel({
    scroll: 'vertical',
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
        },
        {
            xtype: 'displayfield',
            name: 'supplierName',
            label: 'Company',
            zoomable: true,
            style: 'background: white',
            zoomFn: function() {
                var record = productForm.currentRecord;
                var supplierId = record.get('supplierId');

                popStack.push(productPanel, record);
                supplierPanel.display(supplierId);
            }
        },
        {
            xtype: 'displayfield',
            name: 'standardName',
            zoomable: true,
            style: 'background: white;',
            zoomFn: function() {
                standardPopup.setStandard(productForm.currentRecord.get('standardId'));
                standardPopup.show('pop');
            },
            label: 'Standard'
        },
        {
            xtype: 'imagefield',
            itemId: 'imageField',
            height: 500
        }
    ],

    display: function(r) {
        var layout = productDetailPanel.layout;
        if (layout.getActiveItem().id == 'blankProduct') {
            layout.next({
                type: 'fade'
            });
        } else {
            Ext.Anim.run(this, 'fade', {
                out: false  
            })
        }

        this.currentRecord = r;
        this.loadRecord(r);
        this.down('#imageField').loadImage(r.get('imagePath'));

        this.scroller.scrollTo({
            x: 0,
            y: 0
        })
    }
})

productDetailPanel = new Ext.Panel({
    layout: 'card',
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            title: 'Product',
            items: [
                {
                    ui: 'back',
                    text: 'Back',
                    handler: function () {
                        productPanel.layout.prev({
                            type: 'slide',
                            direction: 'right'
                        });
                    }                    
                }
            ]
        },
        {
            dock: 'left',
            xtype: 'list',
            width: 350,
            store: productStore,
            itemTpl: '<div class="category">{name}</div>',
            listeners: {
                'selectionchange': function(model, records) {
                    if (records.length > 0) {
                        var r = records[0];
                        productForm.display(r);
                    }
                }
            }
        },
    ],
    items: [
        {
            id: 'blankProduct',
            html: ''
        },
        productForm
    ],

    clear: function() {
        // clear image field
        this.down('#imageField').reset();
        productForm.reset();

        this.layout.setActiveItem(0);
    },

    displayCategory: function(record) {

    }
});

productPanel = new Ext.Panel({
    title: 'สินค้า',
    layout: 'card',
    items: [
        categoryPanel,
        productDetailPanel
    ],

    pop: function(record) {
        if (productPanel.layout.getActiveItem() != productDetailPanel) {
            productPanel.layout.setActiveItem(productDetailPanel);
        }
        if (productDetailPanel.layout.getActiveItem().id == 'blankProduct') {
            productDetailPanel.layout.setActiveItem(1);
        }
        if (productForm.currentRecord != record) {
            productForm.display(record);
        }
    }
});
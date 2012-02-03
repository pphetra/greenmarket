standardListPanel = new Ext.Panel({
    
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    cls: 'category',
    items: [{
        xtype: 'list',
        height: 700,
        width: 450,
        store: standardStore,
        itemTpl: '<div class="category"><img class="logo" src="{logo}"/><span class="name">{name}</span></div>',
        onItemDisclosure: openStandardDetail
    }]
});

function openStandardDetail(record) {
    standardDetail.down('toolbar').setTitle(record.get('name'));
    standardDetail.loadRecord(record);
    standardDetail.currentRecord = record;
    standardPanel.layout.next({
        type: 'slide',
        direction: 'left'
    });
    standardDetail.down('#imageField').loadImage(record.get('logo'));
}

standardProductPanel = new Ext.Panel({
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
            store: standardProductStore,
            onItemDisclosure : function(record) {
                standardProductPanel.hide();
                productPopup.showRecord(record, standardPanel);
            }
        }

    ]
})

standardDetail = new Ext.form.FormPanel({
    scroll: 'vertical',
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            title: 'Product',
            items: [
                {
                    ui: 'back',
                    text: 'รายการมาตรฐาน',
                    handler: function() {
                        standardPanel.setActiveItem(standardListPanel);
                    }
                },
                {
                    xtype: 'spacer'
                },
                {
                    text: 'สินค้าที่ได้รับการรับรอง',
                    ui: 'decline',
                    id: 'standardProductBtn',
                    handler: function() {
                        standardProductPanel.showBy(this)
                        standardProductStore.clearFilter();
                        standardProductStore.filter('standardId', standardDetail.currentRecord.get('id'));
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
            label: 'Description'
        },
        {
            xtype: 'imagefield',
            itemId: 'imageField',
            height: 400,
            name: 'Logo'
        }

    ]
});

standardPanel = new Ext.Panel({
    title: 'มาตรฐาน',
    iconCls: 'info',
    layout: 'card',
    items: [
        standardListPanel,
        standardDetail
    ],
    reset: function() {
        this.setActiveItem(standardListPanel);
    },
    pop: function(record) {
        var standardId = record.get('standardId');
        this.setActiveItem(standardDetail);
        openStandardDetail(standardStore.getById(standardId));
        console.log('pop in standard', record);
    }
})
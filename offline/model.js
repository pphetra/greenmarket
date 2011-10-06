Ext.regModel('Category', {
    fields: ['id', 'name'],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'categories'
        }
    }
});

categoryStore = new Ext.data.Store({
    model: 'Category',
    sorters: 'name',
    autoLoad: true,
    data: categoryData
});


Ext.regModel('Product', {
    fields: ['id', 'code', 'name', 'description', 
        'imagePath', 'categoryId', 'supplierId', 
        'supplierName', 'standardId', 'standardName'],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'products'
        }
    }
});

productStore = new Ext.data.Store({
    model: 'Product',
    sorters: 'name',
    autoLoad: true,
    data: productData
});

supplyProductStore = new Ext.data.Store({
    model: 'Product',
    sorters:'name',
    autoLoad: true,
    data: productData
});


Ext.regModel('Standard', {
    fields: [
        'id',
        'name',
        'description'
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'standards'
        }
    }
});

standardStore = new Ext.data.Store({
    model: 'Standard',
    sorters: 'name',
    autoLoad: true,
    data: standardData
})

Ext.regModel('Supplier', {
    fields: [
        'id',
        'name',
        'description'
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'suppliers'
        }
    }
});

supplierStore = new Ext.data.Store({
    model: 'Supplier',
    sorters: 'name',
    autoLoad: true,
    data: supplierData
})


define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        require('addons/catalog');
        /* module and components options customization */
        var customOptions = {
            /* ex. custom logo as external image */
            logoSrc: solo.app.util.toUrl('res/AS5958.png'),
            /* custom DPL filter */
            filter: [{
                name: 'qty',
                label: 'QTY',
                values: [{
                    description: 'All',
                    value: '*'
                }].concat(solo.catalog.filter.valuesMeta('QNA')),
                test: solo.catalog.filter.testMeta.bind(null, 'QNA')
            }]
        };
        return skin.use(require('spec/generic_ipc'), customOptions)
            .catch(console.error.bind(console));
    };
});
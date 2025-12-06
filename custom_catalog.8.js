define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        /* i18n string override */
        solo.expand(solo.uniview.i18n, {
            'solo-skin-ipc-dpl-header': {
                sheet: 'Page',
                title: 'Spare List'
            },
            'solo-skin-ipc-toolbar': {
                labelSheet: 'Page'
            }
        });
        return skin.use(require('spec/generic_ipc'))
            .catch(console.error.bind(console));
    };
});
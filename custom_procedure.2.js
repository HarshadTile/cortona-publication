define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {

        /* publish options customization */
        solo.expand(solo.uniview.options, {
            ToolbarBackgroundColor: '#B0BDCD',
            HideActions: true
        });

        return skin
            .use(require('spec/generic_prc'))
            .catch(console.error.bind(console));
    };
});
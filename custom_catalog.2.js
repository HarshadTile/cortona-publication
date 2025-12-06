define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        /* publish options customization */
        solo.expand(solo.uniview.options, {
            ToolbarBackgroundColor: '#B0BDCD'
        });
        return skin.use(require('spec/generic_ipc'))
            .catch(console.error.bind(console));
    };
});
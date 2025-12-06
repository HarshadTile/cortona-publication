define(function (require, exports, module) {
    require('css!./custom_catalog.4.css');
    module.exports = function (skin, options, solo) {
        return skin.use(require('spec/generic_ipc'))
            .catch(console.error.bind(console));
    };
});
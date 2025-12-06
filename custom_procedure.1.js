define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        return skin.use(require('spec/generic_prc'))
            .catch(console.error.bind(console));
    };
});
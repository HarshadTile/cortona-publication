define(function (require, exports, module) {
    
    /* include external CSS file */
    require('css!./custom_procedure.4.css');

    module.exports = function (skin, options, solo) {
        return skin
            .use('spec/generic_prc', options)
            .catch(console.error.bind(console));
    };
});
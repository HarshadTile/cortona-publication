define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        return solo.skin.require('json!' + require.toUrl('./custom_catalog.9.es.json'))
            .then(function (i18n) {
                solo.expand(solo.uniview.i18n, i18n);
                return skin
                    .use(require('spec/generic_ipc'));

            })
            .catch(console.error.bind(console));
    };
});
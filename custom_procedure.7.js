define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        return skin
            .use(require('spec/generic_prc'))
            .then(function () {
                /* reusable UI component */
                var uiCopyrightBar = require('./components/bar-copyright');
                solo.skin.get('aux').render(uiCopyrightBar, {
                    name: 'Demo, Inc.',
                    url: 'https://demo.cortona3d.com/'
                });
                solo.uniview.css.render({
                    '.skin-holder-aux': {
                        justifyContent: 'space-between'
                    }
                });
            })
            .catch(console.error.bind(console));
    };
});
define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        return skin.use(require('spec/generic_ipc'))
            .then(function () {
                /* reusable UI component */
                var uiCopyrightBar = require('./components/bar-copyright');
                solo.skin.get('aux').render(uiCopyrightBar, {
                    name: 'Demo, Inc.',
                    url: 'https://demo.cortona3d.com/'
                });
            })
            .catch(console.error.bind(console));
    };
});
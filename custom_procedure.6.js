define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        return skin.use(require('spec/generic_prc'))
            .then(function () {

                /* internal UI component */
                var uiCopyrightBar = function (skin, options, solo) {
                    solo.uniview.css.render({
                        '.copyright': {
                            order: 15,
                            flex: '0 0 auto',
                            justifyContent: 'flex-end',
                            padding: '.5em'
                        }
                    });
                    return skin.create('.skin-container.copyright', skin.html('Copyright &copy;&nbsp;'), skin.create('a', {
                        href: 'https://demo.cortona3d.com/'
                    }, 'Demo, Inc.'), ', ', new Date().getFullYear());
                };

                solo.skin.get('aux').render(uiCopyrightBar);

                solo.uniview.css.render({
                    '.skin-holder-aux': {
                        justifyContent: 'space-between'
                    }
                });

            })
            .catch(console.error.bind(console));
    };
});
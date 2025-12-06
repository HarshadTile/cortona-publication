define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        return skin.use(require('spec/generic_ipc'))
            .then(function () {
                solo.uniview.css.render({
                    body: {
                        backgroundColor: '#777'
                    },
                    '.dpl-table tbody tr:nth-child(odd)': {
                        backgroundColor: skin.color(solo.uniview.options.TableBackgroundColor).darken().toString()
                    },
                    /* default CSS rule override */
                    '.skin-holder .skin-ipc-dpl-header': {
                        color: '#FFF'
                    }
                });
            })
            .catch(console.error.bind(console));
    };
});
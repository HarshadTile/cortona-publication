define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        return skin
            .use('spec/generic_prc', options)
            .then(function () {
                solo.uniview.css.render({
                    '.doc-container': {
                        '& .tiramisu-proc-item': {
                            borderRadius: 0,
                            marginLeft: '1em !important',
                            '&.play-context:before': {
                                left: '-2em'
                            }
                        },
                        '& .tiramisu-proc-title': {
                            backgroundColor: '#EEE',
                            display: 'block',
                            marginLeft: '0 !important',
                            marginBottom: '1em'
                        }
                    }
                });
            })
            .catch(console.error.bind(console));
    };
});
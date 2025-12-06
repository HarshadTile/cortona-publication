/**
 * Component: copyright bar
 * :url
 * :name
 * :year
 */
define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        solo.uniview.css.render({
            '.copyright': {
                order: 15,
                flex: '0 0 auto',
                justifyContent: 'flex-end',
                padding: '.5em'
            }
        });
        return skin.create('.skin-container.copyright.custom-box', skin.html('Copyright &copy;&nbsp;'), skin.create('a', {
            href: options.url || ''
        }, options.name || 'Cortona3D'), ', ', options.year || new Date().getFullYear());
    };
});
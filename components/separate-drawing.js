/**
 * Component: Separate Drawing View
 */
define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        var drawingItems = []; //require('components/rococo/context-menu-items-drawing');

        solo.uniview.css.render({
            '.dpl-drawing': {
                marginTop: '1em',
                flex: '0 0 50%',
                order: 12,
                position: 'relative'
            }
        });

        solo.on('uniview.didCallContextMenu', function (options) {
            if (options.target.classList.contains('cortona3dsolo-svg')) {
                var menu = options.menu;
                options.menu.splice.apply(options.menu, [menu.length - 5, 1].concat(drawingItems));
                if (options.row >= 0) {
                    options.menu.splice(2, 2);
                }
            }
        });

        solo.on('uniview.settings.setDrawingDisplayMode', function () {
            solo.app.drawing.show();
        });

        solo.skin.get('app').remove('#btn-2d-graphics');
        solo.app.drawing.show();

        return skin.create('.skin-container.dpl-drawing.custom-box', document.querySelector('.cortona3dsolo-svg'));
    };
});
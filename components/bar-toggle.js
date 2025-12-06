/*
 * Component: bar toggle
 * :title = ''
 * @toggle
 * @toggled
 */
define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        var self = this,
            expanded = true,
            plus = '\u2795',
            minus = '\u2796',
            toggleButton = skin.create('button.toggle', {
                onclick: function (event) {
                    self.emit('toggle');
                }
            }, expanded ? minus : plus),
            toolbarColor = skin.color(solo.uniview.options.ToolbarBackgroundColor || '#AAAAAA');
        solo.uniview.css.render({
            '.skin-holder button.toggle': {
                minWidth: 'auto',
                padding: 0,
                margin: 0,
                width: '1.6em',
                height: '1.6em',
                backgroundColor: 'transparent',
                fontWeight: 'bolder',
                '&:hover': {
                    backgroundColor: toolbarColor.brighten(5)
                },
                '&:active, &.checked': {
                    backgroundColor: toolbarColor.brighten(),
                    boxShadow: 'none',
                    transform: 'none'
                }
            }
        });
        this.on('toggle', function (force) {
            expanded = typeof force === 'undefined' ? !expanded : force;
            toggleButton.innerText = expanded ? minus : plus;
            self.emit('toggled', expanded);
        });
        return this.exports(skin.create('.skin-toolbar.bar-toggle', options.title || '', toggleButton));
    };
});
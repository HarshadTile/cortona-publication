/**
 * Component: show about dialog
 * :i18n.description
 * :i18n.publisher
 * :logoSrc
 * :name
 * :year
 */
define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        solo.on('uniview.didCallContextMenu', function (event) {
            solo.uniview.css.render({
                '.about hr': {
                    border: 'none',
                    borderTop: '1px solid lightgray'
                },
                '.about img.logo': {
                    maxWidth: '64px',
                    alignSelf: 'flex-start'
                }
            });
            event.menu[event.menu.length - 1].action =
                function () {
                    var uniview = solo.uniview,
                        opt = uniview.options,
                        lang = opt.SpecLang ? " (" + opt.SpecLang + ")" : "",
                        i18n = options.i18n || {};
                    var modal = solo.skin.get('app').render(require('components/modal'), {
                        hideDismissButton: true,
                        title: uniview.description,
                        content: [
                            skin.create('.skin-container.row',
                                skin.create('.skin-container.col',
                                    skin.create('p.accent', i18n.description),
                                    skin.create('p.about-section',
                                        skin.create('', opt.SpecID + " " + opt.SpecVersion + lang),
                                        skin.create('', i18n.publisher + " " + opt.PublisherVersion)
                                    )
                                ),
                                skin.create('img.logo', {
                                    src: options.logoSrc
                                })
                            ),
                            skin.create('hr'),
                            skin.create('p.about-section',
                                skin.create('', uniview.customization.name + " " + uniview.customization.version),
                                skin.create('', "Cortona3D Solo " + solo.app.version()),
                                skin.create('small', skin.html("Copyright &copy;&nbsp;"), options.name || 'Cortona3D', ', ', options.year || new Date().getFullYear())
                            )
                        ]
                    });
                    modal.classList.add('about');
                };
        });
    };
});
define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {

        var baseColor = skin.color('#B0BDCD'),
            corporateName = 'Demo, Inc.';

        solo.expand(solo.uniview.customization, {
            name: "Demo Customization",
            version: "1.0.0"
        });

        solo.expand(solo.uniview.options, {
            ToolbarBackgroundColor: baseColor.toString(),
            ToolbarColor: '#000',
            TableBackgroundColor: baseColor.brighten(25),
            '2DHighLightColor': '#F00',
            AutoNumbering: false,
            HideActions: true
        });

        solo.expand(options, {
            logoSrc: solo.app.util.toUrl('res/AS5958.png'),
            willReturnAlertBody: function (eventInfo) {
                var h = skin.create;
                return h('.skin-container', h('img.icon', {
                    src: 'info.svg'
                }), h('span', solo.uniview.ixml.getProcedureItemInfo(eventInfo.parent).comment));
            }
        });

        return skin
            .use(require('spec/generic_prc'), options)
            .then(function () {

                var aux = solo.skin.get('aux'),
                    main = solo.skin.get('main'),
                    view = solo.skin.get('view');

                /* Component: Download Screenshot */
                var uiDownloadScreenshot = function (skin, options, solo) {
                    solo.on('uniview.didCallContextMenu', function (options) {
                        if (options.target.classList.contains('cortona3dsolo-canvas')) {
                            var menu = options.menu;
                            options.menu.splice(menu.length - 4, 0, {
                                description: 'Download screenshot',
                                action: skin.create(require('./components/download-screenshot')),
                                disabled: window.navigator.msSaveOrOpenBlob
                            });
                        }
                    });
                };

                // internal component: screenshot downloader
                aux.render(uiDownloadScreenshot);

                // external component: custom about dialog box
                aux.render(require('./components/modal-about'), {
                    i18n: solo.uniview.i18n['solo-skin-procedure-context-menu'],
                    name: corporateName,
                    logoSrc: options.logoSrc
                });
                // external component: custom copyright bar
                aux.render(require('./components/bar-copyright'), {
                    name: corporateName,
                    url: 'https://demo.cortona3d.com/',
                });
                // external component: step graphic
                view.render(require('./components/step-graphic'));

                // CSS customization
                solo.uniview.css.render({
                    '.skin-holder-aux': {
                        justifyContent: 'space-between'
                    },
                    '.doc-container': {
                        '& .tiramisu-proc-item': {
                            borderRadius: 0,
                            display: 'list-item',
                            listStyle: 'decimal',
                            marginLeft: '1em !important',
                            '&.play-context:before': {
                                left: '-2em'
                            }
                        },
                        '& .tiramisu-proc-title': {
                            backgroundColor: baseColor.brighten(10),
                            display: 'flex',
                            marginLeft: '-1em !important',
                            marginBottom: '1em',
                            justifyContent: 'space-between',
                            '& img.logo': {
                                maxWidth: '64px',
                                alignSelf: 'center'
                            },
                            '& > p': {
                                margin: 'auto 0.5em'
                            }
                        }
                    },
                    '.procedure-alert': {
                        '& img.icon': {
                            width: '5em'
                        },
                        '& .skin-modal-content.skin-container': {
                            paddingLeft: '1em',
                            paddingBottom: 0
                        }
                    }
                });

                // Adding a logo to the document title
                solo.on('uniview.doc.didLoadComplete', function (docElement) {
                    var titleElement = docElement.querySelector('.tiramisu-proc-title');
                    titleElement.insertBefore(skin.create('img.logo', {
                        src: options.logoSrc
                    }), titleElement.firstChild);
                });

                // Turn off the settings panel during playback
                solo.on('app.procedure.didPlay', function () {
                    solo.dispatch('uniview.settings.toggle', false);
                });

                // Setting the animation speed
                solo.dispatch('uniview.settings.toggle', true);
                solo.dispatch('uniview.settings.setPlaybackSpeed', 4);
                solo.dispatch('uniview.settings.toggle', false);
            })
            .catch(function (error) {
                console.error(error);
                solo.dispatch('uniview.error', error);
            });
    };
});
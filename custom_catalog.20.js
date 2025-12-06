define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {

        require('addons/catalog');

        var baseColor = skin.color('#B0BDCD'),
            corporateName = 'Demo, Inc.';

        solo.expand(solo.uniview.customization, {
            name: "Demo Customization",
            version: "1.0.0"
        });

        solo.expand(solo.uniview.options, {
            ToolbarBackgroundColor: baseColor.toString(),
            ToolbarColor: '#000',
            '2DHighLightColor': '#F00'
        });

        solo.expand(options, {
            logoSrc: solo.app.util.toUrl('res/AS5958.png'),
            filter: [{
                name: 'qty',
                label: 'QTY',
                values: [{
                    description: 'All',
                    value: '*'
                }].concat(solo.catalog.filter.valuesMeta('QNA')),
                test: solo.catalog.filter.testMeta.bind(null, 'QNA')
            }]
        });

        return skin
            .use(require('uniview-ipc'), options)
            .then(function () {

                // custom CSS rules
                solo.uniview.css.render({
                    body: {
                        backgroundColor: baseColor.brighten(25)
                    }
                });

                var aux = solo.skin.get('aux');

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

                /* Component: Custom Drawing Box */
                var uiDrawingBox = function (skin, options, solo) {
                    var uiBarToggle = require('./components/bar-toggle'),
                        uiSeparateDrawing = require('./components/separate-drawing'),
                        separateDrawing = skin.create(uiSeparateDrawing),
                        toggleBar = skin.create(uiBarToggle, {
                            title: 'Drawing'
                        }),
                        element = skin.create('.skin-container.drawing-box', toggleBar.$el, separateDrawing);
                    toggleBar.on('toggled', function (flag) {
                        element.classList.toggle('collapsed', !flag);
                    });
                    solo.uniview.css.render({
                        '.drawing-box': {
                            marginTop: '.5em',
                            minHeight: '33%',
                            height: '50%',
                            flex: '0 1 auto',
                            flexDirection: 'column',
                            order: 12,
                            '& .dpl-drawing': {
                                marginTop: '.5em',
                                flex: '1 0 auto'
                            },
                            '&.collapsed': {
                                minHeight: 'auto',
                                height: 'auto',
                                flex: '0 0 auto',
                                '& .dpl-drawing': {
                                    display: 'none'
                                }
                            }
                        }
                    });
                    return element;
                };

                // add internal components
                aux.render(uiDownloadScreenshot);
                aux.render(uiDrawingBox);

                // add external component: custom about dialog box
                aux.render(require('./components/modal-about'), {
                    i18n: solo.uniview.i18n['solo-skin-ipc-context-menu'],
                    name: corporateName,
                    logoSrc: options.logoSrc
                });
                // add external component: custom copyright bar
                aux.render(require('./components/bar-copyright'), {
                    name: corporateName,
                    url: 'https://demo.cortona3d.com/',
                });
                // add external component: metadata inspector
                aux.render(require('./components/metadata-inspector'));
                // add external component: animation watchdog
                skin.render(require('./components/sheet-animation-watchdog'));

                // CSS customization
                solo.uniview.css.render({
                    '.skin-holder .dpl-container': {
                        height: 'auto',
                        flex: '1 1 auto',
                        maxHeight: '100%'
                    },
                    '.dpl-part-meta': {
                        marginTop: '.5em'
                    },
                    '.dpl-table': {
                        '& thead td': {
                            padding: '.8em 0'
                        },
                        '& tbody tr:nth-child(odd)': {
                            backgroundColor: skin.color(solo.uniview.options.TableBackgroundColor).darken().toString()
                        }
                    }
                });

            })
            .catch(function (error) {
                console.error(error);
                solo.dispatch('uniview.error', error);
            });
    };
});
/**
 * Component: Metadata Inspector
 * :title = ""
 */
define(function (require, exports, module) {
    var uiDplMetaList = require('./metadata-list'),
        uiBarToggle = require('./bar-toggle');

    module.exports = function (skin, options, solo) {
        var ixml = solo.uniview.ixml,
            metaList = skin.create('.skin-container'),
            toggleBar = skin.create(uiBarToggle, { title: 'Metadata' }),
            element = skin.create('.skin-container.dpl-part-meta',
                toggleBar.$el,
                metaList
            );

        toggleBar.on('toggled', skin.toggle.bind(skin, metaList));

        solo.uniview.css.render({
            '.dpl-part-meta': {
                marginTop: '1em',
                flex: '0 0 auto',
                flexDirection: 'column',
                order: 12,
                '&.disabled .meta, & .disabled .meta': {
                    color: 'gray'
                }
            }
        });

        solo.on('catalog.didHoverItem', function (index) {
            var row = ixml.getRowByIndex(index),
                info = ixml.getItemInfo(row);

            metaList.classList.toggle('disabled', !info);

            if (info) {
                var key, name,
                    $metavalue = ixml.json.$('ipc//metadata/value'),
                    getName = function (key) {
                        return $metavalue.filter(function (value) {
                                return value.$attr('decl-id') === key;
                            })[0]
                            .$attr('name');
                    },
                    getMeta = function (metadata) {
                        var res = [];
                        for (key in metadata) {
                            name = getName(key);
                            // skip invisible meta
                            if (name.charAt(0) !== '$') {
                                res.push({
                                    name: name,
                                    value: metadata[key]
                                });
                            }
                        }
                        return res;
                    };
                skin.clear(metaList);
                metaList.append(
                    skin.create(uiDplMetaList, {
                        metadata: info.metadata
                    }),
                    skin.create(uiDplMetaList, {
                        metadata: info.part.metadata
                    })
                );
            }
        });
        return element;
    };
});
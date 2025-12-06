/**
 * Component: Metadata List
 * :metadata = {}
 */
define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        var element = skin.create('.skin-container.meta'),
            $metavalue = solo.uniview.ixml.json.$('ipc//metadata/value'),
            getName = function (key) {
                return $metavalue.filter(function (value) {
                        return value.$attr('decl-id') === key;
                    })[0]
                    .$attr('name');
            },
            getMeta = function (metadata) {
                var res = [];
                for (var key in metadata) {
                    var name = getName(key);
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
        getMeta(options.metadata || {}).forEach(function (item) {
            element.append(
                skin.create('label',
                    skin.create('span.name', item.name),
                    skin.create('span.value', item.value)
                )
            );
        });
        solo.uniview.css.render({
            '.skin-container.meta': {
                flexDirection: 'column',
                flex: '1 0 50%',
                '& label': {
                    display: 'flex',
                },
                '& .name': {
                    flex: '0 0 10em',
                },
                '& .value': {
                    fontWeight: 'normal'
                }
            }
        });
        return element;
    };
});
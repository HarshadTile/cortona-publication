/**
 * Component: show step graphic
 * Step metadata GRAPHIC {_EA9E6276B4BE4C4B9F235E2A0883E99F} uses to store graphic filename.
 * :iconSize
 * :stretchedSize
 */
define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        var ixml = solo.uniview.ixml,
            doc = solo.uniview.doc,
            element = skin.create('img.graphic', {
                onclick: function () {
                    this.classList.toggle('stretched');
                }
            });

        function getResourceUrl(url) {
            return (doc.bundleURL && solo.app.util.createResourceURL(url)) || solo.app.util.toUrl(url, doc.baseURL);
        }

        solo.on('app.procedure.didEnterSubstepWithName', function (id) {
            var stepId = ixml.getProcedureItemInfo(id).parentStep,
                info = ixml.getProcedureItemInfo(stepId);
            if (info.metadata._EA9E6276B4BE4C4B9F235E2A0883E99F) { // GRAPHIC
                element.src = getResourceUrl(info.metadata._EA9E6276B4BE4C4B9F235E2A0883E99F); 
                skin.classList.add('step-graphic');
                element.classList.remove('stretched');
            } else {
                skin.classList.remove('step-graphic');
                element.classList.remove('stretched');
            }
        });

        solo.on('app.procedure.didPlay', function () {
            element.classList.remove('stretched');
        });

        solo.uniview.css.render({
            '.step-graphic img.graphic': {
                display: 'block',
                position: 'absolute',
                zIndex: 10,
                top: '2em',
                right: '2em',
                width: options.iconSize || '64px',
                cursor: 'zoom-in',
                transition: 'width .3s',
                '&.stretched': {
                    width: options.stretchedSize || '40%',
                    cursor: 'zoom-out'
                }
            }
        });
        return element;
    };
});
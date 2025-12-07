define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {

        console.log('[CORTONA] custom_catalog.js (solo-uniview) loaded');

        // Map getItemInfo result to simple JSON
        function mapItemInfo(info) {
            if (!info) return null;

            var meta = info.metadata || {};
            var partMeta = (info.part && info.part.metadata) || {};

            return {
                ITEM: meta.ITEM || info.callout || '',
                DESCRIPTION: partMeta.DFP || meta.DESCRIPTION || '',
                PARTNUMBER: partMeta.PNR || meta.PARTNUMBER || '',
                QTY: meta.QNA || meta.QTY || '1',
                INFO: '' // free text if you later add something
            };
        }

        function sendToParent(mapped) {
            if (!mapped) return;

            window.parent.postMessage(
                {
                    type: 'CORTONA_PART_SELECTED',
                    payload: mapped
                },
                '*' // later restrict to your Salesforce domain
            );
            console.log('[CORTONA] Sent metadata to parent:', mapped);
        }

        function handleSelection(eventName, eventInfo) {
            try {
                console.log('[CORTONA] Event:', eventName, 'payload:', eventInfo);

                var itemId =
                    eventInfo &&
                    (eventInfo.callout ||
                        eventInfo.item ||
                        eventInfo.parent ||
                        eventInfo.id ||
                        eventInfo.row);

                if (!itemId) {
                    console.warn('[CORTONA] No itemId for event', eventName, eventInfo);
                    return;
                }

                var info = solo.uniview.ixml.getItemInfo(itemId);
                console.log('[CORTONA] getItemInfo result:', info);

                var mapped = mapItemInfo(info);
                console.log('[CORTONA] mapped payload:', mapped);

                sendToParent(mapped);
            } catch (e) {
                console.error('[CORTONA] Error in selection handler for', eventName, e);
            }
        }

        // Attach handlers after document is loaded
        solo.on('uniview.doc.didLoadComplete', function () {
            console.log('[CORTONA] Doc loaded, attaching selection handlers (custom_catalog.js)');

            ['uniview.didSelect', 'uniview.selection.changed', 'uniview.hit']
                .forEach(function (ev) {
                    solo.on(ev, handleSelection.bind(null, ev));
                    console.log('[CORTONA] Attached handler for', ev);
                });
        });
    };
});

define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {

        console.log('[CORTONA] custom_catalog.js (solo-uniview) loaded');

        // --- map getItemInfo result to simple JSON ---
        function mapItemInfo(info) {
            if (!info) return null;

            var meta = info.metadata || {};
            var partMeta = (info.part && info.part.metadata) || {};

            return {
                ITEM: meta.ITEM || info.callout || '',
                DESCRIPTION: partMeta.DFP || meta.DESCRIPTION || '',
                PARTNUMBER: partMeta.PNR || meta.PARTNUMBER || '',
                QTY: meta.QNA || meta.QTY || '1',
                INFO: '' // extend later if needed
            };
        }

        // --- send JSON to parent (Salesforce LWC iframe) ---
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

        // --- common handler for all selection-related events ---
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

        // --- actually attach handlers ---
        function attachHandlers() {
            console.log('[CORTONA] Attaching selection handlers (custom_catalog.js)');

            ['uniview.didSelect', 'uniview.selection.changed', 'uniview.hit']
                .forEach(function (ev) {
                    try {
                        solo.on(ev, handleSelection.bind(null, ev));
                        console.log('[CORTONA] Attached handler for', ev);
                    } catch (e) {
                        console.error('[CORTONA] Could not attach handler for', ev, e);
                    }
                });
        }

        // 1) Normal path: wait until document loaded
        solo.on('uniview.doc.didLoadComplete', function () {
            console.log('[CORTONA] Doc loaded (didLoadComplete), attaching handlers');
            attachHandlers();
        });

        // 2) Safety path: if doc is already loaded by the time this module runs
        try {
            if (solo.uniview && solo.uniview.doc && solo.uniview.doc.rootElement) {
                console.log('[CORTONA] Doc seems already loaded, attaching handlers immediately');
                attachHandlers();
            }
        } catch (e) {
            console.warn('[CORTONA] Could not check doc load state', e);
        }
    };
});

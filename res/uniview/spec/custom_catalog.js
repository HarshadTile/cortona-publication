define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {

        console.log('[CORTONA] custom_catalog.js (solo-uniview) loaded');

        // Try to get the main engine object
        var engine = solo || window.Cortona3DSolo || window.solo;

        if (!engine) {
            console.error('[CORTONA] Cannot find Cortona engine object');
            return;
        }

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

        // Handle a candidate selection payload from dispatch
        function handleSelectionFromPayload(eventName, payload) {
            try {
                if (!payload) return;

                var itemId =
                    payload.callout ||
                    payload.item ||
                    payload.parent ||
                    payload.id ||
                    payload.row;

                if (!itemId) return;

                if (!engine.uniview || !engine.uniview.ixml || !engine.uniview.ixml.getItemInfo) {
                    console.warn('[CORTONA] ixml.getItemInfo not ready yet');
                    return;
                }

                console.log('[CORTONA] Selection-like event:', eventName, 'payload:', payload);

                var info = engine.uniview.ixml.getItemInfo(itemId);
                console.log('[CORTONA] getItemInfo result:', info);

                var mapped = mapItemInfo(info);
                console.log('[CORTONA] mapped payload:', mapped);

                sendToParent(mapped);
            } catch (e) {
                console.error('[CORTONA] Error in handleSelectionFromPayload for', eventName, e);
            }
        }

        // --- Wrap engine.dispatch so we see ALL events ---
        if (!engine.dispatch) {
            console.error('[CORTONA] engine.dispatch is not available');
            return;
        }

        var originalDispatch = engine.dispatch.bind(engine);

        engine.dispatch = function (eventName, payload) {
            try {
                // Only log/capture events that look interesting (have item/callout/row/id)
                if (payload && (payload.callout || payload.item || payload.row || payload.id)) {
                    console.log('[CORTONA] dispatch:', eventName, payload);
                    handleSelectionFromPayload(eventName, payload);
                }
            } catch (e) {
                console.error('[CORTONA] Error in dispatch wrapper', e);
            }

            // Always call the original dispatch so Cortona keeps working
            return originalDispatch(eventName, payload);
        };

        console.log('[CORTONA] dispatch wrapper installed');
    };
});

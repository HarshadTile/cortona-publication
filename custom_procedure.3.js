define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {

        /* module and components options customization */
        var customOptions = {
            /* use custom logo as external image */
            logoSrc: solo.app.util.toUrl('res/AS5958.png', solo.app.modelInfo.baseURL),
            disableFastForward: true,
            disableLock: true,
            disableDurationView: true,
            enableStopButton: true
        };

        return skin
            .use(require('spec/generic_prc'), customOptions)
            .catch(console.error.bind(console));
    };
});
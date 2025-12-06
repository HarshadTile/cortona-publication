define(function (require, exports, module) {
    require('css!./sheet-animation-watchdog.css');

    module.exports = function (skin, options, solo) {
        solo.on('app.ipc.willStartSheetTransitionAnimation', function () {
            skin.$el.classList.add('disabled');
        });
        solo.on('app.ipc.didStopSheetTransitionAnimation', function () {
            skin.$el.classList.remove('disabled');
        });
    };
});
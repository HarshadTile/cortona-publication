define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        /* i18n string override */
        solo.expand(solo.uniview.i18n, {
            "procedure-with-document": {
                "labelShowComments": "Mostrar comentarios en línea"
            },
            "solo-skin-procedure-settings-panel": {
                "labelSpeed": "Acelerar",
                "labelFreezeViewpoint": "Congelar punto de vista",
                "labelLockStep": "Bloqueo",
                "labelDisableAlertMessages": "Deshabilitar mensajes de alerta"
            }
        });
        return skin
            .use(require('spec/generic_prc'))
            .catch(console.error.bind(console));
    };
});
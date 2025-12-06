/**
 * Component: download screenshot
 * :name
 * @returns {function}
 */
define(function (require, exports, module) {
    module.exports = function (skin, options, solo) {
        function downloadScreenshot() {
            
            requestAnimationFrame(function () {
                var filename = (options.name || 'screenshot') + '.png',
                    dataUrl = Cortona3DSolo.core.canvas.toDataURL('image/png');
                link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                link.href = dataUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
            solo.core.didChangeLayout();
        }
        return downloadScreenshot;
    };
});


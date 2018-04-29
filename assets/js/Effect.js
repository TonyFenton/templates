/**
 * Effects store
 */
export default class Effect {

    /**
     * Set a blink efect to element
     * @param {Object} panel
     */
    static blink(panel) {
        panel.css('opacity', '0.3');
        setTimeout(function () {
            panel.css('opacity', '');
        }, 150);
    }
}

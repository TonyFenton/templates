/**
 * Template functions
 */
export default class Template {

    constructor() {
        this.variableControl = $('.variable-control');
        this.text = $('#text');
        this.textControl = $('#text-control');
        this.copyBtn = $('.copy-btn');
        this.resetBtn = $('.reset-btn');
    };

    /**
     * Style a variable
     * @param {int} id
     */
    pointVariable(id) {
        $('.variable-' + id).css({'color': '#002db3', 'font-weight': 'bold'});
    };

    /**
     * Remove a point variable style
     * @param {int} id
     */
    unpointVariable(id) {
        $('.variable-' + id).css({'color': '', 'font-weight': ''});
    };

    /**
     * Set a variable value
     * @param {int} id
     * @param {string} name
     * @param {string} value
     */
    setVariable(id, name, value) {
        if ('' === value) {
            value = '{' + name + '}';
        }
        $('.variable-' + id).text(value);
    };

    /**
     * Copy text
     */
    copy() {
        let temp = $('<textarea>');
        $('body').append(temp);
        temp.val(this.text.text()).select();
        document.execCommand('copy');
        temp.remove();
    };

    /**
     * Reset variables
     */
    reset() {
        this.variableControl.val('');
        this.variableControl.trigger('change');
    };

}

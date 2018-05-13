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
     * @param {string} name
     */
    pointVariable(id, name, value) {
        this.setVariableName(id, name, value);
        $('.variable-' + id).css('font-weight', 'bold');
    };

    /**
     * Remove a point variable style
     * @param {int} id
     * @param {string} variableControlValue
     */
    unpointVariable(id, variableControlValue) {
        const variable = $('.variable-' + id);
        if ('' === variableControlValue) {
            variable.text('');
        }
        variable.css('font-weight', '');
    };

    /**
     * Set a variable value
     * @param {int} id
     * @param {string} value
     */
    setVariable(id, value) {
        $('.variable-' + id).text(value);
    };

    /**
     * Set a variable value
     * @param {int} id
     * @param {string} name
     * @param {string} value
     */
    setVariableName(id, name, value) {
        if ('' === value) {
            $('.variable-' + id).text('{' + name + '}');
        }
    }

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

    /**
     * Select the first variable
     */
    selectFirst() {
        if (this.variableControl.length) {
            this.variableControl[0].select();
        }
    }

}

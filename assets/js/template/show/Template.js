import TemplateVariableControl from "./TemplateVariableControl";

export default class Template {

    constructor(id, parent) {
        this.id = id;
        this.parent = parent;
        this.variableControls = [];
        this.element = parent.element.find('#template');
        this.textControl = this.element.find('#text-control');
        this.textControl.find('.variable-control-row:not(.prototype)').remove();
        this.text = this.element.find('#text');
    }

    /**
     * Load the template data
     */
    load() {
        this.parent.showSpinner();
        $.get('/template/' + this.id)
            .done(data => {
                this.parent.setBreadcrumb(data.path);
                this.parent.setBreadcrumbBtn(this.id);
                this.text.html(this.prepareText(data.text));
                this.createVariableControls(data.variables);
                this.parent.hideSpinner();
                this.focusFirst();
            });
    };

    /**
     * Prepare text to template
     * @param textToView
     * @returns {Array}
     */
    prepareText(textToView) {
        let text = [];
        $.each(textToView, (key, item) => {
            let span = $('<span/>');
            if (false === item.variableId) {
                span.text(item.content);
            } else {
                span.addClass('variable').attr('data-id', item.variableId);
            }
            text.push(span);
        });

        return text;
    }

    /**
     * @param variables
     */
    createVariableControls(variables) {
        $.each(variables, (id, variable) => {
            this.variableControls.push(new TemplateVariableControl(this, id, variable));
        });
    }

    /**
     * Copy a content of the text
     */
    copy() {
        let temp = $('<textarea>');
        this.element.append(temp);
        temp.val(this.text.text()).select();
        document.execCommand('copy');
        temp.remove();
        this.parent.resetBtn.focus();
    };

    /**
     * Restore the initial state
     */
    reset() {
        $.each(this.variableControls, (index, variableControl) => {
            variableControl.variableControl.val(variableControl.initialValue).trigger('input');
        });
        this.focusFirst();
    }

    /**
     * Focus the first variable control
     */
    focusFirst() {
        if (this.variableControls.length) {
            let tempVal = this.variableControls[0].variableControl.val();
            this.variableControls[0].variableControl.focus().val('').val(tempVal);
        }
    }
}

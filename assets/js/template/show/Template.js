import TemplateVariableManager from "./TemplateVariableManager";

export default class Template {

    constructor(id, parent) {
        this.id = id;
        this.parent = parent;
        this.variableManagers = [];
        this.element = parent.element.find('#template');
        this.textManager = this.element.find('#text-manager');
        this.textManager.find('.variable-manager-row:not(.prototype)').remove();
        this.text = this.element.find('#text');
    }

    /**
     * Load the template data
     */
    load() {
        this.parent.showSpinner();
        $.get('/template/data/' + this.id)
            .done(data => {
                this.parent.setBreadcrumb(data.path);
                this.parent.setBreadcrumbBtn(this.id);
                this.text.html(this.prepareText(data.text));
                this.createVariableManagers(data.variables);
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
    createVariableManagers(variables) {
        $.each(variables, (id, variable) => {
            this.variableManagers.push(new TemplateVariableManager(this, id, variable));
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
        $.each(this.variableManagers, (index, variableManager) => {
            variableManager.variableManager.val(variableManager.initialValue).trigger('input');
        });
        this.focusFirst();
    }

    /**
     * Focus the first variable manager
     */
    focusFirst() {
        if (this.variableManagers.length) {
            let tempVal = this.variableManagers[0].variableManager.val();
            this.variableManagers[0].variableManager.focus().val('').val(tempVal);
        }
    }
}

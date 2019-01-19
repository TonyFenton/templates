export default class TemplateVariableManager {

    constructor(template, id, data) {
        this.template = template;
        this.id = id;
        this.name = data.name;
        this.initialValue = data.value;
        this.placeholder = data.desc;
        this.element = this.createElement();
        this.variableManager = this.element.find('.variable-manager');
        this.variables = this.template.text.find('[data-id="' + this.id + '"]');

        if (typeof this.variables !== 'undefined') {
            this.initVariablesValue();
            this.attachFillingVariables();
            this.attachPointingVariables();
            this.attachUnpointingVariables();
        }
    }

    createElement() {
        let manager = this.template.element.find('.variable-manager-row.prototype').clone();
        manager.removeClass('prototype');
        manager.find('label').text(this.name).attr('for', 'variable-manager-' + this.id);
        manager.find('.variable-manager').val(this.initialValue).attr('placeholder', this.placeholder);
        this.template.textManager.append(manager);

        return manager;
    }

    initVariablesValue() {
        this.variables.text(this.variableManager.val());
    }

    attachFillingVariables() {
        let me = this;
        this.variableManager.on('input', function () {
            if ('' === $(this).val()) {
                me.variables.text('{' + me.name + '}');
            } else {
                me.variables.text($(this).val());
            }
        });
    }

    attachPointingVariables() {
        let me = this;
        this.variableManager.on('focus', function () {
            me.variables.css('font-weight', 'bold');
            if ('' === $(this).val()) {
                me.variables.text('{' + me.name + '}');
            }
        });
    }

    attachUnpointingVariables() {
        let me = this;
        this.variableManager.on('blur', function () {
            if ('' === $(this).val()) {
                me.variables.text('');
            }
            me.variables.css('font-weight', '');
        });
    }
}

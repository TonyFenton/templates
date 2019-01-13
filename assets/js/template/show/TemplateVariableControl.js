export default class TemplateVariableControl {

    constructor(template, id, data) {
        this.template = template;
        this.id = id;
        this.name = data.name;
        this.initialValue = data.value;
        this.placeholder = data.desc;
        this.element = this.createElement();
        this.variableControl = this.element.find('.variable-control');
        this.variables = this.template.text.find('[data-id="' + this.id + '"]');

        if (typeof this.variables !== 'undefined') {
            this.initVariablesValue();
            this.attachFillingVariables();
            this.attachPointingVariables();
            this.attachUnpointingVariables();
        }
    }

    createElement() {
        let control = this.template.element.find('.variable-control-row.prototype').clone();
        control.removeClass('prototype');
        control.find('label').text(this.name).attr('for', 'variable-control-' + this.id);
        control.find('.variable-control').val(this.initialValue).attr('placeholder', this.placeholder);
        this.template.textControl.append(control);

        return control;
    }

    initVariablesValue() {
        this.variables.text(this.variableControl.val());
    }

    attachFillingVariables() {
        let me = this;
        this.variableControl.on('input', function () {
            if ('' === $(this).val()) {
                me.variables.text('{' + me.name + '}');
            } else {
                me.variables.text($(this).val());
            }
        });
    }

    attachPointingVariables() {
        let me = this;
        this.variableControl.on('focus', function () {
            me.variables.css('font-weight', 'bold');
            if ('' === $(this).val()) {
                me.variables.text('{' + me.name + '}');
            }
        });
    }

    attachUnpointingVariables() {
        let me = this;
        this.variableControl.on('blur', function () {
            if ('' === $(this).val()) {
                me.variables.text('');
            }
            me.variables.css('font-weight', '');
        });
    }
}

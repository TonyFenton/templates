/**
 * Builder functions
 */
export default class TemplateBuilder {

    constructor() {
        this.id = 0;
        this.addBtn = $('#add-variable');
        this.editBtn = $('.edit-btn');
        this.variablesWrapper = $('#variables-wrapper');
        this.textVariablePrototype = $('#text-variable-prototype');
        this.variablesOutput = $('#template_variables');
        this.name = $('#template_name');
        this.form = $('form[name="template"]');
    };

    /**
     * Get a variable ID
     * @returns {int}
     */
    getVariableId() {
        return this.id++;
    }

    /**
     * Create a variable
     * @param {string} name
     * @param {string} value
     * @param {string} desc
     */
    createVariable(name, value, desc) {
        const id = this.getVariableId();
        let newVariable = this.textVariablePrototype.clone(true);
        newVariable
            .attr('id', 'variable-control-' + id)
            .data('variable', this.createVariableData(name, value, desc))
            .addClass('variable-control')
        ;
        newVariable.find('label').text(name).attr('for', 'variable-' + id);
        newVariable.find('input').val(value).attr({'id': 'variable-' + id, 'placeholder': desc});
        newVariable.appendTo(this.variablesWrapper);
    }

    /**
     * Save a variable
     * @param {int} id
     * @param {string} name
     * @param {string} value
     * @param {string} desc
     */
    saveVariable(id, name, value, desc) {
        let variableControl = $('#variable-control-' + id);
        variableControl.data('variable', this.createVariableData(name, value, desc));
        variableControl.find('label').text(name);
        variableControl.find('input').val(value).attr('placeholder', desc);
    }

    /**
     * Remove a variable
     * @param id
     */
    removeVariable(id) {
        $('#variable-control-' + id).remove();
    }

    /**
     * Get a variable config data + id
     * @param {Object} variableControl
     * @returns {Object}
     */
    getVariableData(variableControl) {
        const variable = variableControl.data('variable');
        return {
            'id': variableControl.attr('id').replace('variable-control-', ''),
            'name': variable.name,
            'value': variable.value,
            'desc': variable.desc
        }
    }

    /**
     * Create a variable config data
     * @param {string} name
     * @param {string} value
     * @param {string} desc
     * @returns {string}
     */
    createVariableData(name, value, desc) {
        return {
            "desc": desc,
            "name": name,
            "type": "text",
            "value": value
        };
    }

    /**
     * Set variables data to the form field
     */
    setVariablesOutput() {
        let data = [];
        $('.variable-control').each(function () {
            data.push($(this).data('variable'));
        });
        this.variablesOutput.val(JSON.stringify(data));
    }

    /**
     * Create variables from the form field
     */
    createVariablesFromOutput() {
        let thisObj = this;
        let output = JSON.parse(this.variablesOutput.val());
        $.each(output, function(index, variable) {
            thisObj.createVariable(variable.name, variable.value, variable.desc)
        });
    }

}

/**
 * Builder functions
 */
export default class TemplateBuilder {

    constructor() {
        this.id = 100;
        this.addBtn = $('#add-variable-btn');
        this.removeBtn = $('.remove-btn');
        this.editBtn = $('.edit-btn');
        this.variablesWrapper = $('#variables-wrapper');
        this.textVariablePrototype = $('#text-variable-prototype');
        this.variablesOutput = $('#template_variables');
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
     */
    createVariable(name, value) {
        const id = this.getVariableId();
        let newVariable = this.textVariablePrototype.clone(true);
        newVariable
            .attr({
                'id': 'variable-control-' + id,
            })
            .data('variable', this.createVariableData(name, value))
            .addClass('variable-control')
        ;
        newVariable.find('label').text(name).attr('for', 'variable-' + id);
        newVariable.find('textarea').val(value).attr('id', 'variable-' + id);
        newVariable.appendTo(this.variablesWrapper);
        this.setVariablesOutput();
    }

    /**
     * Save a variable
     * @param {int} id
     * @param {string} name
     * @param {string} value
     */
    saveVariable(id, name, value) {
        let variableControl = $('#variable-control-' + id);
        variableControl.data('variable', this.createVariableData(name, value));
        variableControl.find('label').text(name);
        variableControl.find('textarea').val(value);
        this.setVariablesOutput();
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
            'value': variable.value
        }
    }

    /**
     * Create a variable config data
     * @param {string} name
     * @param {string} value
     * @returns {string}
     */
    createVariableData(name, value) {
        return {
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
            thisObj.createVariable(variable.name, variable.value)
        });
    }

}

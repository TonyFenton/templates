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
        newVariable.attr({
            'id': 'variable-control-' + id,
            'data-variable': this.createVariableData(name, value)
        });
        newVariable.find('label').text(name).attr('for', 'variable-' + id);
        newVariable.find('textarea').val(value).attr('id', 'variable-' + id);
        newVariable.appendTo(this.variablesWrapper);
    }

    /**
     * Save a variable
     * @param {int} id
     * @param {string} name
     * @param {string} value
     */
    saveVariable(id, name, value) {
        let variableControl = $('#variable-control-' + id);
        variableControl.attr('data-variable', this.createVariableData(name, value));
        variableControl.find('label').text(name);
        variableControl.find('textarea').val(value);
    }

    /**
     * Get a variable config data + id
     * @param {Object} variableControl
     * @returns {Object}
     */
    getVariableData(variableControl) {
        const variable = JSON.parse(variableControl.attr('data-variable'));
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
        return JSON.stringify({
            "name": name,
            "type": "text",
            "value": value
        });
    }

}

/**
 * Modal functions
 */
export default class TemplateModal {

    constructor() {
        this.label = $('#variable-modal-label');
        this.createBtn = $('#create-variable');
        this.saveBtn = $('#save-variable');
        this.variableName = $('#variable-name');
        this.variableValue = $('#variable-value');
        this.variableId = $('#variable-id');
    };

    /**
     * Clear variables fields
     */
    clear() {
        this.variableName.val('');
        this.variableValue.val('');
        this.variableId.val('');
    }

    /**
     * Prepare the modal to creating a variable
     */
    displayNewView() {
        this.clear();
        this.label.text('New');
        this.createBtn.show();
        this.saveBtn.hide();
    }

    /**
     * Prepare the modal to editing a variable
     */
    displayEditView() {
        this.clear();
        this.label.text('Edit');
        this.createBtn.hide();
        this.saveBtn.show();
    }

    /**
     * Fill in the modal fields
     * @param {int} id
     * @param {string} name
     * @param {string} value
     */
    setVariable(id, name, value) {
        this.variableId.val(id);
        this.variableName.val(name);
        this.variableValue.val(value);
    }

}

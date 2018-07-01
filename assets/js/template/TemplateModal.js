/**
 * Modal functions
 */
export default class TemplateModal {

    constructor() {
        this.modal = $('#variable-modal');
        this.label = $('#variable-modal-label');
        this.createBtn = $('#create-variable');
        this.saveBtn = $('#save-variable');
        this.removeBtn = $('#remove-variable');
        this.variableName = $('#variable-name');
        this.variableValue = $('#variable-value');
        this.variableDesc = $('#variable-desc');
        this.variableId = $('#variable-id');
    };

    /**
     * Clear variables fields
     */
    clear() {
        this.variableName.val('');
        this.variableValue.val('');
        this.variableDesc.val('');
        this.variableId.val('');
    }

    /**
     * Prepare the modal to creating a variable
     */
    displayNewView() {
        this.clear();
        this.label.text('Add a new variable');
        this.createBtn.show();
        this.saveBtn.hide();
        this.removeBtn.hide();
    }

    /**
     * Prepare the modal to editing a variable
     */
    displayEditView() {
        this.clear();
        this.label.text('Edit the variable');
        this.createBtn.hide();
        this.saveBtn.show();
        this.removeBtn.show();
    }

    /**
     * Fill in the modal fields
     * @param {int} id
     * @param {string} name
     * @param {string} value
     * @param {string} desc
     */
    setVariable(id, name, value, desc) {
        this.variableId.val(id);
        this.variableName.val(name);
        this.variableValue.val(value);
        this.variableDesc.val(desc);
    }

}

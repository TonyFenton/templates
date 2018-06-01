require('./../../css/template/new_edit.css');
require('jquery-ui/ui/widgets/sortable');
require('./../base.js');
import TemplateBuilder from './TemplateBuilder.js'
import TemplateModal from './TemplateModal.js'

$(function () {

    const modal = new TemplateModal();
    const builder = new TemplateBuilder();

    /* Selecting a name for new action */
    if('' === builder.name.val()) {
        builder.name.focus();
    }

    /* Selecting a name on a modal */
    modal.modal.on('shown.bs.modal', function () {
        modal.variableName.select();
    });

    /* Editing a variable */
    builder.editBtn.on('click', function () {
        modal.displayEditView();
        const variable = builder.getVariableData($(this).closest('.variable-control'));
        modal.setVariable(
            variable.id,
            variable.name,
            variable.value,
            variable.desc
        );
    });

    /* for edit action */
    builder.createVariablesFromOutput();

    /* Adding a variable */
    builder.addBtn.on('click', function () {
        modal.displayNewView();
    });

    /* Removing a variable */
    modal.removeBtn.on('click', function () {
        builder.removeVariable(modal.variableId.val());
    });

    /* Creating a variable */
    modal.createBtn.on('click', function () {
        builder.createVariable(
            modal.variableName.val(),
            modal.variableValue.val(),
            modal.variableDesc.val()
        );
    });

    /* Saving a variable */
    modal.saveBtn.on('click', function () {
        builder.saveVariable(
            modal.variableId.val(),
            modal.variableName.val(),
            modal.variableValue.val(),
            modal.variableDesc.val()
        );
    });

    /* Sorting variables */
    builder.variablesWrapper.sortable({
        containment: "body",
        handle: ".sortable-handle",
        cursor: "move",
        axis: 'y',
        placeholder: "sortable-placeholder",
        forcePlaceholderSize: true,
        start: function(e, ui) {
            ui.item.addClass('sortable-start');
        },
        stop: function(e, ui) {
            ui.item.removeClass('sortable-start');
        }
    });

    /* Submiting a form */
    builder.form.on('submit', function(event) {
        builder.setVariablesOutput();
        return true;
    });

});

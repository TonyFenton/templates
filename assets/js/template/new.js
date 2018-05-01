require('./../../css/template/new.css');
require('bootstrap/dist/js/bootstrap.min');
import TemplateBuilder from './TemplateBuilder.js'
import TemplateModal from './TemplateModal.js'

$(function () {

    const modal = new TemplateModal();
    const builder = new TemplateBuilder();

    /* Adding a variable */
    builder.addBtn.on('click', function () {
        modal.displayNewView();
    });

    /* Creating a variable */
    modal.createBtn.on('click', function () {
        builder.createVariable(
            modal.variableName.val(),
            modal.variableValue.val()
        );
    });

    /* Removing a variable */
    builder.removeBtn.on('click', function () {
        $(this).closest('.variable-control').remove();
    });

    /* Editing a variable */
    builder.editBtn.on('click', function () {
        modal.displayEditView();
        const variable = builder.getVariableData($(this).closest('.variable-control'));
        modal.setVariable(
            variable.id,
            variable.name,
            variable.value
        );
    });

    /* Saving a variable */
    modal.saveBtn.on('click', function () {
        builder.saveVariable(
            modal.variableId.val(),
            modal.variableName.val(),
            modal.variableValue.val()
        );
    });
});
